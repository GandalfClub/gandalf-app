import { TestBed } from '@angular/core/testing';
import { EventConverter } from './event-converter.service';
import { Event } from '../../landing/models/event';
import { EventDto } from '../../landing/models/event-dto';
import { EventCardSize } from '../../common-components/components/event-card/models/event-card-size';

describe('EventConverterService', () => {
	let service: EventConverter;
	let event: Event;

	const eventDto: EventDto = {
		_id: 'test',
		generalInfo: {
			title: 'test',
			description: 'test',
			startDate: null,
			startTime: null,
			endDate: null,
			endTime: null,
			isContinuous: true,
			isDraft: true,
			isPrivate: true,
		},
		created: null,
		participations: null,
		users: null,
		tasks: null,
		isActive: null,
		maxScore: null,
		size: EventCardSize.S,
		eventParticipations: [],
		roles: []
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
