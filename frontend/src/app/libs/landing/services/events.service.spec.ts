import { TestBed } from '@angular/core/testing';

import { EventsRepository } from './events.service';

describe('EventsService', () => {
	let service: EventsRepository;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EventsRepository);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
