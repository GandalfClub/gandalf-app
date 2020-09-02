import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventFacadeService } from './event-description.facade';
import { EventDescriptionState } from './event-description-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';
import { Event } from '../../../landing/models/event';
import { first } from 'rxjs/operators';
import { MemoizedSelector } from '@ngrx/store';
import { selectEvent, selectEventValue } from './event-description.selectors';

describe('Events FacadeService', () => {
	let mockStore: MockStore<EventDescriptionState>;
	let eventFacadeService: EventFacadeService;
	let event: Event;
	let eventState: EntityWrapper<Event>;
	let initialState: EventDescriptionState = { event: eventState };
	let mockEventSelectorSelectEvent: MemoizedSelector<EventDescriptionState, EntityWrapper<Event>>;
	let mockEventSelectorSelectEventValue: MemoizedSelector<EventDescriptionState, Event>;
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
		};
		eventState = {
			status: EntityStatus.Success,
			value: event,
		};
		initialState = { event: eventState };
		id = '1';
		eventFacadeService.getEvent(id);
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
