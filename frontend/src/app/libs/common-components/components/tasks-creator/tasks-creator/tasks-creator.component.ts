import { Component, Input, OnInit } from '@angular/core';
import { TasksTypes } from '../models/tasks-creator';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAnswer, ITask } from '../models/task';

interface ICreatedTaskControls {
  taskNameControl: string;
  selectedTaskTypeControl: TasksTypes;
  maxScoreControl: number;
  mentorCheckControl: boolean;
  answersArrayControl: IAnswer[];
}

@Component({
  selector: 'app-tasks-creator',
  templateUrl: './tasks-creator.component.html',
  styleUrls: ['./tasks-creator.component.scss'],
})
export class TasksCreatorComponent implements OnInit {

  @Input()
  public task: ITask;

  public isTaskTypesSelectorOpened: boolean;
  public taskName: string;
  public maxScore: number;
  public taskTypesEnum: typeof TasksTypes = TasksTypes;
  public isListEmpty: boolean = false;
  public tasksTypes: Set<TasksTypes> = new Set([
    TasksTypes.text,
    TasksTypes.single,
    TasksTypes.multiple,
    TasksTypes.coding,
  ]);
  public selectedTaskType: TasksTypes = TasksTypes.single;
  public isMentorCheckSelected: boolean;
  public taskCreatorControl: FormGroup;
  public isTaskNameEditMode: boolean = true;

  constructor(private formBuilder: FormBuilder) {
  }

  public onOpenTaskTypesSelector(isOpen: boolean): void {
    this.isTaskTypesSelectorOpened = isOpen;
  }

  public ngOnInit(): void {
    this.taskCreatorControl = this.formBuilder.group({
        taskNameControl: new FormControl(),
        selectedTaskTypeControl: new FormControl(TasksTypes.single),
        maxScoreControl: new FormControl(),
        mentorCheckControl: new FormControl(false),
        answersArrayControl: this.formBuilder.array([]),
      }
    );

    this.taskCreatorControl.valueChanges.subscribe(
      ({
         taskNameControl,
         selectedTaskTypeControl,
         maxScoreControl,
         mentorCheckControl,
         answersArrayControl
       }: ICreatedTaskControls) => {
        this.taskName = taskNameControl;
        this.selectedTaskType = selectedTaskTypeControl;
        this.maxScore = maxScoreControl;
        this.isMentorCheckSelected = (selectedTaskTypeControl === TasksTypes.coding)
          ? true
          : this.isMentorCheckSelected = mentorCheckControl;

        console.log(answersArrayControl);
      }
    );

  }

  public get answerControl(): FormArray {
    return this.taskCreatorControl.get('answersArrayControl') as FormArray;
  }

  public addSingleAnswer(): void {
    this.answerControl.push(this.formBuilder.group({
        label: '',
        isCorrect: false,
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

  private submitTask(): void {
  }
}
