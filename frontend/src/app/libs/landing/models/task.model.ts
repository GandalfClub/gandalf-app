export enum TasksTypes {
  Coding = 'CODING',
  Single = 'SINGLE',
  Multiple = 'MULTIPLE',
  Text = 'TEXT',
}

export enum SolutionStatus {
  Draft = 'DRAFT',
  Solved = 'SOLVED',
  Incorrect = 'INCORRECT',
  Pending = 'PENDING'
}

export interface Answer {
  label: string;
}

export interface Solution {
  status: SolutionStatus;
  value: string;
}

export interface Task {
  id: string;
  text: string;
  isDraft?: boolean;
  taskName: string;
  taskType: TasksTypes;
  mentorCheck: boolean;
  maxScore: number;
  question: string;
  code?: string;
  answers?: Set<Answer>;
  solution?: Solution;
}
