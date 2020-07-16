import { calculateSolutionResult } from './runner';
import Queue, { QueueWorker, QueueWorkerCallback } from 'queue';
import appConfig from '../../config/env';
import { ISolutionModel } from './model';
import { Types } from 'mongoose';

export interface ISolutionResult {
    solution: ISolutionModel;
    participationId?: Types.ObjectId;
    right: number;
    total: number;
}

export interface ITaskAnswer {
    input: [];
    output: any;
}

export interface ICheckSolutionArgs {
    solution: ISolutionModel;
    answers: ITaskAnswer[];
    timeout: number;
    participationId?: Types.ObjectId;
}

const solutionProcessingQueue: Queue = new Queue({
    concurrency: appConfig.maxOpenedProcessesOnSolutionCheck,
    autostart: true
});

let isProcessingSolutionsSinceLastServerShutdown: boolean = false;

const CheckerService = { //tslint:disable-line

    setOnCheckSuccessCallback(cb: (result: ISolutionResult) => void): void {
        solutionProcessingQueue.on('success', cb);
    },

    setOnAllSolutionsProcessed(cb: () => void): void {
        solutionProcessingQueue.on('end', cb);
    },

    isAvailableToQueueSolutionCheck(): boolean {
        if (isProcessingSolutionsSinceLastServerShutdown) {
            return false;
        }

        const amountOfCheckersAvailableToQueue: number = getAmountOfCheckersAvailableToQueue(
            solutionProcessingQueue, 
            appConfig.maxOpenedProcessesOnSolutionCheck, 
            appConfig.maxPendingSolutionsQueueLength
        );

        return amountOfCheckersAvailableToQueue > 0;
    },

    checkUserSolution(checkerArgs: ICheckSolutionArgs): void {
        const amountOfCheckersAvailableToQueue: number = getAmountOfCheckersAvailableToQueue(
            solutionProcessingQueue, 
            appConfig.maxOpenedProcessesOnSolutionCheck, 
            appConfig.maxPendingSolutionsQueueLength
        );

        if (amountOfCheckersAvailableToQueue <= 0) {
            throw new Error('The number of checkers is maximum');
        }

        solutionProcessingQueue.push(getWorker(checkerArgs));
    },

    checkAllPendingSolutions(
        solutions: ISolutionModel[],
        argsForCheckGetter: (solutions: ISolutionModel[]) => Promise<ICheckSolutionArgs[]>,
        allDoneCallback: () => void
    ): void {
        isProcessingSolutionsSinceLastServerShutdown = true;

        async function planChecking(nextSolutionIndx: number, queue: Queue): Promise<void> {
            if (nextSolutionIndx >= solutions.length) {
                isProcessingSolutionsSinceLastServerShutdown = false;

                return allDoneCallback();
            }

            const numOfCheckersAwailableToPlan: number = getAmountOfCheckersAvailableToQueue(
                solutionProcessingQueue, 
                appConfig.maxOpenedProcessesOnSolutionCheck, 
                appConfig.maxPendingSolutionsQueueLength
            );
            const numOfAwailableSolutions: number = solutions.length - nextSolutionIndx;
            let numOfCheckersToPlan: number = 0;

            if (numOfAwailableSolutions >= numOfCheckersAwailableToPlan) {
                numOfCheckersToPlan = numOfCheckersAwailableToPlan;
            } else {
                numOfCheckersToPlan = numOfAwailableSolutions;
            }

            const indxOfLastSolutionToPlan: number = nextSolutionIndx + numOfCheckersToPlan - 1;
            const solutionsToCheck: ISolutionModel[] = solutions.slice(nextSolutionIndx, indxOfLastSolutionToPlan + 1);
            const arrOfCheckersArgs: ICheckSolutionArgs[] = await argsForCheckGetter(solutionsToCheck);
            const arrOfWorkers: QueueWorker[] = arrOfCheckersArgs.map((args) => getWorker(args));

            queue.push(...arrOfWorkers);
            queue.once('end', () => {
                planChecking(indxOfLastSolutionToPlan + 1, queue);
            });
        }

        planChecking(0, solutionProcessingQueue);
    }

};

function getAmountOfCheckersAvailableToQueue(queue: Queue, maxProcesses: number, maxQueueLength: number): number {
    let numOfCheckersWaitingInQueue: number = queue.length - maxProcesses;

    if (numOfCheckersWaitingInQueue < 0) {
        numOfCheckersWaitingInQueue = 0;
    }

    if (numOfCheckersWaitingInQueue > 0) {
        return maxQueueLength - numOfCheckersWaitingInQueue;
    }

    const numOfFreeProcesses: number = maxProcesses - queue.length;

    return numOfFreeProcesses;
}

function getWorker({
    solution,
    answers,
    timeout,
    participationId
}: ICheckSolutionArgs): QueueWorker {
    return (cb: QueueWorkerCallback): void => {
        calculateSolutionResult(solution, answers, cb, timeout, participationId);
    };
}

export default CheckerService;
