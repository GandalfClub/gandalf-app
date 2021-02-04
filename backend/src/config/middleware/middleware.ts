import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as session from 'express-session';
import config from '../env/index';
import * as mongo from 'connect-mongo';
import { HttpError } from '../error/index';
import { sendHttpErrorModule } from '../error/sendHttpError';

const MongoStore: mongo.MongoStoreFactory = mongo(session);

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
    // express middleware
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json());

    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());

    /**
     * @swagger
     * components:
     *  securitySchemes:
     *    cookieAuth:
     *      type: apiKey
     *      in: cookie
     *      name: sid
     */
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: config.secret,
        name: 'api.sid',
        store: new MongoStore({
            url: config.database.uri,
            autoReconnect: true
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    // custom errors
    app.use(sendHttpErrorModule);

    // cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials'
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
}

interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message ? : string) => void;
}

/**
 * @export
 * @param {express.Application} app
 */
export function initErrorHandler(app: express.Application): void {
    app.use((error: Error, req: express.Request, res: CustomResponse, next: express.NextFunction) => {
        if (typeof error === 'number') {
            error = new HttpError(error); // next(404)
        }

        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else {
            if (app.get('env') === 'development') {
               // error = new HttpError(500, error.message);
                //res.sendHttpError(error);
            } else {
                error = new HttpError(500);
                res.sendHttpError(error, error.message);
            }
        }

        console.error(error);
    });
}
