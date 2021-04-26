import * as EventActions from './event.actions';
import { Event } from '../../../landing/models/event';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';

describe('Event actions', () => {
	let action: EventActions.LoadEvent | EventActions.LoadEventFail | EventActions.LoadEventSuccess;
	let mockParticipation: EventParticipation;
	let error: Error;

	describe('LoadEvent', () => {
		const payload: string = '1';
		beforeEach(() => {
			action = new EventActions.LoadEvent(payload);
		});
		it('should create LoadEvent action', () => {
			expect({ ...action }).toEqual({
				type: EventActions.EventActionTypes.LoadEvent,
				payload,
			});
		});
	});

	describe('LoadEventSuccess', () => {
		const payload: Event = {
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
			roles: [],
			tasks: []
		};
		beforeEach(() => {
			action = new EventActions.LoadEventSuccess(payload);
		});

		it('should create LoadEventSuccess action', () => {
			expect({ ...action }).toEqual({
				type: EventActions.EventActionTypes.LoadEventSuccess,
				payload,
			});
		});
	});

	describe('LoadEventFail', () => {
		const payload: Error = {
			name: 'test error',
			message: 'get events fail',
		};
		beforeEach(() => {
			action = new EventActions.LoadEventFail(payload);
		});

		it('should create LoadEventFail action', () => {
			expect({ ...action }).toEqual({
				type: EventActions.EventActionTypes.LoadEventFail,
				payload,
			});
		});
	});

	describe('LoadEventFail', () => {
		const payload: Error = {
			name: 'test error',
			message: 'get events fail',
		};
		beforeEach(() => {
			action = new EventActions.LoadEventFail(payload);
		});

		it('should create LoadEventFail action', () => {
			expect({ ...action }).toEqual({
				type: EventActions.EventActionTypes.LoadEventFail,
				payload,
			});
		});
	});

	describe('RegForEvent:', () => {
		beforeEach(() => {
			mockParticipation = new EventParticipation('uId', 'evId');
			error = new Error('test');
		});

		it('should create RegForEvent action', () => {
			const regForEvent: EventActions.RegForEvent = new EventActions.RegForEvent(mockParticipation);

			expect({...regForEvent}).toEqual({
				type: EventActions.EventActionTypes.RegForEvent,
				payload: mockParticipation,
			});
		});

		it('should create RegForEventFail action', () => {
			const regForEventFail: EventActions.RegForEventFail = new EventActions.RegForEventFail(error);

			expect({...regForEventFail}).toEqual({
				type: EventActions.EventActionTypes.RegForEventFail,
				payload: error,
			});
		});

		it('should create RegForEventSuccess action', () => {
			const regForEventSuccess: EventActions.RegForEventSuccess = new EventActions.RegForEventSuccess(mockParticipation);

			expect({...regForEventSuccess}).toEqual({
				type: EventActions.EventActionTypes.RegForEventSuccess,
				payload: mockParticipation,
			});
		});
	});
});
