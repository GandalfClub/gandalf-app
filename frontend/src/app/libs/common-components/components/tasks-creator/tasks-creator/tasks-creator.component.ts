import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TasksTypes } from '../models/tasks-creator';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAnswer, ITask } from '../models/task';
import { ISelectOption } from '../../select/models/select-option';
import { TranslateService } from '@ngx-translate/core';
import { AutoCloseable } from '../../../../utils/auto-closable';
import { takeUntil } from 'rxjs/operators';

interface SingleAnswer {
  label: string;
}

@Component({
  selector: 'app-tasks-creator',
  templateUrl: './tasks-creator.component.html',
  styleUrls: ['./tasks-creator.component.scss'],
})
export class TasksCreatorComponent extends AutoCloseable implements OnInit, OnChanges {

  @Input()
  public selectedTask: ITask;

  @Output()
  public passForm: EventEmitter<ITask> = new EventEmitter<ITask>();

  @Output()
  public removeTask: EventEmitter<Symbol> = new EventEmitter<Symbol>();

  public taskName: string;
  public isTaskTypesSelectorOpened: boolean;
  public taskTypesEnum: typeof TasksTypes = TasksTypes;
  public tasksTypes: Set<TasksTypes> = new Set([
    TasksTypes.text,
    TasksTypes.single,
    TasksTypes.multiple,
    TasksTypes.coding,
  ]);
  public taskCreatorControl: FormGroup;
  public isTaskNameEditMode: boolean = false;
  public code: string;
  public taskType: TasksTypes;
  public taskTypeOptions: ISelectOption[] = [];

  private enteredCode: string;
  private taskId: Symbol;
  private readonly langTaskTypesKey: string = 'TASK-CREATION.TASKS_TYPES';

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService) {
    super();
    this.taskCreatorControl = this.formBuilder.group({
      selectedTaskTypeControl: new FormControl(),
      maxScoreControl: new FormControl(),
      mentorCheckControl: new FormControl(),
      textEditorControl: new FormControl(),
    });

    this.translateService.get([this.langTaskTypesKey])
    .pipe(takeUntil(this.destroyedSource$))
    .subscribe(
      (labels: object) => {
        this.taskTypeOptions.length = 0;
        this.tasksTypes.forEach((taskType: TasksTypes) => {
          this.taskTypeOptions.push({
            label: labels[this.langTaskTypesKey][taskType],
            value: taskType,
          });
        });
      }
    );
  }

  get selectedTaskType(): TasksTypes {
    return this.taskCreatorControl.get('selectedTaskTypeControl')?.value ?? TasksTypes.single;
  }

  get taskNameFromControl(): string {
    return this.taskCreatorControl.get('taskNameControl')?.value ?? '';
  }

  get maxScore(): number {
    return this.taskCreatorControl.get('maxScoreControl')?.value ?? 0;
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
    return this.taskCreatorControl.get('multiAnswersArrayControl') as FormArray ?? null;
  }

  get isListEmpty(): boolean {
    return !Boolean(this.selectedTask);
  }

  set isMentorCheckSelected(value: boolean) {
    this.taskCreatorControl.get('mentorCheckControl')?.setValue(value);
  }

  set maxScore(value: number) {
    this.taskCreatorControl.get('maxScoreControl')?.setValue(value);
  }

  set taskNameControl(value: string) {
    this.taskCreatorControl.get('taskNameControl')?.setValue(value ?? '');
  }

  set textEditorQuestion(value: string) {
    this.taskCreatorControl.get('textEditorControl')?.setValue(value ?? '');
  }

  set selectedTaskType(value: TasksTypes) {
    this.taskCreatorControl.controls['selectedTaskTypeControl'].setValue(value);
  }

  public onOpenTaskTypesSelector(isOpen: boolean): void {
    this.isTaskTypesSelectorOpened = isOpen;
  }

  public enableTaskNameEditMode(): void {
    this.taskCreatorControl.addControl('taskNameControl', new FormControl());
    this.taskNameControl = this.taskName;
    this.isTaskNameEditMode = true;
  }

  public rebuildFormControls(tasksTypes: TasksTypes): void {
    switch (tasksTypes) {
      case TasksTypes.single:
        this.removeControlsOfTaskType(TasksTypes.single);
        this.taskCreatorControl.addControl('correctSingleAnswerControl', new FormControl());
        this.taskCreatorControl.addControl('answersArrayControl', this.formBuilder.array([]));
        break;

      case TasksTypes.multiple:
        this.removeControlsOfTaskType(TasksTypes.multiple);
        this.taskCreatorControl.addControl('multiAnswersArrayControl', this.formBuilder.array([]));
        break;

      case TasksTypes.coding:
        this.removeControlsOfTaskType(TasksTypes.coding);
        this.taskCreatorControl.addControl('codeEditorControl', new FormControl());
        break;

      case TasksTypes.text:
        this.removeControlsOfTaskType(TasksTypes.text);
        break;

      default:
    }
  }

  public disableTaskNameEditMode(): void {
    this.taskName = this.taskNameFromControl;
    this.taskCreatorControl.removeControl('taskNameControl');
    this.isTaskNameEditMode = false;
  }

  public ngOnInit(): void {
    this.rebuildFormControls(this.selectedTaskType);

    this.taskCreatorControl.valueChanges.subscribe(
      () => {
        if (this.selectedTaskType === TasksTypes.coding && this.isMentorCheckSelected === false) {
          this.isMentorCheckSelected = true;
        }
        this.taskType = this.selectedTaskType;
        this.emitForm();
      }
    );
  }

  public ngOnChanges(): void {
    if (this.taskCreatorControl && this.selectedTask) {
      this.setSelectedTaskValues(this.selectedTask);
    }
  }

  public addSingleAnswer(answer?: IAnswer): void {
    if (this.singleAnswersControl) {
      this.singleAnswersControl.push(this.formBuilder.group({
          label: new FormControl(answer?.label ?? ''),
        }
      ));
    }
  }

  public addMultiAnswer(answer?: IAnswer): void {
    if (this.multiAnswerControl) {
      this.multiAnswerControl.push(
        new FormGroup({
          isCorrect: new FormControl(answer?.isCorrect ?? ''),
          label: new FormControl(answer?.label ?? ''),
        })
      );
    }
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
    this.taskName = '';
    this.taskCreatorControl.get('taskNameControl')?.setValue('');
  }

  public updateCode(code: string): void {
    this.enteredCode = code;
  }

  public deleteTask(): void {
    this.removeTask.emit(this.taskId);
  }

  private removeControlsOfTaskType(taskType: TasksTypes): void {
    if (taskType !== TasksTypes.single
      && this.taskCreatorControl.contains('correctSingleAnswerControl')
      && this.taskCreatorControl.contains('answersArrayControl')) {

      this.taskCreatorControl.removeControl('correctSingleAnswerControl');
      this.taskCreatorControl.removeControl('answersArrayControl');
    }

    if (taskType !== TasksTypes.coding && this.taskCreatorControl.contains('codeEditorControl')) {
      this.taskCreatorControl.removeControl('codeEditorControl');
    }

    if (taskType !== TasksTypes.multiple && this.taskCreatorControl.contains('multiAnswersArrayControl')) {
      this.taskCreatorControl.removeControl('multiAnswersArrayControl');
    }
  }

  private emitForm(): void {
    const task: ITask = {
      id: this.taskId ?? Symbol('id'),
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

    this.passForm.emit(task);
  }

  private getAnswers(): Set<IAnswer> {
    const answers: Set<IAnswer> = new Set<IAnswer>();
    if (this.selectedTaskType === TasksTypes.single) {
      this.singleAnswersControl?.value?.forEach(({ label }: SingleAnswer, index: number) => {
        answers.add({
          label,
          isCorrect: index === this.correctSingleAnswer,
        });
      });
    } else if (this.selectedTaskType === TasksTypes.multiple) {
      this.multiAnswerControl?.value?.forEach(({ label, isCorrect }: IAnswer) => {
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
      id,
      taskName,
      taskType,
      mentorCheck,
      maxScore,
      question,
      code,
      answers,
    }: ITask = task;

    this.taskId = id;
    this.taskName = taskName;
    this.selectedTaskType = taskType;
    this.rebuildFormControls(taskType);
    this.maxScore = maxScore;
    this.isMentorCheckSelected = mentorCheck;
    this.textEditorQuestion = question;
    if (answers) {
      if (this.singleAnswersControl) {
        this.clearAnswersControl(this.singleAnswersControl);
      }
      if (this.multiAnswerControl) {
        this.clearAnswersControl(this.multiAnswerControl);
      }
      let index: number = 0;
      answers.forEach((answer: IAnswer) => {
        this.addMultiAnswer(answer);
        this.addSingleAnswer(answer);
        if (answer.isCorrect) {
          this.taskCreatorControl?.controls['correctSingleAnswerControl']?.setValue(index.toString());
          index++;
        }
      });
    }
    if (Boolean(code)) {
      this.enteredCode = code;
      this.taskCreatorControl?.controls['codeEditorControl']?.setValue(code);
    }
  }

  private clearAnswersControl(formArray: FormArray): void {
    while (formArray.length > 0) {
      formArray.removeAt(0);
    }
  }
}
