import { selectEventState, selectEvent, selectEventValue } from './event.selectors';
import { EventState } from './event-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../../landing/models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { async } from '@angular/core/testing';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events Selectors', () => {
	let eventValue: Event;
	let event: EntityWrapper<Event>;
	let state: EventState;

	beforeEach(async(() => {
		eventValue = {
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

		event = {
			status: EntityStatus.Success,
			value: eventValue,
		};

		state = {
			event,
		};
	}));

	describe('selectAuthState', () => {
		it('should return the feature state', () => {
			expect(selectEventState.projector(state)).toEqual(state);
		});
	});

	describe('selectEvents', () => {
		it('should return events', () => {
			expect(selectEvent.projector(state)).toEqual(event);
		});
	});

	describe('selectEventsValue', () => {
		it('should return events value', () => {
			expect(selectEventValue.projector(state)).toEqual(event.value);
		});
	});
});
