import { Event } from '../../../landing/models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export interface EventDescriptionState {
	event: EntityWrapper<Event>;
}
