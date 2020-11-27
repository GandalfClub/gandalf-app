import { TestBed, async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { EventEffects } from './event.effects';
import { EventRepository } from '../../services/event-repository.service';
import { EventCard } from '../../../landing/models/event';
import { LoadEvent, LoadEventSuccess, LoadEventFail } from './event.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../../auth/helpers/createSpy';
import { EventConverter } from '../../services/event-converter.service';
import { EventDto } from 'src/app/libs/landing/models/event-dto';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';

describe('Events Effects', () => {
	let mockEventRepository: jasmine.SpyObj<EventRepository>;
	let eventConverter: EventConverter;
	let event: EventCard;
	let eventDto: EventDto;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;
	let id: string;

	function createEffects(source: Observable<Action>): EventEffects {
		return new EventEffects(new Actions(source), mockEventRepository, eventConverter);
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: EventRepository,
					useValue: createSpy(EventRepository.prototype, {
						getEvent: jasmine.createSpy().and.returnValue(of(event)),
					}),
				},
			],
		});
		mockEventRepository = TestBed.inject(EventRepository) as jasmine.SpyObj<EventRepository>;
		eventConverter = TestBed.inject(EventConverter) as jasmine.SpyObj<EventConverter>;
	}));

	describe('getEvent', () => {
		describe('when getEvent successful', () => {
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
					size: EventCardSize.S
				};
				eventDto = {
					_id: 'test',
					title: 'test',
					description: 'test',
					created: null,
					startDate: null,
					startTime: null,
					endDate: null,
					endTime: null,
					participations: null,
					users: null,
					tasks: null,
					isActive: null,
					maxScore: null,
					size: EventCardSize.S

				};
				id = '1';
				mockEventRepository.getEvent.and.returnValue(of(eventDto));
				actions = hot('-a-|', { a: new LoadEvent(id) });
				expected = cold('-s-|', { s: new LoadEventSuccess(eventConverter.convertFromDto(eventDto)) });
			});

			it('should emit getEvents action', () => {
				expect(createEffects(actions).GetEvent).toBeObservable(expected);
			});
		});

		describe('when getEvent failed', () => {
			beforeEach(() => {
				error = new Error('test');
				mockEventRepository.getEvent.and.throwError(error);
				id = '1';
				actions = hot('-a|', { a: new LoadEvent(id) });
				expected = cold('-(s|)', { s: new LoadEventFail(error) });
			});

			it('should emit getEventsFail action', () => {
				expect(createEffects(actions).GetEvent).toBeObservable(expected);
			});
		});
	});
});
