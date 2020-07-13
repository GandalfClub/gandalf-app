import { ISolutionService } from './interface';
import SolutionModel, { ISolutionModel } from './model';
import TaskModel, { ITaskModel } from '../Task/model';
import EventsModel, { IEventsnModel } from '../Events/model';
import CheckerService, { ISolutionResult, ICheckSolutionArgs } from './checker';
import { Types } from 'mongoose';
import ParticipationModel, { IParticipationModel } from '../Participation/model';
import ParticipationService from '../Participation/service';
import EventsService from '../Events/service';

CheckerService.setOnCheckSuccessCallback(updateSolutionAndParticipation);

const SolutionService: ISolutionService = {
    async postSolution(userId: Types.ObjectId, body: ISolutionModel): Promise<ISolutionModel> {
        try {
            if (!CheckerService.isAvailableToQueueSolutionCheck()) {
                // не менять сообщение
                throw new Error('Сервер перегружен. Повторите запрос позже.');
            }
            let userTaskSolution: ISolutionModel = await SolutionModel.findOne({
                userId: body.userId,
                taskId: body.taskId,
                eventId: body.eventId
            });
            let participation: IParticipationModel = await ParticipationService.getUserParticipation(userId, body.eventId);
            const event: IEventsnModel = await EventsModel.findOne({ _id: body.eventId });
            const task: ITaskModel = await TaskModel.findOne({ _id: body.taskId });

            if (!event.users.find((user) => { return user.equals(userId); })) {
                event.users.push(userId);
                await EventsModel.findByIdAndUpdate(body.eventId, event);
            }

            if (!participation) {
                participation = await ParticipationService.createParticipation(userId, body.eventId);
            }

            if (!userTaskSolution) {
                userTaskSolution = await SolutionModel.create({
                    userId,
                    posted: new Date(Date.now()),
                    code: body.code,
                    isPending: true,
                    taskId: body.taskId,
                    eventId: body.eventId,
                    comment: body.comment
                });
            } else {
                userTaskSolution.posted = new Date(Date.now());
                userTaskSolution.code = body.code;
                userTaskSolution.isPending = true;
                userTaskSolution.comment = body.comment;
                await userTaskSolution.save();
            }

            const checkerArgsObj: ICheckSolutionArgs = {
                solution: userTaskSolution,
                answers: task.answers,
                timeout: task.timeout,
                participationId: participation._id
            };

            CheckerService.checkUserSolution(checkerArgsObj);

            return userTaskSolution;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async postHtmlSolution(curUserId: Types.ObjectId, body: ISolutionModel): Promise<ISolutionModel> {
        try {
            const userId: any = body.userForView;

            let userTaskSolution: ISolutionModel = await SolutionModel.findOne({
                userId,
                taskId: body.taskId,
                eventId: body.eventId
            });
            let participation: IParticipationModel = await ParticipationService.getUserParticipation(userId, body.eventId);
            const event: IEventsnModel = await EventsModel.findOne({ _id: body.eventId });
            const task: ITaskModel = await TaskModel.findOne({ _id: body.taskId });

            if (!event.users.find((user) => { return user.equals(userId); })) {
                event.users.push(userId);
                await EventsModel.findByIdAndUpdate(body.eventId, event);
            }

            if (!participation) {
                participation = await ParticipationService.createParticipation(userId, body.eventId);
            }

            if (!userTaskSolution) {
                userTaskSolution = await SolutionModel.create({
                    userId,
                    posted: new Date(Date.now()),
                    code: body.code,
                    isPending: false,
                    taskId: body.taskId,
                    eventId: body.eventId,
                    comment: body.comment
                });
            } else {
                if (body.score) {
                    userTaskSolution.score = body.score;
                }
                userTaskSolution.posted = new Date(Date.now());
                userTaskSolution.code = body.code;
                userTaskSolution.isPending = false;
                userTaskSolution.comment = body.comment;
                await userTaskSolution.save();
                if (body.score) {
                    recalculateTotalScore(userId, body, event);
                }
            }

            return userTaskSolution;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async getSomeSolutions(solutionIds: Types.ObjectId[]): Promise<ISolutionModel[]> {
        try {
            const solutions: ISolutionModel[] = await SolutionModel.find({
                _id: {
                    $in: solutionIds
                }
            });

            return solutions;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async getAllUserSolutions(userId: Types.ObjectId, body: ISolutionModel): Promise<ISolutionModel[]> {
        try {
            const solutions: ISolutionModel[] = await SolutionModel.find({
                userId,
                eventId: body.eventId
            });

            return solutions;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async checkAllPendingSolutionsFromDB(): Promise<void> {
        try {
            const pendingSolutions: ISolutionModel[] = await SolutionModel.find({
                isPending: true
            });
            console.log('LAST SERVER SHUTDOWN PENDING SOLUTIONS: ' + pendingSolutions.length);

            CheckerService.checkAllPendingSolutions(
                pendingSolutions,
                prepareSolutionsCheckersArgs,
                () => console.log('LAST SERVER SHUTDOWN PENDING SOLUTIONS CHECKED')
            );
        } catch (err) {
            console.error(err);
        }
    }
};

async function recalculateTotalScore(userId: any, body: ISolutionModel, event: IEventsnModel): Promise<void> {
    const userEventSolutions: ISolutionModel[] = await SolutionModel.find({
        userId,
        eventId: body.eventId
    });

    const resultScore: number = userEventSolutions.reduce((a, b) => a + b.score, 0);

    const userParticipation: IParticipationModel = await ParticipationService.getUserParticipation(userId, body.eventId);

    userParticipation.totalScore = resultScore;
    userParticipation.save();
}

async function prepareSolutionsCheckersArgs(solutions: ISolutionModel[]): Promise<ICheckSolutionArgs[]> {
    const taskIds: Types.ObjectId[] = solutions.map((solution) => solution.taskId);
    const tasks: ITaskModel[] = await TaskModel.find({
        _id: {
            $in: taskIds
        }
    });
    const arrOfCheckersArgsObj: ICheckSolutionArgs[] = solutions.map((solution, indx) => {
        const solutionTask: ITaskModel = tasks[indx];
        const argsObj: ICheckSolutionArgs = {
            solution,
            answers: solutionTask.answers,
            timeout: solutionTask.timeout
        };

        return argsObj;
    });

    return arrOfCheckersArgsObj;
}

async function updateSolutionAndParticipation(result: ISolutionResult): Promise<void> {
    const {
        solution,
        participationId
    }: {
        solution: ISolutionModel,
        participationId?: Types.ObjectId
    } = result;
    const score: number = calculateScore(result);
    const oldScore: number = solution.score;

    try {
        solution.score = score;
        solution.isPending = false;
        await SolutionModel.findByIdAndUpdate(solution._id, solution);

        let participation: IParticipationModel = null;

        if (participationId) {
            participation = await ParticipationModel.findById(participationId);
        } else {
            participation = await ParticipationService.getUserParticipation(solution.userId, solution.eventId);
        }

        participation.totalScore += score - oldScore;
        await ParticipationModel.findByIdAndUpdate(participation._id, participation);
    } catch (err) {
        console.error('Error occured due to updating user solution and participation:');
        console.error(err.message);
    }
}

function calculateScore(solutionResult: ISolutionResult): number {
    const { right, total }: { right: number, total: number } = solutionResult;

    return Math.ceil(right / total * 100);
}

export default SolutionService;
