import { selectEventsState, selectEvents, selectEventsValue, selectEventsBelongedToUser } from './events.selectors';
import { EventsState } from './events-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../models/event';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { async } from '@angular/core/testing';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { EventParticipation } from '../../models/event-participation.class';
import { User } from 'src/app/libs/auth/models/user';

describe('Events Selectors', () => {
	let event: Event;
	let events: EntityWrapper<Event[]>;
	let state: EventsState;
	let user: User;
	let eventParticipation: EventParticipation;

	beforeEach(async(() => {
		event = {
			id: 'test',
			generalInfo: {
				title: 'test',
				description: 'test',
				startDate: null,
				startTime: null,
				endDate: null,
				endTime: null,
				isContinuous: true,
				isDraft: true,
				isPrivate: true,
			},
			created: null,
			users: [user],
			size: EventCardSize.S,
			eventParticipations: [eventParticipation],
			roles: [],
			tasks: []
		};

		events = {
			status: EntityStatus.Success,
			value: [event],
			error: null,
		};

		eventParticipation = {
			userId: 'userId'
		} as EventParticipation;

		user = {
			id: 'userId'
		} as User;

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

	describe('selectEventsBelongedToUser', () => {
		it('should return events belonged to user', () => {
			const userEvents: Event[] = events.value.filter((ev: Event) => {
				const participation: EventParticipation = ev
					.eventParticipations
					.find((evParticipation: EventParticipation) => evParticipation?.userId === user.id);
				return Boolean(participation);
			});
			const result: Event[] = selectEventsBelongedToUser.projector(state.events.value, user);
			expect(JSON.stringify(result)).toEqual(JSON.stringify(userEvents));
		});
	});
});
