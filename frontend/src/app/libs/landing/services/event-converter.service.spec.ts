import { TestBed } from '@angular/core/testing';

import { EventConverter } from './event-converter.service';

import { Event } from '../models/event';

describe('EventConverterService', () => {
	let service: EventConverter;
	let events: Event[];

	const eventDto: any = {
		_id: 'test',
	};

	const event: any = {
		id: 'test',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EventConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('convertFromDto method should rename "_id" key', () => {
		beforeEach(() => {
			events = service.convertFromDto([eventDto]);
		});

		it('should rename "_id" key', () => {
			expect(events).toEqual([event]);
		});
	});
});
