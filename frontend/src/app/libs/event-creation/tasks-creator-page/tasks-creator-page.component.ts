import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITask } from '../../common-components/components/tasks-creator/models/task';
import { NewEventFacadeService } from '../store/event.facade';
import { AutoCloseable } from '../../utils/auto-closable';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-creator-page',
  templateUrl: './tasks-creator-page.component.html',
  styleUrls: ['./tasks-creator-page.component.scss'],
})
export class TasksCreatorPageComponent extends AutoCloseable implements OnInit {
  public selectedTask: ITask;
  public tasks: ITask[];

  @Output()
  public passForm: EventEmitter<ITask> = new EventEmitter<ITask>();

  constructor(private eventFacadeService: NewEventFacadeService) {
    super();
  }

  public showSelectedTask(task: ITask): void {
    this.selectedTask = task;
  }

  public ngOnInit(): void {
    this.eventFacadeService.tasks$
    .pipe(
      takeUntil(this.destroyedSource$),
    )
    .subscribe(
      (tasks: Set<ITask>): void => {
        this.tasks = [...tasks];
      },
    );
  }
}
