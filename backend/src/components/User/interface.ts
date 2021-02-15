import { IUserModel } from './model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
	/**
	 * @returns {Promise<IUserModel[]>}
	 * @memberof IUserService
	 */
	findAllUsers(): Promise<IUserModel[]>;

	/**
	 * @param {string} code
	 * @returns {Promise<IUserModel>}
	 * @memberof IUserService
	 */
	findUser(id: string): Promise<IUserModel>;

	/**
	 * @param {IUserModel} IUserModel
	 * @returns {Promise<IUserModel>}
	 * @memberof IUserService
	 */
	createUser(IUserModel: IUserModel): Promise<IUserModel>;

	/**
	 * @param {IUserModel} IUserModel
	 * @returns {Promise<IUserModel>}
	 * @memberof IUserService
	 */
	updateUser(IUserModel: IUserModel): Promise<IUserModel>;

	/**
	 * @param {string} id
	 * @returns {Promise<IUserModel>}
	 * @memberof IUserService
	 */
	removeUser(id: string): Promise<IUserModel>;

	/**
	 * @param {string[]} id
	 * @returns {Promise<string[]>}
	 * @memberof UserService
	 */
	removeSelectedUsers(ids: string[]): Promise<string[]>;
}
