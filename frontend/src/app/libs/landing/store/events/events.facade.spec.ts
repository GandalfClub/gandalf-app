import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventsFacadeService } from './events.facade';
import { EventsState } from './events-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../models/event';
import { first } from 'rxjs/operators';

describe('Events FacadeService', () => {
	let mockStore: MockStore<EventsState>;
	let eventsFacadeService: EventsFacadeService;
<<<<<<< HEAD
	let event: Event;
	let events: EntityWrapper<Event[]>;
	let initialState: EventsState = { events };
=======

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

	const events: EntityWrapper<Event[]> = {
		status: EntityStatus.Success,
		value: [event],
	};
	const initialState: EventsState = { events };
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EventsFacadeService, provideMockStore({ initialState })],
		});
		eventsFacadeService = TestBed.inject(EventsFacadeService);
		mockStore = TestBed.inject(MockStore);
<<<<<<< HEAD
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
		events = {
			status: EntityStatus.Success,
			value: [event],
		};
		initialState = { events };
=======
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc
		eventsFacadeService.getEvents();
	});

	describe('method events$', () => {
		it('should return events', () => {
			eventsFacadeService.events$.pipe(first()).subscribe((result: EntityWrapper<Event[]>) => {
				return expect(result).toEqual(events);
			});
		});
	});

	describe('method eventsValue$', () => {
		it('should return events value', () => {
			eventsFacadeService.eventsValue$.pipe(first()).subscribe((result: Event[]) => {
				expect(result).toEqual(events.value);
			});
		});
	});
});
