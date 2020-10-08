import { EntityStatus } from './entity-status';

export interface EntityWrapper<T> {
	status: EntityStatus;
	value?: T;
	error?: any;
	isEventManager?: boolean;
}
