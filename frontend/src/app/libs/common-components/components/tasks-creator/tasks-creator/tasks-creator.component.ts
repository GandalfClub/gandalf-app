import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TasksTypes } from '../models/tasks-creator';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAnswer, ITask } from '../models/task';

interface ICreatedTaskControls {
  taskNameControl: string;
  selectedTaskTypeControl: TasksTypes;
  maxScoreControl: number;
  mentorCheckControl: boolean;
  textEditorControl: string;
  answersArrayControl: IAnswer[];
  codeEditorControl: string;
  correctSingleAnswerControl: number;
}

interface SingleAnswer {
  label: string;
}

@Component({
  selector: 'app-tasks-creator',
  templateUrl: './tasks-creator.component.html',
  styleUrls: ['./tasks-creator.component.scss'],
})
export class TasksCreatorComponent implements OnInit, OnChanges {

  @Input()
  public selectedTask: ITask;

  public isTaskTypesSelectorOpened: boolean;
  public maxScore: number;
  public taskName: string;
  public taskTypesEnum: typeof TasksTypes = TasksTypes;
  public tasksTypes: Set<TasksTypes> = new Set([
    TasksTypes.text,
    TasksTypes.single,
    TasksTypes.multiple,
    TasksTypes.coding,
  ]);
  public taskCreatorControl: FormGroup;
  public isTaskNameEditMode: boolean = true;
  public code: string;

  private enteredCode: string;

  constructor(private formBuilder: FormBuilder) {
  }

  get selectedTaskType(): TasksTypes {
    return this.taskCreatorControl.get('selectedTaskTypeControl')?.value ?? TasksTypes.single;
  }

  get isMentorCheckSelected(): boolean {
    return this.taskCreatorControl.get('mentorCheckControl')?.value ?? false;
  }

  get singleAnswersControl(): FormArray {
    return this.taskCreatorControl?.get('answersArrayControl') as FormArray ?? null;
  }

  get textEditorQuestion(): string {
    return this.taskCreatorControl.get('textEditorControl')?.value ?? null;
  }

  get correctSingleAnswer(): number {
    return parseInt(this.taskCreatorControl.get('correctSingleAnswerControl')?.value, 10) ?? null;
  }

  get multiAnswerControl(): FormArray {
    return this.taskCreatorControl.get('multiAnswersArrayControl') as FormArray;
  }

  set isMentorCheckSelected(value: boolean) {
    this.taskCreatorControl.get('mentorCheckControl')?.setValue(value);
  }

  public onOpenTaskTypesSelector(isOpen: boolean): void {
    this.isTaskTypesSelectorOpened = isOpen;
  }

  public get isListEmpty(): boolean {
    return !Boolean(this.selectedTask);
  }

  public ngOnInit(): void {
    this.taskCreatorControl = this.formBuilder.group({
      taskNameControl: new FormControl(),
      selectedTaskTypeControl: new FormControl(),
      maxScoreControl: new FormControl(),
      mentorCheckControl: new FormControl(),
      textEditorControl: new FormControl(),
      codeEditorControl: new FormControl(),
      correctSingleAnswerControl: new FormControl(),
      answersArrayControl: this.formBuilder.array([]),
      multiAnswersArrayControl: this.formBuilder.array([]),
    });

    this.taskCreatorControl.valueChanges.subscribe(
      (val: ICreatedTaskControls) => {
        this.maxScore = val.maxScoreControl;
        if (this.selectedTaskType === TasksTypes.coding && this.isMentorCheckSelected === false) {
          this.isMentorCheckSelected = true;
        }
        this.taskName = val.taskNameControl;
      }
    );

  }

  public ngOnChanges(): void {
    if (this.taskCreatorControl && this.selectedTask) {
      this.setSelectedTaskValues(this.selectedTask);
    }
  }

  public addSingleAnswer(answer?: IAnswer): void {
    this.singleAnswersControl.push(this.formBuilder.group({
        label: new FormControl(answer?.label ?? ''),
      }
    ));
  }

  public addMultiAnswer(answer?: IAnswer): void {
    this.multiAnswerControl.push(
      new FormGroup({
        isCorrect: new FormControl(answer?.isCorrect ?? ''),
        value: new FormControl(answer?.label ?? ''),
      })
    );
  }

  public removeSingleAnswer(index: number): void {
    this.singleAnswersControl.removeAt(index);
  }

  public removeMultiAnswer(index: number): void {
    this.multiAnswerControl.removeAt(index);
  }

  public isMentorCheckDisabled(): boolean {
    return this.selectedTaskType === TasksTypes.coding;
  }

  public getSelectedTaskType(): TasksTypes {
    return this.selectedTaskType;
  }

  public clearTaskName(): void {
    this.taskCreatorControl.get('taskNameControl')?.setValue('');
  }

  public updateCode(code: string): void {
    this.enteredCode = code;
  }

  public submitTask(): void {
    const task: ITask = {
      taskName: this.taskName,
      taskType: this.selectedTaskType,
      mentorCheck: this.isMentorCheckSelected,
      maxScore: this.maxScore,
      question: this.textEditorQuestion,
    };

    switch (this.selectedTaskType) {
      case TasksTypes.coding:
        task.code = this.enteredCode ?? this.code;
        break;
      case TasksTypes.multiple:
        task.answers = this.getAnswers();
        break;
      case TasksTypes.single:
        task.answers = this.getAnswers();
        break;
      default:
    }
  }

  private getAnswers(): Set<IAnswer> {
    const answers: Set<IAnswer> = new Set<IAnswer>();
    if (this.selectedTaskType === TasksTypes.single) {
      this.singleAnswersControl.value.forEach(({ label }: SingleAnswer, index: number) => {
        answers.add({
          label,
          isCorrect: index === this.correctSingleAnswer,
        });
      });
    } else if (this.selectedTaskType === TasksTypes.multiple) {
      this.multiAnswerControl.value.forEach(({ label, isCorrect }: IAnswer) => {
        answers.add({
          label,
          isCorrect,
        });
      });
    }
    return answers;
  }

  private setSelectedTaskValues(task: ITask): void {
    const {
      taskName,
      taskType,
      mentorCheck,
      maxScore,
      question,
      code,
      answers,
    }: ITask = task;

    this.taskName = taskName;
    this.taskCreatorControl.controls['selectedTaskTypeControl'].setValue(taskType);
    this.taskCreatorControl.controls['maxScoreControl'].setValue(maxScore ?? 0);
    this.isMentorCheckSelected = mentorCheck;
    this.taskCreatorControl.controls['textEditorControl'].setValue(question);
    if (answers) {
      this.clearAnswersControl(this.singleAnswersControl);
      this.clearAnswersControl(this.multiAnswerControl);
      let index: number = 0;
      answers.forEach((answer: IAnswer) => {
        this.addMultiAnswer(answer);
        this.addSingleAnswer(answer);
        if (answer.isCorrect) {
          this.taskCreatorControl.controls['correctSingleAnswerControl'].setValue(index.toString());
          index++;
        }
      });
    }
    if (Boolean(code)) {
      this.taskCreatorControl.controls['codeEditorControl'].setValue(code);
    }
  }

  private clearAnswersControl(formArray: FormArray): void {
    while (formArray.length) {
      formArray.removeAt(0);
    }
  }
}
