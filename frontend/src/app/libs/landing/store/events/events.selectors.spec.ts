import { selectEventsState, selectEvents, selectEventsValue } from './events.selectors';
import { EventsState } from './events-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

describe('Events Selectors', () => {
	const event: Event = {
		id: 'test',
		title: 'test',
		description: 'test',
		created: null,
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
	};

	const events: EntityWrapper<Event[]> = {
		status: EntityStatus.Success,
		value: [event],
	};

	const state: EventsState = {
		events,
	};

	describe('selectAuthState', () => {
		it('should return the feature state', () => {
			expect(selectEventsState.projector(state)).toEqual(state);
		});
	});

	describe('selectEvents', () => {
		it('should return events', () => {
			expect(selectEvents.projector(state)).toEqual(events);
		});
	});

	describe('selectEventsValue', () => {
		it('should return events value', () => {
			expect(selectEventsValue.projector(state)).toEqual(events.value);
		});
	});
});
