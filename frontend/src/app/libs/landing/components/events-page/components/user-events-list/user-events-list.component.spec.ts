import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/libs/auth/models/user';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { Event } from '../../../../models/event';

import { UserEventsListComponent } from './user-events-list.component';

describe('UserEventsListComponent', () => {
	let component: UserEventsListComponent;
	let fixture: ComponentFixture<UserEventsListComponent>;

	const user: User = {
		id: '111',
		email: 'dhdh@hd',
		isAdmin: true,
		claims: []
	};

	const events: Partial<Event[]> = [
		{
			id: 't1',
			title: 'test1',
			description: 'test',
			created: new Date ('Wed Dec 15 2020 03:00:00 GMT+0300 (Moscow Standard Time)'),
			startDate: new Date ('Wed Dec 15 2020 03:00:00 GMT+0300 (Moscow Standard Time)'),
			endDate: new Date ('Wed Dec 16 2020 03:00:00 GMT+0300 (Moscow Standard Time)'),
			startTime: new Date ('Wed Dec 15 2020 03:00:00 GMT+0300 (Moscow Standard Time)'),
			endTime: new Date ('Wed Dec 15 2020 03:00:00 GMT+0300 (Moscow Standard Time)'),
			users: [
				{
				id: '111',
				email: 'dhdh@hd',
				isAdmin: true,
				claims: []
				}
			],
			size: EventCardSize.S,
			eventParticipations: [],
			roles: [],
			tasks: []
		}
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UserEventsListComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserEventsListComponent);
		component = fixture.componentInstance;
		component.events = events;
		component.user = user;
		component.getMyAndOtherEvents();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
