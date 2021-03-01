import { selectEventsState, selectEvents, selectEventsValue } from './events.selectors';
import { EventsState } from './events-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { async } from '@angular/core/testing';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events Selectors', () => {
	let event: Event;
	let events: EntityWrapper<Event[]>;
	let state: EventsState;

	beforeEach(async(() => {
		event = {
			id: 'test',
			title: 'test',
			description: 'test',
			created: null,
			startDate: null,
			startTime: null,
			endDate: null,
			endTime: null,
			users: [],
			size: EventCardSize.S,
			eventParticipations: [],
			roles: []
		};

		events = {
			status: EntityStatus.Success,
			value: [event],
		};

		state = {
			events,
		};
	}));

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
