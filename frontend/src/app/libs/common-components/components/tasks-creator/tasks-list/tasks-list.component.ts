import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAnswer, ITask} from '../models/task';
import {TasksTypes} from '../models/tasks-creator';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @Input()
  public taskList: ITask[];

  @Output()
  public selectedTask: EventEmitter<ITask> = new EventEmitter<ITask>();

  public selectedTaskIndex: number = 0;

  public ngOnInit(): void {
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
