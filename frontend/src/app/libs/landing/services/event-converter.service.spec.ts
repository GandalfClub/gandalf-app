import { TestBed } from '@angular/core/testing';

import { EventConverter } from './event-converter.service';

describe('EventConverterService', () => {
	let service: EventConverter;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EventConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
