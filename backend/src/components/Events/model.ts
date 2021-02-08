import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';

export interface IEventsnModel extends Document {
    title: string;
    description: string;
    isActive: boolean;
    created: Date;
    startDate: Date;
    endDate: Date;
    maxScore: number;
    tasks: Types.ObjectId[];
    users: Types.ObjectId[];
    participations: Types.ObjectId[];
    isDraft: boolean;
}

export interface IEventsnModelUpdate {
    _id: Types.ObjectId;
    title: string;
    description: string;
    isActive: boolean;
}

export interface IEventTaskUpdate {
    eventId: Types.ObjectId;
    tasksId: Types.ObjectId[];
}

const eventsSchema: Schema = new Schema({
    title: {
        type: Schema.Types.String,
        default: null
    },
    description: {
        type: Schema.Types.String,
        default: null
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: null
    },
    created: {
        type: Schema.Types.Date,
        default: null
    },
    startDate: {
        type: Schema.Types.Date,
        default: null
    },
    endDate: {
        type: Schema.Types.Date,
        default: null
    },
    maxScore: {
        type: Schema.Types.Number,
        default: 0
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'TaskModel'
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'UserModel'
    },
    participations: {
        type: [Schema.Types.ObjectId],
        ref: 'ParticipationModel'
	},
	isDraft: {
        type: Schema.Types.Boolean,
        default: null
    },
}, {
    collection: 'events'
});

export default mainDBConnection.model<IEventsnModel>('EventsModel', eventsSchema);
