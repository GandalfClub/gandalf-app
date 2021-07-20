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

export interface IEventsModel extends Document {
    generalInfo: IGeneralEventInfo;
    isActive?: boolean;
    created?: Date;
    maxScore?: number;
    tasks?: Types.ObjectId[];
    users?: Types.ObjectId[];
    participations?: Types.ObjectId[];
    eventParticipations?: [IEventParticipationModel];
}

export interface IGeneralEventInfo {
    title: string;
    shortSummary?: string;
    description: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    isPrivate: boolean;
    isContinuous: boolean;
    isDraft: boolean;
}

export interface IEventsModelUpdate {
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

const generalInfoEventSchema: Schema = new Schema({
    title: {
        type: Schema.Types.String,
        default: null,
    },
    shortSummary: {
        type: Schema.Types.String,
        default: null,
    },
    description: {
        type: Schema.Types.String,
        default: null,
    },
    startDate: {
        type: Schema.Types.Date,
        default: null,
    },
    endDate: {
        type: Schema.Types.Date,
        default: null,
    },
    startTime: {
        type: Schema.Types.String,
        default: null,
    },
    endTime: {
        type: Schema.Types.String,
        default: null,
    },
    isPrivate: {
        type: Schema.Types.Boolean,
        default: false,
    },
    isContinuous: {
        type: Schema.Types.Boolean,
        default: false,
    },
    isDraft: {
        type: Schema.Types.Boolean,
        default: true,
    },
});

const eventsSchema: Schema = new Schema({
    isActive: {
        type: Schema.Types.Boolean,
        default: null
    },
    created: {
        type: Schema.Types.Date,
        default: null
    },
    generalInfo: {
        type: generalInfoEventSchema,
        default: {},
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
}, {
    collection: 'events'
});

export default mainDBConnection.model<IEventsModel>('EventsModel', eventsSchema);
