import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
	/**
	 * Creates an instance of UserValidation.
	 * @memberof UserValidation
	 */
	constructor() {
		super();
	}

	/**
	 * @param {IUserModel} params
	 * @returns {Joi.ValidationResult<IUserModel >}
	 * @memberof UserValidation
	 */
	createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
		const schema: Joi.Schema = Joi.object().keys({
			email: Joi.string()
				.email({
					minDomainAtoms: 2,
				})
				.required(),
		});

		return Joi.validate(params, schema);
	}

	/**
	 * @param {{ id: string }} body
	 * @returns {Joi.ValidationResult<{ id: string }>}
	 * @memberof UserValidation
	 */
	findUser(body: {
		id: string;
	}): Joi.ValidationResult<{
		id: string;
	}> {
		const schema: Joi.Schema = Joi.object().keys({
			id: this.customJoi.objectId().required(),
		});

		return Joi.validate(body, schema);
	}

	/**
	 * @param {{ id: string }} body
	 * @returns {Joi.ValidationResult<{ id: string }>}
	 * @memberof UserValidation
	 */
	removeUser(body: {
		id: string;
	}): Joi.ValidationResult<{
		id: string;
	}> {
		const schema: Joi.Schema = Joi.object().keys({
			id: this.customJoi.objectId().required(),
		});

		return Joi.validate(body, schema);
	}

	/**
	 * @param {IUserModel} params
	 * @returns {Joi.ValidationResult<IUserModel >}
	 * @memberof UserValidation
	 */
	updateUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
		const schema: Joi.Schema = Joi.object().keys({
			_id: Joi.string().required(),
			firstName: Joi.string().required(),
			secondName: Joi.string().required(),
			mobilePhone: Joi.string().required(),
		});

		return Joi.validate(params, schema);
	}
}

export default new UserValidation();
