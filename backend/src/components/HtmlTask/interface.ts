import { IHtmlTaskModel, IHtmlTaskModelUpdate } from './model';
import { ISolutionModel } from '../Solution/model';

export interface ITaskService {
    findAllHtmlTasks(): Promise<IHtmlTaskModel[]>;
    findAllHtmlTasksForEvent(body: string[]): Promise<IHtmlTaskModel[]>;
    createHtmlTask(body: IHtmlTaskModel): Promise<IHtmlTaskModel>;
    updateHtmlTask(body: IHtmlTaskModelUpdate): Promise<IHtmlTaskModel>;
}
