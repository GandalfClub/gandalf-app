import { TestBed } from '@angular/core/testing';

import { EventConverter } from './event-converter.service';

import { Event } from '../../landing/models/event';

describe('EventConverterService', () => {
	let service: EventConverter;
	let event: Event;

	const eventDto: any = {
		_id: 'test',
	};

	const eventResult: any = {
		id: 'test',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EventConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('convertFromDto methodshould rename "_id" key', () => {
		beforeEach(() => {
			event = service.convertFromDto(eventDto);
		});

		it('should rename "_id" key', () => {
			expect(event).toEqual(eventResult);
		});
	});
});
