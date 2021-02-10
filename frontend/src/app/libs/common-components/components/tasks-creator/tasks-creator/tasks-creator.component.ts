import { Component, OnInit } from '@angular/core';
import { TasksTypes } from '../models/tasks-creator';

@Component({
  selector: 'app-tasks-creator',
  templateUrl: './tasks-creator.component.html',
  styleUrls: ['./tasks-creator.component.scss'],
})
export class TasksCreatorComponent implements OnInit {
  public taskTypesEnum: typeof TasksTypes = TasksTypes;
  public isListEmpty: boolean = false;
  public tasksTypes: Set<TasksTypes> = new Set([
    TasksTypes.text,
    TasksTypes.single,
    TasksTypes.multiple,
    TasksTypes.coding,
  ]);
  public selectedTaskType: TasksTypes = TasksTypes.single;

  constructor() {
  }

  ngOnInit(): void {
  }

}
