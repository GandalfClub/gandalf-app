import { IEventsnModel, IEventTaskUpdate, IEventsnModelUpdate, } from './model';
import { Types } from 'mongoose';

export interface IEventsService {
    createEvent(eventInfo: IEventsnModel): Promise<IEventsnModel>;
    updateEvent(eventInfo: IEventsnModelUpdate): Promise<IEventsnModel>;
    getAllEvents(): Promise<IEventsnModel[]>;
    updateTaskInEvent(body: IEventTaskUpdate): Promise<IEventsnModel>;
    deleteEvent(body: any): Promise<void>;
}
