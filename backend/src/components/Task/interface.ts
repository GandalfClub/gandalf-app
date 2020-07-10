import { ITaskModel, ITaskModelUpdate, ITaskTypeModel } from './model';
import { ISolutionModel } from '../Solution/model';

export interface ITaskService {
    findAllTasks(): Promise<ITaskModel[]>;
    findAllTasksForEvent(body: string[]): Promise<ITaskModel[]>;
    createTask(body: ITaskModel): Promise<ITaskModel>;
    updateTask(body: ITaskModelUpdate): Promise<ITaskModel>;
    createTaskType(body: ITaskTypeModel): Promise<ITaskTypeModel>;
    deleteTaskType(body: any): Promise<void>;
    deleteTask(body: any): Promise<void>;
    findAllTaskTypes(): Promise<ITaskTypeModel[]>;
}
