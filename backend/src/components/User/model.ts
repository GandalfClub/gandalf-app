import * as bcrypt from "bcryptjs";
import mainDbConnection from "../../config/connection/main-db";
import * as crypto from "crypto";
import { Document, Schema, Types } from "mongoose";
import { NextFunction } from "express";

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
	firstName: string;
	secondName: string;
	mobilePhone: string;
	email: string;
	password: string;
	isAdmin: boolean;
	comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
	{
		firstName: {
			type: Schema.Types.String,
			default: "",
		},
		secondName: {
			type: Schema.Types.String,
			default: "",
		},
		mobilePhone: {
			type: Schema.Types.String,
			default: "",
		},
		email: {
			type: Schema.Types.String,
			unique: true,
			trim: true,
		},
		password: Schema.Types.String,
		isAdmin: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{
		collection: "usermodel",
		versionKey: false,
	}
).pre("save", async function (next: NextFunction): Promise<void> {
	const user: any = this; // tslint:disable-line

	if (!user.isModified("password")) {
		return next();
	}

	try {
		const salt: string = await bcrypt.genSalt(10);

		const hash: string = await bcrypt.hash(user.password, salt);

		user.password = hash;
		next();
	} catch (error) {
		return next(error);
	}
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	try {
		const match: boolean = await bcrypt.compare(candidatePassword, this.password);

		return match;
	} catch (error) {
		return error;
	}
};

export default mainDbConnection.model<IUserModel>("UserModel", UserSchema);
