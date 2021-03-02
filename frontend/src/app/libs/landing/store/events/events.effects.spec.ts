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
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events Effects', () => {
	let mockEventsRepository: jasmine.SpyObj<EventsRepository>;
	let eventConverter: EventConverter;
	let event: Event;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;

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
					users: [],
					size: EventCardSize.S,
					eventParticipations: [],
					roles: []
				};

				mockEventsRepository.getEvents.and.returnValue(of([event]));
				actions = hot('-a-|', { a: new GetEvents() });
				expected = cold('-s-|', { s: new GetEventsSuccess([event]) });
			});

			it('should emit getEvents action', () => {
				expect(createEffects(actions).GetEvents).toBeObservable(expected);
			});
		});

		describe('when getEvents failed', () => {
			beforeEach(() => {
				error = new Error('test');
				mockEventsRepository.getEvents.and.throwError(error);
				actions = hot('-a|', { a: new GetEvents() });
				expected = cold('-(s|)', { s: new GetEventsFail(error) });
			});

			it('should emit getEventsFail action', () => {
				expect(createEffects(actions).GetEvents).toBeObservable(expected);
			});
		});
	});
});
