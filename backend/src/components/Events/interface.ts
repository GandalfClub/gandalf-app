import { IEventsnModel, IEventTaskUpdate, IEventsnModelUpdate, IEventParticipationModel, } from './model';

export interface IEventsService {
    createEvent(eventInfo: IEventsnModel): Promise<IEventsnModel>;
    updateEvent(eventInfo: IEventsnModelUpdate): Promise<IEventsnModel>;
    getAllEvents(): Promise<IEventsnModel[]>;
    updateTaskInEvent(body: IEventTaskUpdate): Promise<IEventsnModel>;
    deleteEvent(body: any): Promise<void>;
    addNewEventParticipation(participation: IEventParticipationModel): Promise<IEventParticipationModel>;
}
