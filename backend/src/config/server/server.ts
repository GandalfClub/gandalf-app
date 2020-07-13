import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../../routes';
import appConfig from '../env/index';

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/** 
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', appConfig.port || 3000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', appConfig.secret || 'superSecret');

/**
 * @exports {express.Application}
 */
export default app;
