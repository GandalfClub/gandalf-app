import * as bcrypt from 'bcryptjs';
import { NextFunction } from 'express';
import { Document, Schema } from 'mongoose';
import mainDbConnection from '../../config/connection/main-db';

/**
 * @export
 * @interface IRecaptchaModel
 * @extends {Document}
 */
export interface IRecaptchaModel extends Document {
	isRecaptchaPassed: boolean;
}

const RecaptchaSchema: Schema = new Schema(
	{
		isRecaptchaPassed: {
			type: Schema.Types.Boolean,
			default: false,
		}
	},
	{
		collection: 'recaptchamodel',
		versionKey: false,
	}
).pre('save', async function (next: NextFunction): Promise<void> {
	const recaptcha: any = this; // tslint:disable-line

});

export default mainDbConnection.model<IRecaptchaModel>('RecaptchaModel', RecaptchaSchema);
