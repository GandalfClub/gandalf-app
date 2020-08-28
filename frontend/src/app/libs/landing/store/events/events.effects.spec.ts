import { TestBed, async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { EventsEffects } from './events.effects';
import { EventsRepository } from '../../services/events-repository.service';
import { Event } from '../../models/event';
import { GetEvents, GetEventsSuccess, GetEventsFail } from './events.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../../auth/helpers/createSpy';
import { EventConverter } from '../../services/event-converter.service';
import { destroyPlatform } from '@angular/core';

describe('Events Effects', () => {
	let mockEventsRepository: jasmine.SpyObj<EventsRepository>;
	let eventConverter: EventConverter;
	let event: Event;
	let error: Error;

	function createEffects(source: Observable<Action>): EventsEffects {
		return new EventsEffects(new Actions(source), mockEventsRepository, eventConverter);
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: EventsRepository,
					useValue: createSpy(EventsRepository.prototype, {
						getEvents: jasmine.createSpy().and.returnValue(of([event])),
					}),
				},
			],
		});
		mockEventsRepository = TestBed.inject(EventsRepository) as jasmine.SpyObj<EventsRepository>;
		eventConverter = TestBed.inject(EventConverter);
	}));

	afterAll(() => destroyPlatform());

	describe('getEvents', () => {
		describe('when getEvents successful', () => {
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
				} as any;
			});

			it('should emit getEvents action', () => {
				mockEventsRepository.getEvents.and.returnValue(of([event]));
				const actions: Observable<Action> = hot('-a-|', { a: new GetEvents() });
				const expected: Observable<Action> = cold('-s-|', { s: new GetEventsSuccess([event]) });
				expect(createEffects(actions).GetEvents).toBeObservable(expected);
			});
		});

		describe('when getEvents failed', () => {
			beforeEach(() => {
				error = new Error('test') as any;
			});

			it('should emit getEventsFail action', () => {
				mockEventsRepository.getEvents.and.throwError(error);
				const actions: Observable<Action> = hot('-a|', { a: new GetEvents() });
				const expected: Observable<Action> = cold('-(s|)', { s: new GetEventsFail(error) });
				expect(createEffects(actions).GetEvents).toBeObservable(expected);
			});
		});
	});
});
