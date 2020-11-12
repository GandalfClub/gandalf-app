import * as Joi from 'joi';
import { Types } from 'mongoose';
import { IUserService } from './interface';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
	/**
	 * @returns {Promise<IUserModel[]>}
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
	 * @returns {Promise<IUserModel>}
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
	 * @returns {Promise<IUserModel>}
	 * @memberof UserService
	 */
	async updateUser(body: IUserModel): Promise<IUserModel> {
		try {
			const validate: Joi.ValidationResult<IUserModel> = UserValidation.updateUser(body);
			if (validate.error) {
				throw new Error(validate.error.message);
			}
			const user: IUserModel = await UserModel.findById(body._id);
			user.firstName = body.firstName;
			user.secondName = body.secondName;
			user.mobilePhone = body.secondName;
			user.email = body.email;
			user.isAdmin = body.isAdmin;
			user.claims = body.claims;
			user.displayName = body.displayName;
			user.photoUrl = body.photoUrl;
			await UserModel.findByIdAndUpdate(body._id, body);

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	/**
	 * @param {string} id
	 * @returns {Promise<IUserModel>}
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

	/**
	 * @param {string[]} id
	 * @returns {Promise<IUserModel>}
	 * @memberof UserService
	 */
	async removeSelectedUsers(usersId: string[]): Promise<string[]> {
		const removedUsersId: string[] = [];
		try {
			for (const id of usersId) {
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
				removedUsersId.push(user._id);
			}


			return removedUsersId;
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

export default UserService;
