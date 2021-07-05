import { Action } from '@ngrx/store';
import { Solution, Task } from '../../landing/models/task.model';

export enum ActionTypes {
  TaskSelected = '[Events Info] Task Selected',
  FetchTasks = '[Events Info] Fetch Tasks',
  FetchTasksSuccess = '[Events Info] Fetch Tasks Success',
  FetchTasksError = '[Events Info] Fetch Tasks Error',
  SetSolution = '[Events Info] Set Solution'
}

export class TaskSelected implements Action {
  public readonly type: ActionTypes.TaskSelected = ActionTypes.TaskSelected;
  constructor(public payload: Task) { }
}

export class FetchTasks implements Action {
  public readonly type: ActionTypes.FetchTasks = ActionTypes.FetchTasks;
}

export class FetchTasksSuccess implements Action {
  public readonly type: ActionTypes.FetchTasksSuccess = ActionTypes.FetchTasksSuccess;
  constructor(public payload: Task[]) { }
}

export class FetchTasksError implements Action {
  public readonly type: ActionTypes.FetchTasksError = ActionTypes.FetchTasksError;
  constructor(public payload: Error) { }
}

export class SetSolution implements Action {
  public readonly type: ActionTypes.SetSolution = ActionTypes.SetSolution;
  constructor(public payload: Task) { }
}

export type EventInfoAction =
  TaskSelected
  | FetchTasks
  | FetchTasksSuccess
  | FetchTasksError
  | SetSolution;
