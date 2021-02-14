import {TasksTypes} from './tasks-creator';

export interface IAnswer {
  label: string;
  isCorrect: boolean;
}

export interface ITask {
  taskName: string;
  taskType: TasksTypes;
  mentorCheck: boolean;
  maxScore: number;
  question: string;
  code?: string;
  answers?: Map<number, IAnswer>;
}
