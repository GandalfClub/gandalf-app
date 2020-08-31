import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
