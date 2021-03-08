import { Component, EventEmitter, Output } from '@angular/core';
import { ITask } from '../../common-components/components/tasks-creator/models/task';

@Component({
  selector: 'app-tasks-creator-page',
  templateUrl: './tasks-creator-page.component.html',
  styleUrls: ['./tasks-creator-page.component.scss'],
})
export class TasksCreatorPageComponent {
  public selectedTask: ITask;

  @Output()
  public passForm: EventEmitter<ITask> = new EventEmitter<ITask>();

  @Output()
  public removeTask: EventEmitter<Symbol> = new EventEmitter<Symbol>();

  public showSelectedTask(task: ITask): void {
    this.selectedTask = task;
  }
}
