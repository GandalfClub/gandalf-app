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
    // /**
    //  * @param {IUserModel} body
    //  * @returns {Promise <IUserModel>}
    //  * @memberof AuthService
    //  */
    // async postRecaptchaToken(body: IRecaptchaModel): Promise < IRecaptchaModel > {
    //     try {

    //         const recaptcha: IUserModel = new UserModel({
    //             email: body.email,
    //             password: body.password
    //         });

    //         const query: IUserModel = await UserModel.findOne({
    //             email: body.email
    //         });

    //         if (query) {
    //             throw new Error('This email already exists');
    //         }

    //         const saved: IUserModel = await user.save();

    //         return saved;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // },
};

export default RecaptchaService;
