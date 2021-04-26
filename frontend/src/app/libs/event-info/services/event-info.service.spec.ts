import { TestBed } from '@angular/core/testing';

import { EventInfoService } from './event-info.service';

describe('EventInfoService', () => {
	let service: EventInfoService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EventInfoService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
