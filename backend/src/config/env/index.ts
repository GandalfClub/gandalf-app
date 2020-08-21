import * as dotenv from 'dotenv';

interface IEnvConfig {
	NODE_ENV?: string;
	PORT?: string;
	AUTH_API?: string;
	USER_API?: string;
	TASK_API?: string;
	SOLUTION_API?: string;
	PARTICIPATION_API?: string;
	EVENT_API?: string;
	PUBLIC_EVENTS_API?: string;
	HTML_TASK_API?: string;
	MONGODB_URI?: string;
	IS_COMPETITION_ACTIVE?: string;
	MAX_OPENED_PROCESSES_ON_SOLUTION_CHECK?: string;
	MAX_PENDING_SOLUTIONS_QUEUE_LENGTH?: string;
	SECRET?: string;
}

interface IAppConfig {
	port: string | number;
	database: {
		uri: string;
	};
	secret: string;
	api: {
		authUri: string;
		userUri: string;
		taskUri: string;
		solutionUri: string;
		participationApi: string;
		eventUri: string;
		publicEventsUri: string;
		htmlTaskUri: string;
	};
	maxOpenedProcessesOnSolutionCheck: number;
	maxPendingSolutionsQueueLength: number;
	environment: string;
	isCompetitionActive: boolean;
}

dotenv.config();

const envConf: IEnvConfig = process.env;

const NODE_ENV: string = envConf.NODE_ENV || 'development';

let fromConfMaxOpenedProcessesOnSolutionCheck: number = Number(envConf.MAX_OPENED_PROCESSES_ON_SOLUTION_CHECK);

if (isNaN(fromConfMaxOpenedProcessesOnSolutionCheck) || fromConfMaxOpenedProcessesOnSolutionCheck < 0) {
	fromConfMaxOpenedProcessesOnSolutionCheck = 4;
}

let fromConfMaxPendingSolutionsQueueLength: number = Number(envConf.MAX_PENDING_SOLUTIONS_QUEUE_LENGTH);

if (isNaN(fromConfMaxPendingSolutionsQueueLength) || fromConfMaxPendingSolutionsQueueLength < 0) {
	fromConfMaxPendingSolutionsQueueLength = 50;
}

const development: IAppConfig = {
	port: envConf.PORT || 3000,
	database: {
		uri: envConf.MONGODB_URI || 'mongodb://localhost:27017/',
	},
	secret: envConf.SECRET || '@QEGTUI',
	api: {
		authUri: envConf.AUTH_API || '/api/auth',
		userUri: envConf.USER_API || '/api/users',
		taskUri: envConf.TASK_API || '/api/tasks',
		solutionUri: envConf.SOLUTION_API || '/api/solutions',
		participationApi: envConf.PARTICIPATION_API || '/api/participations',
		eventUri: envConf.EVENT_API || '/api/events',
		publicEventsUri: envConf.PUBLIC_EVENTS_API || '/api/publicevents',
		htmlTaskUri: envConf.HTML_TASK_API || '/api/html-tasks',
	},
	maxOpenedProcessesOnSolutionCheck: fromConfMaxOpenedProcessesOnSolutionCheck,
	maxPendingSolutionsQueueLength: fromConfMaxPendingSolutionsQueueLength,
	environment: NODE_ENV,
	isCompetitionActive: Boolean(envConf.IS_COMPETITION_ACTIVE) || false,
};

const production: IAppConfig = {
	port: envConf.PORT || 3000,
	database: {
		uri: envConf.MONGODB_URI || 'mongodb://production_uri/',
	},
	secret: envConf.SECRET || '@QEGTUI',
	api: {
		authUri: envConf.AUTH_API || '/api/auth',
		userUri: envConf.USER_API || '/api/users',
		taskUri: envConf.TASK_API || '/api/tasks',
		solutionUri: envConf.SOLUTION_API || '/api/solutions',
		participationApi: envConf.PARTICIPATION_API || '/api/participations',
		eventUri: envConf.EVENT_API || '/api/events',
		publicEventsUri: envConf.PUBLIC_EVENTS_API || '/api/publicevents',
		htmlTaskUri: envConf.HTML_TASK_API || '/api/html-tasks',
	},
	maxOpenedProcessesOnSolutionCheck: fromConfMaxOpenedProcessesOnSolutionCheck || 4,
	maxPendingSolutionsQueueLength: fromConfMaxPendingSolutionsQueueLength || 50,
	environment: NODE_ENV,
	isCompetitionActive: Boolean(envConf.IS_COMPETITION_ACTIVE) || false,
};

const test: IAppConfig = {
	port: envConf.PORT || 3000,
	database: {
		uri: envConf.MONGODB_URI || 'mongodb://localhost:27017',
	},
	secret: envConf.SECRET || '@QEGTUI',
	api: {
		authUri: envConf.AUTH_API || '/api/auth',
		userUri: envConf.USER_API || '/api/users',
		taskUri: envConf.TASK_API || '/api/tasks',
		solutionUri: envConf.SOLUTION_API || '/api/solutions',
		participationApi: envConf.PARTICIPATION_API || '/api/participations',
		eventUri: envConf.EVENT_API || '/api/events',
		publicEventsUri: envConf.PUBLIC_EVENTS_API || '/api/publicevents',
		htmlTaskUri: envConf.HTML_TASK_API || '/api/html-tasks',
	},
	maxOpenedProcessesOnSolutionCheck: fromConfMaxOpenedProcessesOnSolutionCheck || 4,
	maxPendingSolutionsQueueLength: fromConfMaxPendingSolutionsQueueLength || 50,
	environment: NODE_ENV,
	isCompetitionActive: Boolean(envConf.IS_COMPETITION_ACTIVE) || false,
};

const config: {
	[name: string]: IAppConfig;
} = {
	test,
	development,
	production,
};

console.dir(config[NODE_ENV]);

export default config[NODE_ENV];
