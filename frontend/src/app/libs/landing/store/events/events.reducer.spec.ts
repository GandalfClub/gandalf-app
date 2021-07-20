import { EventsAction, GetEvents, GetEventsSuccess, GetEventsFail } from 'src/app/libs/landing/store/events/events.actions';
import { eventsReducer, initialState } from 'src/app/libs/landing/store/events/events.reducer';
import { EventsState } from 'src/app/libs/landing/store/events/events-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { Event } from '../../models/event';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events Reducer', () => {
	let action: EventsAction;
	let result: EventsState;
	let eventsError: Error;

	let event: Event;

	beforeEach(() => {
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
			users: [],
			size: EventCardSize.S,
			eventParticipations: [],
			roles: [],
			tasks: []
		};
	});

	describe('Init', () => {
		beforeEach(() => {
			action = {} as EventsAction;
			result = eventsReducer(initialState, action);
		});

		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('Init with default state value', () => {
		beforeEach(() => {
			action = {} as EventsAction;
			result = eventsReducer(undefined, action);
		});

		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('GetEvents', () => {
		beforeEach(() => {
			action = new GetEvents() as EventsAction;
			result = eventsReducer(initialState, action);
		});

		it('should return the events.status - Pending', () => {
			expect(result.events.status).toBe(EntityStatus.Pending);
		});
	});

	describe('GetEventsSuccess', () => {
		beforeEach(() => {
			action = new GetEventsSuccess([event]) as EventsAction;
			result = eventsReducer(initialState, action);
		});

		it('should return the events', () => {
			expect(result.events).toEqual({
				status: EntityStatus.Success,
				value: [event],
				error: null,
			});
		});
	});

	describe('GetEventsFail', () => {
		beforeEach(() => {
			eventsError = new Error('error');
			action = new GetEventsFail(eventsError) as EventsAction;
			result = eventsReducer(initialState, action);
		});

		it('should return the error', () => {
			expect(result.events).toEqual({
				status: EntityStatus.Error,
				error: eventsError,
			});
		});
	});
});
