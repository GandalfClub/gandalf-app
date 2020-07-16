import { Connection, disconnect } from 'mongoose';

export interface IConnectionOptions {
    autoReconnect: boolean;
    reconnectTries: number;
    reconnectInterval: number;
    loggerLevel ? : string;
    useNewUrlParser ? : boolean;
}

export function setDefaultHandlers(db: Connection): void {
    db.on('connecting', () => {
        console.log('\x1b[32m', 'MongoDB :: connecting');
    });
    
    db.on('error', (error) => {
        console.log('\x1b[31m', `MongoDB :: connection ${error}`);
        disconnect();
    });
    
    db.on('connected', () => {
        console.log('\x1b[32m', 'MongoDB :: connected');
    });
    
    db.once('open', () => {
        console.log('\x1b[32m', 'MongoDB :: connection opened');
    });
    
    db.on('reconnected', () => {
        console.log('\x1b[33m', 'MongoDB :: reconnected');
    });
    
    db.on('reconnectFailed', () => {
        console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
    });
    
    db.on('disconnected', () => {
        console.log('\x1b[31m', 'MongoDB :: disconnected');
    });
    
    db.on('fullsetup', () => {
        console.log('\x1b[33m', 'MongoDB :: reconnecting... %d');
    });
}
