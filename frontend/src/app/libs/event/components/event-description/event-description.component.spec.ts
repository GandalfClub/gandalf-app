import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Event } from '../../../landing/models/event';
import { EventDescriptionComponent } from './event-description.component';
import { User } from 'src/app/libs/auth/models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

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

const user: EntityWrapper<User> = {
	status: EntityStatus.Init,
};

describe('EventComponent', () => {
	let component: EventDescriptionComponent;
	let fixture: ComponentFixture<EventDescriptionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EventDescriptionComponent],
		}).compileComponents();
		fixture = TestBed.createComponent(EventDescriptionComponent);
		component = fixture.componentInstance;
		component.event = event;
		component.user = user;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
