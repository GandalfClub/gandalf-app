import { IEventParticipationModel, IEventsModel } from './model';
import EventsService from './service';
import HttpError from '../../config/error';
import { Request, Response, NextFunction } from 'express';

export async function getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const events: IEventsModel[] = await EventsService.getAllEvents();

        res.status(200).json(events);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.query;
        const event: IEventsModel = await EventsService.getEventById(id);

        res.status(200).json(event);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const event: IEventsModel = await EventsService.createEvent(req.body);

        res.status(201).json(event);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.query;
        const event: IEventsModel = await EventsService.updateEvent(req.body, id);

        res.status(201).json(event);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function updateTaskInEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const event: IEventsModel = await EventsService.updateTaskInEvent(req.body);

        res.status(201).json(event);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await EventsService.deleteEvent(req.body);

        res.status(201).json({});
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function addNewEventParticipation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const participation: IEventParticipationModel = await EventsService.addNewEventParticipation(req.body);

        res.status(201).json(participation);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
