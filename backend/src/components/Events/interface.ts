import {
    IEventsModel,
    IEventTaskUpdate,
    IEventParticipationModel,
    IGeneralEventInfo,
} from './model';

export interface IEventsService {
    createEvent(eventInfo: { title: string }): Promise<IEventsModel>;
    updateEvent(eventInfo: IGeneralEventInfo, id: string): Promise<IEventsModel>;
    getAllEvents(): Promise<IEventsModel[]>;
    getEventById(id: string): Promise<IEventsModel>;
    updateTaskInEvent(body: IEventTaskUpdate): Promise<IEventsModel>;
    deleteEvent(body: any): Promise<void>;
    addNewEventParticipation(participation: IEventParticipationModel): Promise<IEventParticipationModel>;
}
