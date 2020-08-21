import { NextFunction, Request, Response } from 'express';
import HttpError from '../../config/error';
import { IPublicEventsModel } from './model';
import PublicEventsService from './service';

export async function getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const events: IPublicEventsModel[] = await PublicEventsService.getAllEvents();

		res.status(200).json(events);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}
