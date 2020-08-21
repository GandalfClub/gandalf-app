import { Document, Schema, Types } from "mongoose";
import mainDBConnection from "../../config/connection/main-db";

export interface IPublicEventsModel extends Document {
	_id: Types.ObjectId;
	title: string;
	description: string;
	isActive: boolean;
	created: Date;
	startDate: Date;
	endDate: Date;
}

const eventsSchema: Schema = new Schema(
	{
		title: {
			type: Schema.Types.String,
			default: null,
		},
		description: {
			type: Schema.Types.String,
			default: null,
		},
		isActive: {
			type: Schema.Types.Boolean,
			default: null,
		},
		created: {
			type: Schema.Types.Date,
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
	},
	{
		collection: "events",
	}
);

export default mainDBConnection.model<IPublicEventsModel>("PublicEventsModel", eventsSchema);
