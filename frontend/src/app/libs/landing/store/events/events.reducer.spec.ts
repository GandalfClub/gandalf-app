import { EventsAction, GetEvents, GetEventsSuccess, GetEventsFail } from 'src/app/libs/landing/store/events/events.actions';
import { eventsReducer, initialState } from 'src/app/libs/landing/store/events/events.reducer';
import { EventsState } from 'src/app/libs/landing/store/events/events-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { Event } from '../../models/event';

describe('Events Reducer', () => {
	let action: EventsAction;
	let result: EventsState;
	let eventsEerror: Error;

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

	describe('Init', () => {
		beforeEach(() => {
			action = {} as EventsAction;
			result = eventsReducer(initialState, action);
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
			eventsEerror = new Error('error');
			action = new GetEventsFail(eventsEerror) as EventsAction;
			result = eventsReducer(initialState, action);
		});

		it('should return the error', () => {
			expect(result.events).toEqual({
				status: EntityStatus.Error,
				error: eventsEerror,
			});
		});
	});
});
