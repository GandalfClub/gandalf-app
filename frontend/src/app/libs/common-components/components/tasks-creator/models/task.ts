import { TasksTypes } from './tasks-creator';

export interface Answer {
  label: string;
  isCorrect: boolean;
}

export interface Task {
  id: Symbol;
  isDraft?: boolean;
  taskName: string;
  taskType: TasksTypes;
  mentorCheck: boolean;
  maxScore: number;
  question: string;
  code?: string;
  answers?: Set<Answer>;
}
