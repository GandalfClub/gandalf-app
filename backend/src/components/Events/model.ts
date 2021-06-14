import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';

export enum EventUserRoles {
    Admin = 'admin',
    HR = 'hr',
    EventManager = 'event manager',
    Participator = 'participator',
}
export interface IEventParticipationModel extends Document {
    created: Date;
    userId: string;
    eventId: string;
    roles: EventUserRoles[];
    approved: boolean;
}

export interface IEventsnModel extends Document {
    title: string;
    description: string;
    isActive: boolean;
    created: Date;
    startDate: Date;
    endDate: Date;
    maxScore: number;
    tasks: Types.ObjectId[];
    users?: Types.ObjectId[];
    participations?: Types.ObjectId[];
    eventParticipations?: [IEventParticipationModel];
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

export const eventParticipationSubSchema: Schema = new Schema({
    created: Schema.Types.Date,
    userId: {
        type: Schema.Types.String,
        ref: 'TaskModel',
    },
    eventId: {
        type: Schema.Types.String,
        ref: 'EventsModel'
    },
    roles: [String],
    approved: Schema.Types.Boolean
});

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
    eventParticipations: {
        type: [eventParticipationSubSchema],
        default: []
    },
    isDraft: {
        type: Schema.Types.Boolean,
        default: null
    },
}, {
    collection: 'events'
});

export default mainDBConnection.model<IEventsnModel>('EventsModel', eventsSchema);
