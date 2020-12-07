import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventsFacadeService } from './events.facade';
import { EventsState } from './events-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../models/event';
import { first } from 'rxjs/operators';
import { MemoizedSelector } from '@ngrx/store';
import { selectEvents, selectEventsValue } from './events.selectors';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events FacadeService', () => {
	let mockStore: MockStore<EventsState>;
	let eventsFacadeService: EventsFacadeService;
	let event: Event;
	let events: EntityWrapper<Event[]>;
	let initialState: EventsState = { events };
	let mockEventsSelectorSelectEvents: MemoizedSelector<EventsState, EntityWrapper<Event[]>>;
	let mockEventsSelectorSelectEventValue: MemoizedSelector<EventsState, Event[]>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EventsFacadeService, provideMockStore({ initialState })],
		});
		eventsFacadeService = TestBed.inject(EventsFacadeService);
		mockStore = TestBed.inject(MockStore);
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
			size: EventCardSize.S
		};
		events = {
			status: EntityStatus.Success,
			value: [event],
		};
		initialState = { events };
	});

	describe('method events$', () => {
		it('should return events', () => {
			mockEventsSelectorSelectEvents = mockStore.overrideSelector(selectEvents, events);
			eventsFacadeService.events$.pipe(first()).subscribe((result: EntityWrapper<Event[]>) => {
				return expect(result).toEqual(events);
			});
		});
	});

	describe('method eventsValue$', () => {
		it('should return events value', () => {
			mockEventsSelectorSelectEventValue = mockStore.overrideSelector(selectEventsValue, [event]);
			eventsFacadeService.eventsValue$.pipe(first()).subscribe((result: Event[]) => {
				expect(result).toEqual(events.value);
			});
		});
	});
});
