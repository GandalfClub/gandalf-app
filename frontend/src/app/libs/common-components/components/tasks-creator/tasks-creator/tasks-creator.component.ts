import { Component, OnInit } from '@angular/core';
import { TasksTypes } from '../models/tasks-creator';
import { FormControl, FormGroup } from '@angular/forms';

interface ICreatedTask {
  taskNameControl: string;
  selectedTaskTypeControl: TasksTypes;
  maxScoreControl: number;
  mentorCheckControl: boolean;
}

@Component({
  selector: 'app-tasks-creator',
  templateUrl: './tasks-creator.component.html',
  styleUrls: ['./tasks-creator.component.scss'],
})
export class TasksCreatorComponent implements OnInit {
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

  constructor() {
  }

  public onOpenTaskTypesSelector(isOpen: boolean): void {
    this.isTaskTypesSelectorOpened = isOpen;
    if (this.selectedTaskType === TasksTypes.coding) {
      this.isMentorCheckSelected = true;
    }
  }

  public ngOnInit(): void {
    this.taskCreatorControl = new FormGroup({
      taskNameControl: new FormControl(),
      selectedTaskTypeControl: new FormControl(),
      maxScoreControl: new FormControl(),
      mentorCheckControl: new FormControl(),
    });

    this.taskCreatorControl.valueChanges.subscribe(
      ({ taskNameControl, selectedTaskTypeControl, maxScoreControl, mentorCheckControl }: ICreatedTask) => {
        this.taskName = taskNameControl;
        this.selectedTaskType = selectedTaskTypeControl;
        this.maxScore = maxScoreControl;
        this.isMentorCheckSelected = mentorCheckControl;
      }
    );

  }

  public isMentorCheckDisabled(): boolean {
    return this.selectedTaskType === TasksTypes.coding;
  }

}
