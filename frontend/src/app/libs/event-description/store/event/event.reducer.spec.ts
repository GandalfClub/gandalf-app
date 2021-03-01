import { EventActions, LoadEvent, LoadEventSuccess, LoadEventFail, RegForEvent, RegForEventFail, RegForEventSuccess } from './event.actions';
import { EventState } from './event-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { Event } from '../../../landing/models/event';
import { eventReducer, initialState } from './event.reducer';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';

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
			users: [],
			size: EventCardSize.S,
			eventParticipations: [],
			roles: []
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
				value: result.event.value
			});
		});
	});

	describe('RegForEvent:', () => {
		const mockParticipation: EventParticipation = new EventParticipation('uId', 'evId', []);

		it('should set status to pending', () => {
			const regForEvent: RegForEvent = new RegForEvent(mockParticipation);
			result = eventReducer(initialState, regForEvent);
			expect(result.event.status).toEqual(EntityStatus.Pending);
		});

		it('should return an error', () => {
			const regForEventFail: RegForEventFail = new RegForEventFail(eventEerror);
			result = eventReducer(initialState, regForEventFail);
			expect(result.event).toEqual({
				status: EntityStatus.Error,
				error: eventEerror,
				value: result.event.value
			});
		});

		it('should return an EventParticipation', () => {
			const loadEventSuccess: LoadEventSuccess = new LoadEventSuccess(event);
			const regForEventSuccess: RegForEventSuccess = new RegForEventSuccess(mockParticipation);
			result = eventReducer(initialState, loadEventSuccess);
			result = eventReducer(result, regForEventSuccess);
			expect(result.event.value.eventParticipations[0]).toEqual(mockParticipation);
		});
	});
});
