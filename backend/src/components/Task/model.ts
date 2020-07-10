import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';
import { ITaskAnswer } from '../Solution/checker';

export interface ITaskModel extends Document {
    title: string;
    taskType: Types.ObjectId;
    description: string;
    answers: ITaskAnswer[];
    created: Date;
    codeTemplate: string;
    timeout: number;
}

export interface ITaskModelUpdate {
    _id: Types.ObjectId;
    title: string;
    taskType: Types.ObjectId;
    description: string;
    answers: ITaskAnswer[];
    created: Date;
    codeTemplate: string;
    timeout: number;
}

export interface ITaskTypeModel extends Document {
    title: string;
}

const taskSchema: Schema = new Schema({
    title: Schema.Types.String,
    taskType: Schema.Types.ObjectId,
    description: Schema.Types.String,
    codeTemplate: Schema.Types.String,
    created: Schema.Types.Date,
    answers: [{
        input: [Schema.Types.Mixed],
        output: Schema.Types.Mixed
    }],
    timeout: Schema.Types.Number
}, {
    collection: 'tasks'
});

const taskTypeSchema: Schema = new Schema({
    title: Schema.Types.String,
}, {
    collection: 'taskTypes'
});

export const TaskTypeModel: any = mainDBConnection.model<ITaskTypeModel>('TaskTypeModel', taskTypeSchema);

export default mainDBConnection.model<ITaskModel>('TaskModel', taskSchema);
