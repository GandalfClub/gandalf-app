import { IParticipationModel, IParticipationModelFind } from './model';
import { Types } from 'mongoose';

export interface IParticipationService {
    getUserParticipation(userId: Types.ObjectId, eventId: Types.ObjectId): Promise<IParticipationModel>;
    createParticipation(userId: Types.ObjectId, eventId: Types.ObjectId): Promise<IParticipationModel>;
    getAllParticipations(body: IParticipationModelFind): Promise<IParticipationModel[]>;
}
