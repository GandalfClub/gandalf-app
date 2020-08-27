import * as EventsActions from './events.actions';

describe('EventConverterService', () => {
	let action: EventsActions.GetEventsSuccess | EventsActions.GetEventsFail | EventsActions.GetEvents;
	let payload: any;

	describe('GetEvents', () => {
		beforeEach(() => {
			action = new EventsActions.GetEvents();
		});
		it('should create GetEvents action', () => {
			expect({ ...action }).toEqual({
				type: EventsActions.ActionType.GetEvents,
			});
		});
	});

	describe('GetEventsSuccess', () => {
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
<<<<<<< HEAD
			action = new EventsActions.GetEventsSuccess([payload]);
		});

		it('should create GetEventsSuccess action', () => {
=======
		});
		it('should create GetEventsSuccess action', () => {
			action = new EventsActions.GetEventsSuccess([payload]);
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc
			expect({ ...action }).toEqual({
				type: EventsActions.ActionType.GetEventsSuccess,
				payload: [payload],
			});
		});
	});

	describe('GetEventsFail', () => {
		beforeEach(() => {
			payload = {
				name: 'test error',
				message: 'get events fail',
			};
			action = new EventsActions.GetEventsFail(payload);
		});

		it('should create GetEventsFail action', () => {
			expect({ ...action }).toEqual({
				type: EventsActions.ActionType.GetEventsFail,
				payload,
			});
		});
	});
});
