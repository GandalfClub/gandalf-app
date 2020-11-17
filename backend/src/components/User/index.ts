import UserService from './service';
import { HttpError } from '../../config/error';
import { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function findSelf(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const users: IUserModel[] = await UserService.findAllUsers();

		res.status(200).json(users);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const user: IUserModel = await UserService.findUser(req.params.id);

		res.status(200).json(user);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const user: IUserModel = await UserService.createUser(req.body);

		res.status(201).json(user);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function removeUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const user: IUserModel = await UserService.removeUser(req.params.id);

		res.status(200).json(user);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}
/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise < void >}
*/
export async function removeSelectedUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
	   const removedUsersId: string[] = await UserService.removeSelectedUsers(req.body);
	   res.status(200).json(removedUsersId);
   } catch (error) {
	   next(new HttpError(error.message.status, error.message));
   }
}
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const user: IUserModel = await UserService.updateUser(req.body);

		res.status(201).json(user);
	} catch (error) {
		next(new HttpError(error.message.status, error.message));
	}
}
