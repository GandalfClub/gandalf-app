import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventFacadeService } from './event.facade';
import { EventState } from './event-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../../landing/models/event';
import { first } from 'rxjs/operators';
import { MemoizedSelector } from '@ngrx/store';
import { selectEvent, selectEventValue } from './event.selectors';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events FacadeService', () => {
	let mockStore: MockStore<EventState>;
	let eventFacadeService: EventFacadeService;
	let event: Event;
	let eventState: EntityWrapper<Event>;
	let initialState: EventState = { event: eventState };
	let mockEventSelectorSelectEvent: MemoizedSelector<EventState, EntityWrapper<Event>>;
	let mockEventSelectorSelectEventValue: MemoizedSelector<EventState, Event>;
	let id: string;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EventFacadeService, provideMockStore({ initialState })],
		});
		eventFacadeService = TestBed.inject(EventFacadeService);
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
		eventState = {
			status: EntityStatus.Success,
			value: event,
		};
		initialState = { event: eventState };
		id = '1';
		eventFacadeService.loadEvent(id);
	});

	describe('method events$', () => {
		it('should return events', () => {
			mockEventSelectorSelectEvent = mockStore.overrideSelector(selectEvent, eventState);
			eventFacadeService.event$.pipe(first()).subscribe((result: EntityWrapper<Event>) => {
				return expect(result).toEqual(eventState);
			});
		});
	});

	describe('method eventsValue$', () => {
		it('should return events value', () => {
			mockEventSelectorSelectEventValue = mockStore.overrideSelector(selectEventValue, event);
			eventFacadeService.eventValue$.pipe(first()).subscribe((result: Event) => {
				expect(result).toEqual(event);
			});
		});
	});
});
