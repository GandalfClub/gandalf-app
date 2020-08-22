import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { EventsRepository } from './events-repository.service';
import { EventsResponse } from '../models/events-response';
import { EventDto } from '../models/eventDto';

describe('EventsService', () => {
	let httpMock: HttpTestingController;
	let eventsRepository: EventsRepository;
	const event: EventDto = {
		_id: '',
		title: '',
		description: '',
		created: null,
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
	};
	const validResponse: EventsResponse = {
		events: [event],
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [EventsRepository],
		});
		httpMock = TestBed.inject(HttpTestingController);
		eventsRepository = TestBed.inject(EventsRepository);
	});
	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(eventsRepository).toBeTruthy();
	});

	describe('getEvents', () => {
		it('should return an Observable<Event[]>', () => {
			eventsRepository.getEvents().subscribe((response: EventsResponse) => {
				expect(response).toEqual(validResponse);
			});
			const req: TestRequest = httpMock.expectOne('/api/publicevents');
			req.flush(validResponse);
		});
	});
});
