import { EventActions, LoadEvent, LoadEventSuccess, LoadEventFail } from './event.actions';
import { EventState } from './event-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { Event } from '../../../landing/models/event';
import { eventReducer, initialState } from './event.reducer';

describe('Events Reducer', () => {
	let action: EventActions;
	let result: EventState;
	let eventEerror: Error;
	let id: string;

	let event: Event;

	beforeEach(() => {
		event = {
			id: 'test',
			title: 'test',
			description: 'test',
			created: null,
			startDate: null,
			startTime: null,
			endDate: null,
			endTime: null,
		};
	});

	describe('Init', () => {
		beforeEach(() => {
			action = {} as EventActions;
			result = eventReducer(initialState, action);
		});

		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('Init with default state value', () => {
		beforeEach(() => {
			action = {} as EventActions;
			result = eventReducer(undefined, action);
		});

		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('LoadEvent', () => {
		beforeEach(() => {
			id = '1';
			action = new LoadEvent(id) as EventActions;
			result = eventReducer(initialState, action);
		});

		it('should return the event.status - Pending', () => {
			expect(result.event.status).toBe(EntityStatus.Pending);
		});
	});

	describe('LoadEventSuccess', () => {
		beforeEach(() => {
			action = new LoadEventSuccess(event) as EventActions;
			result = eventReducer(initialState, action);
		});

		it('should return the event', () => {
			expect(result.event).toEqual({
				status: EntityStatus.Success,
				value: event,
				error: null,
			});
		});
	});

	describe('LoadEventFail', () => {
		beforeEach(() => {
			eventEerror = new Error('error');
			action = new LoadEventFail(eventEerror) as EventActions;
			result = eventReducer(initialState, action);
		});

		it('should return the error', () => {
			expect(result.event).toEqual({
				status: EntityStatus.Error,
				error: eventEerror,
			});
		});
	});
});
