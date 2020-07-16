import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../../components/User/model';
import HttpError from '../error';
import * as http from 'http';
import appConfig from '../env';

let isCompetitionActiveStatus: boolean = appConfig.isCompetitionActive;

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
    const user: IUserModel = req.user;
    
    if (user.isAdmin) {
        return next();
    }

    next(new HttpError(403, http.STATUS_CODES[403]));
}

export function isCompetitionActive(req: Request, res: Response, next: NextFunction): void {
    if (isCompetitionActiveStatus) {
        return next();
    }

    res.status(200).json({
        status: 403,
        message: 'Соревнование больше не активно'
    });
}

export function setCompetitionStatus(isActive: boolean): boolean {
    isCompetitionActiveStatus = isActive;

    return isCompetitionActiveStatus;
}
