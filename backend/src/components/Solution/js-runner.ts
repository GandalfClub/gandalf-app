import { runInNewContext as runCodeInSandbox } from 'vm';
import { TaskInput, TaskOutput } from './runner';
import { ITaskAnswer } from './checker';

interface ISolutionStats {
    right: number;
    total: number;
}

const solutionResult: ISolutionStats = calculateResultFromUserCode();

process.stdout.write(JSON.stringify(solutionResult));

interface Sandbox {
    solution: Function;
    input: TaskInput;
    output: TaskOutput;
    processOutput: (solution: Function, input: TaskInput) => TaskOutput;
}

function calculateResultFromUserCode(): ISolutionStats {
    const code: string = process.argv[2];
    const answersJson: string = process.argv[3];
    const answers: ITaskAnswer[] = JSON.parse(answersJson);
    const input: TaskInput = answers.map((answer) => answer.input);
    const output: TaskOutput = run(code, input);

    return calculateUserResult(answers, output);
}

function run(code: string, inputArr: TaskInput): TaskOutput {
    const sandbox: Sandbox = initializeSandbox();
    const processingCode: string = getProcessingCode();
    let output: TaskOutput = [];

    runCodeInSandbox(code, sandbox);
    prepareSandboxForProcessingOutput(sandbox, inputArr);
    runCodeInSandbox(processingCode, sandbox);
    output = sandbox.output;

    return output;
}

function initializeSandbox(): Sandbox {
    const sandbox: Sandbox = Object.create(null);

    Object.defineProperties(sandbox, {
        solution: {
            value: null,
            writable: true
        }
    });

    return sandbox;
}

function prepareSandboxForProcessingOutput(sandbox: Sandbox, input: TaskInput): void {
    sandbox.input = input;
    sandbox.processOutput = processOutput;
}

function processOutput(solution: Function, input: TaskInput): TaskOutput {
    const output: TaskOutput = input.map((args) => {
        try {
            return solution(...args);
        } catch (err) {
            return err;
        }
    });

    return output;
}

function getProcessingCode(): string {
    return `output = processOutput(solution, input);`;
}

function calculateUserResult(answers: ITaskAnswer[], userCodeOutput: any[]): ISolutionStats {
    const rightOutputs: TaskInput = answers.map((answer) => answer.output);
    const amountOfRightAnswers: number = userCodeOutput.reduce((
        score: number, userOutput: any, index: number
    ) => {
        return score + Number(isUserAnswerRight(userOutput, rightOutputs[index])); 
    }, 0);

    return {
        right: amountOfRightAnswers,
        total: rightOutputs.length
    };
}

function isUserAnswerRight(userOutput: any, rightOutput: any): boolean {
    if (Array.isArray(rightOutput)) {
        const rightStr: string = JSON.stringify(rightOutput);
        let userStr: string = null;
 
        try {
            userStr = JSON.stringify(rightStr);
        } catch (e) {
            return false;
        }

        return userStr === rightStr;
    }

    return userOutput === rightOutput;
}
