import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';

export interface IHtmlTaskModel extends Document {
    title: string;
    taskType: Types.ObjectId;
    description: string;
    created: Date;
    codeTemplate: string;
}

export interface IHtmlTaskModelUpdate {
    _id: Types.ObjectId;
    title: string;
    taskType: Types.ObjectId;
    description: string;
    created: Date;
    codeTemplate: string;
}

const htmlTaskSchema: Schema = new Schema({
    title: Schema.Types.String,
    taskType: Schema.Types.String,
    description: Schema.Types.String,
    codeTemplate: Schema.Types.String,
    created: Schema.Types.Date,
}, {
    collection: 'htmlTasks'
});

export default mainDBConnection.model<IHtmlTaskModel>('HtmlTaskModel', htmlTaskSchema);
