import { TestBed } from '@angular/core/testing';

import { EventConverterService } from './event-converter.service';

describe('EventConverterService', () => {
	let service: EventConverterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EventConverterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
