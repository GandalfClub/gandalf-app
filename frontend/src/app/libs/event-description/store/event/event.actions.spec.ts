import * as EventActions from './event.actions';
import { Event } from '../../../landing/models/event';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('EventConverterService', () => {
	let action: EventActions.LoadEvent | EventActions.LoadEventFail | EventActions.LoadEventSuccess;

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
			size: EventCardSize.S
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
});
