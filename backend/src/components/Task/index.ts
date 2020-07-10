import { ITaskModel, ITaskTypeModel } from './model';
import TaskService from './service';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../config/error';
import { IUserModel } from '../User/model';

export async function findAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = req.user;
        const tasks: ITaskModel[] = await TaskService.findAllTasks();

        if (!user.isAdmin) {
            tasks.forEach((task) => task.answers = null);
        }

        res.status(200).json(tasks);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function findAllTasksForEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tasks: ITaskModel[] = await TaskService.findAllTasksForEvent(req.body);

        res.status(201).json(tasks);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const task: ITaskModel = await TaskService.createTask(req.body);

        res.status(201).json(task);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const task: ITaskModel = await TaskService.updateTask(req.body);

        res.status(201).json(task);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function createTaskType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const taskType: ITaskTypeModel = await TaskService.createTaskType(req.body);

        res.status(201).json(taskType);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function deleteTaskType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await TaskService.deleteTaskType(req.body);

        res.status(201).json({});
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await TaskService.deleteTask(req.body);

        res.status(201).json({});
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function findAllTaskTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const taskTypes: ITaskTypeModel[] = await TaskService.findAllTaskTypes();

        res.status(201).json(taskTypes);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
