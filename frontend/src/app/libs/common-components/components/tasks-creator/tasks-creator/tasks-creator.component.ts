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
  public taskName: string;
  public maxScore: number;
  public taskTypesEnum: typeof TasksTypes = TasksTypes;
  public tasksTypes: Set<TasksTypes> = new Set([
    TasksTypes.text,
    TasksTypes.single,
    TasksTypes.multiple,
    TasksTypes.coding,
  ]);
  public selectedTaskType: TasksTypes;
  public taskCreatorControl: FormGroup;
  public isTaskNameEditMode: boolean = true;
  public code: string;

  private enteredCode: string;

  constructor(private formBuilder: FormBuilder) {
  }

  get isMentorCheckSelected(): boolean {
    return this.taskCreatorControl.get('isMentorCheckSelected')?.value as boolean ?? false;
  }

  get answerControl(): FormArray {
    return this.taskCreatorControl.get('answersArrayControl') as FormArray;
  }

  set isMentorCheckSelected(value: boolean) {
    this.taskCreatorControl.get('isMentorCheckSelected')?.setValue(value);
  }

  public onOpenTaskTypesSelector(isOpen: boolean): void {
    this.isTaskTypesSelectorOpened = isOpen;
  }

  public get isListEmpty(): boolean {
    return !Boolean(this.selectedTask) ?? true;
  }

  public ngOnInit(): void {
    this.taskCreatorControl = this.formBuilder.group({
        taskNameControl: new FormControl(),
        selectedTaskTypeControl: new FormControl(),
        maxScoreControl: new FormControl(),
        mentorCheckControl: new FormControl(),
        textEditorControl: new FormControl(),
        answersArrayControl: this.formBuilder.array([]),
        codeEditorControl: new FormControl(),
      }
    );

    this.taskCreatorControl.valueChanges.subscribe(
      ({
         taskNameControl,
         selectedTaskTypeControl,
         maxScoreControl,
         mentorCheckControl,
         textEditorControl,
         answersArrayControl,
         codeEditorControl,
       }: ICreatedTaskControls) => {
        this.taskName = taskNameControl;
        this.selectedTaskType = selectedTaskTypeControl;
        this.maxScore = maxScoreControl;
        this.isMentorCheckSelected = (selectedTaskTypeControl === TasksTypes.coding)
          ? true
          : this.isMentorCheckSelected = mentorCheckControl;
      }
    );

  }

  public ngOnChanges(): void {
    if (this.selectedTask) {
      this.setSelectedTaskValues(this.selectedTask);
    }
  }

  public addSingleAnswer(value?: IAnswer): void {
    this.answerControl.push(this.formBuilder.group({
        label: value?.label ?? '',
        isCorrect: value?.isCorrect ?? '',
      }
    ));
  }

  public removeSingleAnswer(index: number): void {
    this.answerControl.removeAt(index);
  }

  public isMentorCheckDisabled(): boolean {
    return this.selectedTaskType === TasksTypes.coding;
  }

  public getSelectedTaskType(): TasksTypes {
    return this.selectedTaskType;
  }

  public clearTaskName(): void {
    this.taskCreatorControl.controls['taskNameControl'].setValue('');
  }

  public updateCode(code: string): void {
    this.enteredCode = code;
  }

  private submitTask(): void {
  }

  private setSelectedTaskValues(task: ITask): void {
    this.taskCreatorControl.controls['taskNameControl'].setValue(task.taskName);
    this.taskCreatorControl.controls['selectedTaskTypeControl'].setValue(task.taskType);
    this.taskCreatorControl.controls['maxScoreControl'].setValue(task.maxScore);
    this.isMentorCheckSelected = task.mentorCheck;
    this.taskCreatorControl.controls['textEditorControl'].setValue(task.question);
    if (task.answers) {
      this.taskCreatorControl.controls['answersArrayControl'].setValue([]);
      task.answers.forEach((answer: IAnswer) => {
        this.addSingleAnswer(answer);
      });
    }
    if (Boolean(task.code)) {
      this.taskCreatorControl.controls['codeEditorControl'].setValue(task.code);
    }
  }
}
