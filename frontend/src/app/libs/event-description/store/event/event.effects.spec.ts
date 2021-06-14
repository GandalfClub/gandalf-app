import { Injectable } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventEffects } from './event.effects';
import { EventRepository } from '../../services/event-repository.service';
import { Event } from '../../../landing/models/event';
import { LoadEvent, LoadEventSuccess, LoadEventFail, RegForEvent, RegForEventFail, RegForEventSuccess } from './event.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../../auth/helpers/createSpy';
import { EventConverter } from '../../services/event-converter.service';
import { EventDto } from 'src/app/libs/landing/models/event-dto';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';

describe('Events Effects', () => {
	let mockEventRepository: jasmine.SpyObj<EventRepository>;
	let eventConverter: EventConverter;
	let router: Router;
	let event: Event;
	let eventDto: EventDto;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;
	let id: string;
	let mockParticipation: EventParticipation;

	function createEffects(source: Observable<Action>): EventEffects {
		return new EventEffects(new Actions(source), mockEventRepository, eventConverter, router);
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
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
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
		mockParticipation = new EventParticipation('uId', 'evId');
		error = new Error('test');
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
					size: EventCardSize.S,
					eventParticipations: [],
					roles: [],
					tasks: []
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
					users: null,
					tasks: null,
					isActive: null,
					maxScore: null,
					size: EventCardSize.S,
					eventParticipations: [],
					roles: [],
					participations: []
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

		describe('RegForEvent:', () => {
			beforeEach(() => {
				mockEventRepository.regForEvent.and.throwError(error);
				actions = hot('-a|', { a: new RegForEvent(mockParticipation) });
				expected = cold('-(s|)', { s: new RegForEventFail(error) });
			});

			it('should emit RegForEventFail action', () => {
				expect(createEffects(actions).RegForEvent).toBeObservable(expected);
			});
		});

		describe('RegForEvent:', () => {
			beforeEach(() => {
				mockEventRepository.regForEvent.and.returnValue(of(mockParticipation));
				actions = hot('-a-|', { a: new RegForEvent(mockParticipation) });
				expected = cold('-s-|)', { s: new RegForEventSuccess(mockParticipation) });
			});

			it('should emit RegForEventSuccess action', () => {
				expect(createEffects(actions).RegForEvent).toBeObservable(expected);
			});
		});
	});
});
