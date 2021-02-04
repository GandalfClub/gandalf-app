import axios from 'axios';
import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';

export async function postRecaptchaToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const secretKey = '6LcHvukZAAAAAPbloO1x1tY3fJfhVNW34LROnmdj';
        const result = await axios.post("https://www.google.com/recaptcha/api/siteverify", {}, {
            params: {
                secret: secretKey,
                response: req.body.token
            }
        });
        
        if(result.data.score < 0.5) {
            return res.status(403).json({ msg: 'Google Recaptcha error' });
        } else {
            res.status(201).json({
                isRecaptchaPassed: true
            });
        }
    } catch(e) {
        return res.status(403).json({ msg: 'Error trying to verify the request' });
    }
}

