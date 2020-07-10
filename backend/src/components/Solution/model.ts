import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';

export interface ISolutionModel extends Document {
    posted: Date;
    code: string;
    score: number;
    comment: string;
    isPending: boolean;
    taskId: Types.ObjectId;
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    userForView?: Types.ObjectId;
}

const solutionSchema: Schema = new Schema({
    posted: Schema.Types.Date,
    code: Schema.Types.String,
    score: { type: Schema.Types.Number, default: 0 },
    isPending: { type: Schema.Types.Boolean, default: true },
    comment: Schema.Types.String,
    taskId: { type: Schema.Types.ObjectId, ref: 'tasks' },
    userId: { type: Schema.Types.ObjectId, ref: 'usermodel' },
    eventId: { type: Schema.Types.ObjectId, ref: 'events' },
}, {
    collection: 'solutions'
});

solutionSchema.index({ taskId: 1, userId: 1 });

export default mainDBConnection.model<ISolutionModel>('SolutionModel', solutionSchema); 
