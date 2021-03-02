import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { EventRepository } from './event-repository.service';
import { EventParticipation } from '../../landing/models/event-participation.class';
import { cold } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';

describe('EventsService', () => {
	let eventRepository: EventRepository;
	let httpTestingController: HttpTestingController;
	let req: TestRequest;
	let id: string;
	let mockParticipation: EventParticipation;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [EventRepository],
		});
		eventRepository = TestBed.inject(EventRepository);
		httpTestingController = TestBed.inject(HttpTestingController);

		mockParticipation = new EventParticipation('userId', 'evId');
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(eventRepository).toBeTruthy();
	});

	describe('when getEvents called', () => {
		beforeEach(() => {
			id = '1';
			eventRepository.getEvent(id).subscribe();
			req = httpTestingController.expectOne('/api/publicevents/1');
		});

		it('should called with get method and publicevets/1 path', () => {
			expect(req.request.method).toEqual('GET');
		});
	});

	describe('when regForEvent called: ', () => {
		let spyRegForEvent: jasmine.Spy;
		beforeEach(() => {
			const data$: TestColdObservable = cold('---x|', { x: mockParticipation });
			spyRegForEvent = spyOn(eventRepository, 'regForEvent').and.returnValue(data$);
		});

		it('should return EventParticipation', () => {
			spyRegForEvent(mockParticipation)
				.toPromise()
				.then((ev: EventParticipation) => {
					expect(ev.eventId === mockParticipation.eventId && ev.userId === mockParticipation.userId).toBeTrue();
				});
		});
	});
});
