import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { UsersRepositoryService } from './users-repository.service';

describe('EventsService', () => {
	let eventsRepository: UsersRepositoryService;
	let httpTestingController: HttpTestingController;
	let req: TestRequest;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [UsersRepositoryService],
		});
		eventsRepository = TestBed.inject(UsersRepositoryService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(eventsRepository).toBeTruthy();
	});

	describe('when getUsers called', () => {
		beforeEach(() => {
			eventsRepository.getUsers().subscribe();
			req = httpTestingController.expectOne('/api/users');
		});

		it('should called with get method and publicevets path', () => {
			expect(req.request.method).toEqual('GET');
		});
	});
});
