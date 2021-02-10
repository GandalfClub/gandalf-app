import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { Event } from '../../models/event';

import { EventComponent } from './event.component';
const event: Event = {
	id: '',
	title: '',
	description: '',
	created: null,
	startDate: null,
	startTime: null,
	endDate: null,
	endTime: null,
	users: [],
	size: EventCardSize.S,
	eventParticipations: [],
	roles: []
};

describe('EventComponent', () => {
	let component: EventComponent;
	let fixture: ComponentFixture<EventComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EventComponent],
		}).compileComponents();
		fixture = TestBed.createComponent(EventComponent);
		component = fixture.componentInstance;
		component.event = event;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
