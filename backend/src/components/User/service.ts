import * as Joi from 'joi';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
	/**
	 * @returns {Promise < IUserModel[] >}
	 * @memberof UserService
	 */
	async findAllUsers(): Promise<IUserModel[]> {
		try {
			return await UserModel.find({});
		} catch (error) {
			throw new Error(error.message);
		}
	},

	/**
	 * @param {string} id
	 * @returns {Promise < IUserModel >}
	 * @memberof UserService
	 */
	async findUser(id: string): Promise<IUserModel> {
		try {
			const validate: Joi.ValidationResult<{
				id: string;
			}> = UserValidation.findUser({
				id,
			});

			if (validate.error) {
				throw new Error(validate.error.message);
			}

			return await UserModel.findOne({
				_id: Types.ObjectId(id),
			});
		} catch (error) {
			throw new Error(error.message);
		}
	},

	/**
	 * @param {IUserModel} user
	 * @returns {Promise < IUserModel >}
	 * @memberof UserService
	 */
	async createUser(body: IUserModel): Promise<IUserModel> {
		try {
			const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(body);

			if (validate.error) {
				throw new Error(validate.error.message);
			}

			const user: IUserModel = await UserModel.create(body);

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	/**
	 * @param {IUserModel} user
	 * @returns {Promise < IUserModel >}
	 * @memberof UserService
	 */
	async updateUser(body: IUserModel): Promise<IUserModel> {
		try {
			const validate: Joi.ValidationResult<IUserModel> = UserValidation.updateUser(body);
			if (validate.error) {
				throw new Error(validate.error.message);
			}
			const user: IUserModel = await UserModel.findByIdAndUpdate(body._id, body);
			const updatedUser: IUserModel = await UserModel.findById(user._id);

			return updatedUser;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	/**
	 * @param {string} id
	 * @returns {Promise < IUserModel >}
	 * @memberof UserService
	 */
	async removeUser(id: string): Promise<IUserModel> {
		try {
			const validate: Joi.ValidationResult<{
				id: string;
			}> = UserValidation.removeUser({
				id,
			});

			if (validate.error) {
				throw new Error(validate.error.message);
			}

			const user: IUserModel = await UserModel.findOneAndRemove({
				_id: Types.ObjectId(id),
			});

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

export default UserService;
