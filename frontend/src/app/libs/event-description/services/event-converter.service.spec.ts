import { TestBed } from '@angular/core/testing';
import { EventConverter } from './event-converter.service';
import { Event } from '../../landing/models/event';
import { EventDto } from '../../landing/models/event-dto';

describe('EventConverterService', () => {
	let service: EventConverter;
	let event: Event;

	const eventDto: EventDto = {
		_id: 'test',
		title: 'test',
		description: 'test',
		created: null,
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
		participations: null,
		users: null,
		tasks: null,
		isActive: null,
		maxScore: null,
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
			expect(event.id).toEqual('test');
		});
	});
});
