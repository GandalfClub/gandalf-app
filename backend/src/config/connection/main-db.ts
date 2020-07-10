import config from '../env/index';
import * as mongoose from 'mongoose';
import { IConnectionOptions, setDefaultHandlers } from './index';

const connectOptions: mongoose.ConnectionOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

const MONGO_URI: string = config.database.uri;

const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

setDefaultHandlers(db);

export default db;
