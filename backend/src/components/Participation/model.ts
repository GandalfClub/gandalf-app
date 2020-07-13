import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';

export interface IParticipationModel extends Document {
    totalScore: number;
    place: number;
    user: Types.ObjectId[];
    eventId: Types.ObjectId;
}

export interface IParticipationModelFind {
    eventId: Types.ObjectId;
}

const participationSchema: Schema = new Schema({
    totalScore: {
        type: Schema.Types.Number,
        default: 0
    },
    place: {
        type: Schema.Types.Number,
        default: null
    },
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    eventId: { type: Schema.Types.ObjectId, ref: 'events' },
}, {
    collection: 'participation'
});

participationSchema.index({ user: 1 });

export default mainDBConnection.model < IParticipationModel > ('ParticipationModel', participationSchema);
