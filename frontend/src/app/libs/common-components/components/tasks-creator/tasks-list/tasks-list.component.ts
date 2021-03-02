import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IAnswer, ITask } from '../models/task';
import { TasksTypes } from '../models/tasks-creator';
import { takeUntil } from 'rxjs/operators';
import { NewEventFacadeService } from '../../../../event-creation/store/event.facade';
import { AutoCloseable } from '../../../../utils/auto-closable';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent extends AutoCloseable implements OnInit {
  public taskList: ITask[];

  public selectedTaskIndex: number;

  @Output()
  public selectedTask: EventEmitter<ITask> = new EventEmitter<ITask>();

  constructor(private eventFacadeService: NewEventFacadeService) {
    super();
  }

  public ngOnInit(): void {
    this.eventFacadeService.tasks$
    .pipe(
      takeUntil(this.destroyedSource$),
    )
    .subscribe(
      (tasks: Set<ITask>): void => {
        this.taskList = [...tasks];
        if (!Boolean(this.selectedTaskIndex)) {
          this.selectedTaskIndex = 0;
          this.showTask(this.selectedTaskIndex);
        }
      },
    );

    this.showTask(0);
  }

  get tasksLength(): number {
    return this.taskList?.length ?? 0;
  }

  public showTask(index: number): void {
    this.selectedTask.emit(this.taskList[index]);
    this.selectedTaskIndex = index;
  }

  public addNewTask(): void {
    const defaultTask: ITask = {
      taskName: 'Task name',
      taskType: TasksTypes.single,
      mentorCheck: false,
      maxScore: null,
      question: null,
      answers: new Set<IAnswer>([
        {
          label: '',
          isCorrect: false,
        },
        {
          label: '',
          isCorrect: false,
        },
      ]),
    };

    this.taskList.unshift(defaultTask);
    this.showTask(0);
  }
}
