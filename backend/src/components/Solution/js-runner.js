"use strict";
exports.__esModule = true;
var vm_1 = require("vm");
var solutionResult = calculateResultFromUserCode();
process.stdout.write(JSON.stringify(solutionResult));
function calculateResultFromUserCode() {
    var code = process.argv[2];
    var answersJson = process.argv[3];
    var answers = JSON.parse(answersJson);
    var input = answers.map(function (answer) { return answer.input; });
    var output = run(code, input);
    return calculateUserResult(answers, output);
}
function run(code, inputArr) {
    var sandbox = initializeSandbox();
    var processingCode = getProcessingCode();
    var output = [];
    vm_1.runInNewContext(code, sandbox);
    prepareSandboxForProcessingOutput(sandbox, inputArr);
    vm_1.runInNewContext(processingCode, sandbox);
    output = sandbox.output;
    return output;
}
function initializeSandbox() {
    var sandbox = Object.create(null);
    Object.defineProperties(sandbox, {
        solution: {
            value: null,
            writable: true
        }
    });
    return sandbox;
}
function prepareSandboxForProcessingOutput(sandbox, input) {
    sandbox.input = input;
    sandbox.processOutput = processOutput;
}
function processOutput(solution, input) {
    var output = input.map(function (args) {
        try {
            return solution.apply(void 0, args);
        }
        catch (err) {
            return err;
        }
    });
    return output;
}
function getProcessingCode() {
    return "output = processOutput(solution, input);";
}
function calculateUserResult(answers, userCodeOutput) {
    var rightOutputs = answers.map(function (answer) { return answer.output; });
    var amountOfRightAnswers = userCodeOutput.reduce(function (score, userOutput, index) {
        return score + Number(isUserAnswerRight(userOutput, rightOutputs[index]));
    }, 0);
    return {
        right: amountOfRightAnswers,
        total: rightOutputs.length
    };
}
function isUserAnswerRight(userOutput, rightOutput) {
    if (Array.isArray(rightOutput)) {
        var rightStr = JSON.stringify(rightOutput);
        var userStr = null;
        try {
            userStr = JSON.stringify(rightStr);
        }
        catch (e) {
            return false;
        }
        return userStr === rightStr;
    }
    return userOutput === rightOutput;
}
