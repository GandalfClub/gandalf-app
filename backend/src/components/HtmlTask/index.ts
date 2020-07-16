import { IHtmlTaskModel } from './model';
import HtmlTaskService from './service';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../config/error';
import { IUserModel } from '../User/model';

export async function findAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = req.user;
        const tasks: IHtmlTaskModel[] = await HtmlTaskService.findAllHtmlTasks();

        res.status(200).json(tasks);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function findAllTasksForEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tasks: IHtmlTaskModel[] = await HtmlTaskService.findAllHtmlTasksForEvent(req.body);

        res.status(201).json(tasks);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const task: IHtmlTaskModel = await HtmlTaskService.createHtmlTask(req.body);

        res.status(201).json(task);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const task: IHtmlTaskModel = await HtmlTaskService.updateHtmlTask(req.body);

        res.status(201).json(task);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
