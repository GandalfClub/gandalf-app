import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import { checkAuthStatus } from '../components/Auth';
import appConfig from '../config/env';
import * as passportConfig from '../config/middleware/passport';
import AuthRouter from './AuthRouter';
import EventsRouter from './EventsRouter';
import HtmlTaskRouter from './HtmlTaskRouter';
import ParticipationRouter from './ParticipationRouter';
import PublicEventsRouter from './PublicEventsRouter';
import SolutionRouter from './SolutionRouter';
import TaskRouter from './TaskRouter';
import UserRouter from './UserRouter';

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
	const router: express.Router = express.Router();

	router.use(appConfig.api.userUri, passportConfig.isAuthenticated, UserRouter);

	router.use(appConfig.api.authUri, AuthRouter);

	router.use('/api/check', passportConfig.isAuthenticated, checkAuthStatus);

	router.use(appConfig.api.taskUri, passportConfig.isAuthenticated, TaskRouter);

	router.use(appConfig.api.solutionUri, passportConfig.isAuthenticated, SolutionRouter);

	router.use(appConfig.api.participationApi, passportConfig.isAuthenticated, ParticipationRouter);

	router.use(appConfig.api.eventUri, passportConfig.isAuthenticated, EventsRouter);

	router.use(appConfig.api.publicEventsUri, PublicEventsRouter);

	router.use(appConfig.api.htmlTaskUri, passportConfig.isAuthenticated, HtmlTaskRouter);

	router.use(express.static(__dirname + `\\..\\gandalf-platform`));

	/**
	 * @description No results returned mean the object is not found
	 * @constructs
	 */
	router.use((req, res, next) => {
		res.status(404).send(http.STATUS_CODES[404]);
	});

	/**
	 * @constructs all routes
	 */
	app.use(router);
}

function useSwaggerDocs(app: express.Application): void {
	let swaggerDoc: any;

	try {
		swaggerDoc = require('../../swagger.json');
	} catch (error) {
		console.log('***************************************************');
		console.log('  Seems like you doesn`t have swagger.json file');
		console.log('  Please, run: ');
		console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
		console.log('***************************************************');
	}

	if (swaggerDoc) {
		app.use('/docs', swaggerUi.serve);
		app.get('/docs', swaggerUi.setup(swaggerDoc));
	}
}
