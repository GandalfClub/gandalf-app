import * as Joi from 'joi';
import { Types } from 'mongoose';
import { IRecaptchaService } from './interface';
import RecaptchaModel, { IRecaptchaModel } from './model';
import RecaptchaValidation from './validation';

/**
 * @export
 * @implements {IRecaptchaModelService}
 */
const RecaptchaService: IRecaptchaService = {
};

export default RecaptchaService;
