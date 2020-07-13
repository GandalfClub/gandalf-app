import { IParticipationModel } from './model';
import ParticipationService from './service';
import HttpError from '../../config/error';
import { Request, Response, NextFunction } from 'express';
import * as AccessGuard from '../../config/middleware/access-guard';

export async function getAllParticipations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const participations: IParticipationModel[] = await ParticipationService.getAllParticipations(req.body);

        res.status(200).json(participations);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function setCompetitionStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const competitionStatus: boolean = AccessGuard.setCompetitionStatus(req.body.isActive);

        res.status(200).json({
            isActive: competitionStatus
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
