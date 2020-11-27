import { EventCard } from '../../../landing/models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export interface EventState {
	event: EntityWrapper<EventCard>;
}
