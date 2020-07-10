import * as passport from 'passport';
import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';
import appConfig from '../../config/env';

interface IDefaultAuthResponseBody {
    user: IUserModel | null;
    logged: boolean;
    isCompetitionActive: boolean;
}

function getDefaultResponseBody(): IDefaultAuthResponseBody {
    const body: IDefaultAuthResponseBody = {
        user: null,
        logged: false,
        isCompetitionActive: appConfig.isCompetitionActive
    };

    return body;
}

function passportRequestLogin(req: Request, res: Response, next: NextFunction, user: IUserModel, resMessage: string): void {
    return req.logIn(user, (err) => {
        if (err) return next(new HttpError(err));

        const defRespBody: IDefaultAuthResponseBody = getDefaultResponseBody();

        res.json({
            ...defRespBody,
            user: req.user,
            status: 200,
            logged: true,
            message: resMessage
        });
    });
}

export async function signin(req: Request, res: Response, next: NextFunction): Promise < void > {
    passport.authenticate('local', (err: Error, user: IUserModel) => {
        if (err) {
            return next(new HttpError(400, err.message));
        }

        if (!user) {
            const defRespBody: IDefaultAuthResponseBody = getDefaultResponseBody();

            return res.json({
                ...defRespBody,
                status: 401,
                logged: false,
                message: 'Invalid credentials!'
            });
        }

        passportRequestLogin(req, res, next, user, 'Sign in successfull');
    })(req, res, next);
}

export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await AuthService.createUser(req.body);
        
        passportRequestLogin(req, res, next, user, 'Sign up successfull');
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        const defRespBody: IDefaultAuthResponseBody = getDefaultResponseBody();

        res.json({
            ...defRespBody,
            status: 400,
            message: error.message
        });
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    passport.authenticate('local', (err: Error, user: IUserModel) => {
        if (err || !user) {
            return signup(req, res, next);
        } else {
            passportRequestLogin(req, res, next, user, 'Sign in successfull');
        }
    })(req, res, next);
}

export async function signupAdmin(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const admin: IUserModel = await AuthService.createAdmin(req.body);

        passportRequestLogin(req, res, next, admin, 'Sign up successfull');
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        const defRespBody: IDefaultAuthResponseBody = getDefaultResponseBody();

        res.json({
            ...defRespBody,
            status: 400,
            message: error.message
        });
    }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise < void > {
    const defRespBody: IDefaultAuthResponseBody = getDefaultResponseBody();

    if (!req.user) {
        res.json({
            ...defRespBody,
            status: 401,
            logged: false,
            message: 'You are not authorized to app. Can\'t logout'
        });
    }

    if (req.user) {
        req.session.destroy((err) => {
            res.json({
                ...defRespBody,
                status: 200,
                logged: false,
                message: 'Successfuly logged out!'
            });
        });
    }

}

// используется на /api/check, а не в компоненте
export async function checkAuthStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const defRespBody: IDefaultAuthResponseBody = getDefaultResponseBody();

    res.json({
        ...defRespBody,
        user: req.user,
        logged: true
    });
}
