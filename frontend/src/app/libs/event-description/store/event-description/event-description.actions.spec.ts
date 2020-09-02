import * as EventActions from './event-description.actions';

describe('EventConverterService', () => {
	let action: EventActions.LoadEvent | EventActions.LoadEventFail | EventActions.LoadEventSuccess;
	let payload: any;

	describe('LoadEvent', () => {
		beforeEach(() => {
			payload = '1';
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
		beforeEach(() => {
			payload = {
				id: 'test',
				title: 'test',
				description: 'test',
				created: null,
				startDate: null,
				startTime: null,
				endDate: null,
				endTime: null,
			};
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
		beforeEach(() => {
			payload = {
				name: 'test error',
				message: 'get events fail',
			};
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
