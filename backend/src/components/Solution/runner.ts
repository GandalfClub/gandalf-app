import { execFile, ChildProcess } from 'child_process';
import { ITaskAnswer, ISolutionResult } from './checker';
import TreeKill = require('tree-kill');
import { QueueWorkerCallback } from 'queue';
import { Types } from 'mongoose';
import { ISolutionModel } from './model';

export type TaskInput = any[][];

export type TaskOutput = any[];

const JS_RUNNER_FILE: string = __dirname + '/js-runner.js';

export function calculateSolutionResult(
    solution: ISolutionModel,
    answers: ITaskAnswer[],
    callback: QueueWorkerCallback,
    timeout: number,
    participationId?: Types.ObjectId
): void {
    let solutionResult: ISolutionResult = null;
    const userCode: string = solution.code;
    const zeroSolutionResult: ISolutionResult = {
        solution,
        participationId,
        right: 0,
        total: answers.length
    };
    const nodeArgs: string[] = [JS_RUNNER_FILE, userCode, JSON.stringify(answers)];
    const childProcess: ChildProcess = execFile('node', nodeArgs, (err, stdout, stderr) => {
        if (stderr || err) {
            solutionResult = zeroSolutionResult;
        } else {
            const { right, total }: { right: number, total: number } = JSON.parse(stdout);
            solutionResult = {
                solution,
                participationId,
                right,
                total,
            };
        }

        callback(null, solutionResult);
    });

    if (timeout > 0) {
        setTimeout(() => {
            if (solutionResult === null) {
                TreeKill(childProcess.pid);
                callback(null, zeroSolutionResult);
            }
        }, timeout);
    }
}
