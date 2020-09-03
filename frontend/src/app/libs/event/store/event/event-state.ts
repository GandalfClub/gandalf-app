import { Event } from '../../../landing/models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export interface EventState {
	event: EntityWrapper<Event>;
}
