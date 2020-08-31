import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { EventsRepository } from './events-repository.service';

describe('EventsService', () => {
	let eventsRepository: EventsRepository;
	let httpTestingController: HttpTestingController;
	let req: TestRequest;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [EventsRepository],
		});
		eventsRepository = TestBed.inject(EventsRepository);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(eventsRepository).toBeTruthy();
	});

	describe('when getEvents called', () => {
		beforeEach(() => {
			eventsRepository.getEvents().subscribe();
			req = httpTestingController.expectOne('/api/publicevents');
		});

		it('should called with get method and publicevets path', () => {
			expect(req.request.method).toEqual('GET');
		});
	});
});
