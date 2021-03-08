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

  public isTaskTypesSelectorOpened: boolean;
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
  public taskTypeOptions: ISelectOption[] = [];

  private enteredCode: string;
  private taskId: Symbol;
  private readonly langTaskTypesKey: string = 'TASK-CREATION.TASKS_TYPES';

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService) {
    super();
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

  get taskName(): string {
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
    return this.taskCreatorControl.get('multiAnswersArrayControl') as FormArray;
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

  set taskName(value: string) {
    this.taskCreatorControl.get('taskNameControl')?.setValue(value ?? '');
  }

  set textEditorQuestion(value: string) {
    this.taskCreatorControl.get('textEditorControl')?.setValue(value ?? '');
  }

  public onOpenTaskTypesSelector(isOpen: boolean): void {
    this.isTaskTypesSelectorOpened = isOpen;
  }

  public ngOnInit(): void {
    this.taskCreatorControl.valueChanges.subscribe(
      () => {
        if (this.selectedTaskType === TasksTypes.coding && this.isMentorCheckSelected === false) {
          this.isMentorCheckSelected = true;
        }
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
    this.singleAnswersControl.push(this.formBuilder.group({
        label: new FormControl(answer?.label ?? ''),
      }
    ));
  }

  public addMultiAnswer(answer?: IAnswer): void {
    this.multiAnswerControl.push(
      new FormGroup({
        isCorrect: new FormControl(answer?.isCorrect ?? ''),
        label: new FormControl(answer?.label ?? ''),
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

  public deleteTask(): void {
    this.removeTask.emit(this.taskId);
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
    this.taskCreatorControl.controls['selectedTaskTypeControl'].setValue(taskType);
    this.maxScore = maxScore;
    this.isMentorCheckSelected = mentorCheck;
    this.textEditorQuestion = question;
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
    while (formArray.length > 0) {
      formArray.removeAt(0);
    }
  }
}
