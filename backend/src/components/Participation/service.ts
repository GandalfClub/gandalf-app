import { IParticipationService } from './interface';
import ParticipationModel, { IParticipationModel, IParticipationModelFind } from './model';
import { Types } from 'mongoose';

const ParticipationService: IParticipationService = {
    async createParticipation(userId: Types.ObjectId, currentEventId: Types.ObjectId): Promise<IParticipationModel> {
        try {
            return await ParticipationModel.create({
                user: userId,
                eventId: currentEventId
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getAllParticipations(body: IParticipationModelFind): Promise<IParticipationModel[]> {
        try {
            return (await ParticipationModel.find({
                eventId: body.eventId
            })
                .populate('user'))
                .filter((participation: IParticipationModel) => {
                    return Boolean(participation.user);
                });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getUserParticipation(userId: Types.ObjectId, currentEventId: Types.ObjectId): Promise<IParticipationModel> {
        try {
            const participation: IParticipationModel = await ParticipationModel.findOne({
                user: userId,
                eventId: currentEventId
            });

            return participation;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default ParticipationService;
