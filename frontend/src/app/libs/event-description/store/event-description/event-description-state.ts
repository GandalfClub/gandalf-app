import { Event } from '../../../landing/models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EventDescription } from '../../models/event-description';

export interface EventDescriptionState {
	event: EntityWrapper<EventDescription>;
}
