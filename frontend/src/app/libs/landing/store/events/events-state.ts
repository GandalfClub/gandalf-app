import { Event } from '../../models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export interface EventsState {
	events: EntityWrapper<Event[]>;
}
