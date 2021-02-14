import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../models/task';
import { TasksTypes } from '../models/tasks-creator';

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

  public ngOnInit(): void {
    this.taskList = [
      {
        taskName: 'task 1',
        taskType: TasksTypes.single,
        mentorCheck: false,
        maxScore: 100,
        question: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?</p>',
        answers: new Map([
          [0, {
            label: 'label',
            isCorrect: false,
          }],
          [1, {
            label: 'Some label12',
            isCorrect: true,
          }],
        ]),
      },
      {
        taskName: 'task 2',
        taskType: TasksTypes.coding,
        mentorCheck: true,
        maxScore: 300,
        question: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?</p>',
        code: 'some code',
      },
      {
        taskName: 'task 3',
        taskType: TasksTypes.multiple,
        mentorCheck: false,
        maxScore: 100,
        question: '<p>Question text3</p>',
        answers: new Map([
          [0, {
            label: 'Some label31',
            isCorrect: false,
          }],
          [1, {
            label: 'Some label32',
            isCorrect: true,
          }],
        ]),
      }
    ];
  }

  get tasksLength(): number {
    return this.taskList?.length ?? 0;
  }

  public showTask(index: number): void {
    this.selectedTask.emit(this.taskList[index]);
  }
}
