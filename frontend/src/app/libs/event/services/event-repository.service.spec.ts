import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { EventRepository } from './event-repository.service';

describe('EventsService', () => {
	let eventRepository: EventRepository;
	let httpTestingController: HttpTestingController;
	let req: TestRequest;
	let id: string;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [EventRepository],
		});
		eventRepository = TestBed.inject(EventRepository);
		httpTestingController = TestBed.inject(HttpTestingController);
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
});
