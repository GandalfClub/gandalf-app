import { ISolutionModel } from './model';
import { Types } from 'mongoose';

export interface ISolutionService {
    getSomeSolutions(soulutionsId: Types.ObjectId[]): Promise<ISolutionModel[]>;
    postSolution(userId: Types.ObjectId, body: ISolutionModel): Promise<ISolutionModel>;
    postHtmlSolution(userId: Types.ObjectId, body: ISolutionModel): Promise<ISolutionModel>;
    getAllUserSolutions(userId: Types.ObjectId, body: ISolutionModel): Promise<ISolutionModel[]>;
    checkAllPendingSolutionsFromDB(): Promise<void>;
}
