import { Response, Request, NextFunction } from 'express';
import SolutionService from './service';
import HttpError from '../../config/error';
import { ISolutionModel } from './model';

export async function postSolution(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const solution: ISolutionModel = await SolutionService.postSolution(req.user._id, req.body);

        res.status(200).json(solution);
    } catch (error) {
        // не менять проверку
        if (error.message === 'Сервер перегружен. Повторите запрос позже.') {
            return res.status(200).json({
                status: 403,
                message: error.message
            });
        }

        next(new HttpError(error.message.status, error.message));
    }
}

export async function postHtmlSolutions(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const solution: ISolutionModel = await SolutionService.postHtmlSolution(req.user._id, req.body);

        res.status(200).json(solution);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function getSomeSolutions(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const solutions: ISolutionModel[] = await SolutionService.getSomeSolutions(req.body.solutionIds);

        res.json(solutions);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function getAllUserSolutions(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const solutions: ISolutionModel[] = await SolutionService.getAllUserSolutions(req.user._id, req.body);

        res.json(solutions);
    } catch (err) {
        next(new HttpError(err.message.status, err.message));
    }
}

export async function getSelectedUserSolutions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const solutions: ISolutionModel[] = await SolutionService.getAllUserSolutions(req.body.userId, req.body);

        res.json(solutions);
    } catch (err) {
        next(new HttpError(err.message.status, err.message));
    }
}
