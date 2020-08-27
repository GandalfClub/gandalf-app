<<<<<<< HEAD
import { TestBed, async } from '@angular/core/testing';
=======
import { TestBed, ComponentFixture } from '@angular/core/testing';
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc
import { Observable, of } from 'rxjs';
import { EventsEffects } from './events.effects';
import { EventsRepository } from '../../services/events-repository.service';
import { Event } from '../../models/event';
import { GetEvents, GetEventsSuccess, GetEventsFail } from './events.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../helpers/createSpy';
import { EventConverter } from '../../services/event-converter.service';

describe('Events Effects', () => {
	let mockEventsRepository: jasmine.SpyObj<EventsRepository>;
<<<<<<< HEAD
	let eventConverter: EventConverter;
	let event: Event;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;
=======
	let eventConverter: jasmine.SpyObj<EventConverter>;
	let actions: Observable<Action>;
	let expected: Observable<Action>;
	// let error: Error;
	let event: Event;
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc

	function createEffects(source: Observable<Action>): EventsEffects {
		return new EventsEffects(new Actions(source), mockEventsRepository, eventConverter);
	}

<<<<<<< HEAD
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: EventsRepository, useValue: createSpy(EventsRepository.prototype) }],
		});
		mockEventsRepository = TestBed.inject(EventsRepository) as jasmine.SpyObj<EventsRepository>;
		eventConverter = TestBed.inject(EventConverter);
	}));
=======
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: EventsRepository, useValue: createSpy(EventsRepository.prototype) },
				// { provide: EventConverter, useValue: createSpy(EventConverter.prototype) },
			],
		});
		mockEventsRepository = TestBed.inject(EventsRepository) as jasmine.SpyObj<EventsRepository>;
		eventConverter = TestBed.inject(EventConverter) as jasmine.SpyObj<EventConverter>;
	});
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc

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
				};
<<<<<<< HEAD

				mockEventsRepository.getEvents.and.returnValue(of([event]));
				actions = hot('-----a-----|', { a: new GetEvents() });
				expected = cold('-----s-----|', { s: new GetEventsSuccess([event]) });
=======
				mockEventsRepository.getEvents.and.returnValue(of([event]));
				actions = hot('-a-|', { a: new GetEvents() });
				expected = cold('-s-|', { s: new GetEventsSuccess([event]) });
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc
			});

			it('should emit getEvents action', () => {
				expect(createEffects(actions).GetEvents).toBeObservable(expected);
			});
		});

<<<<<<< HEAD
		describe('when getEvents failed', () => {
			beforeEach(() => {
				error = new Error('test');
				mockEventsRepository.getEvents.and.throwError(error);
				actions = hot('-----a-----|', { a: new GetEvents() });
				expected = cold('-----(s|)', { s: new GetEventsFail(error) });
			});

			it('should emit getEventsFail action', () => {
				expect(createEffects(actions).GetEvents).toBeObservable(expected);
			});
		});
=======
		// 	describe('when getEvents failed', () => {
		// 		beforeEach(() => {
		// 			error = new Error('test');
		// 			mockEventsRepository.getEvents.and.throwError(error);
		// 			actions = hot('--a|', { a: new GetEvents() });
		// 			expected = cold('--(f|)', { f: new GetEventsFail(error) });
		// 		});

		// 		it('should emit getEventsFail action', () => {
		// 			expect(createEffects(actions).GetEvents).toBeObservable(expected);
		// 		});
		// 	});
>>>>>>> 47082d906db93e73fe7f6210925dfc041f8cfedc
	});
});
