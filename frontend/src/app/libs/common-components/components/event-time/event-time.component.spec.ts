import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeComponent } from './event-time.component';

describe('EventTimeComponent', () => {
	let component: EventTimeComponent;
	let fixture: ComponentFixture<EventTimeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EventTimeComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventTimeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
