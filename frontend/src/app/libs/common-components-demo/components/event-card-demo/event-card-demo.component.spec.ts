import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardDemoComponent } from './event-card-demo.component';

describe('EventCardDemoComponent', () => {
	let component: EventCardDemoComponent;
	let fixture: ComponentFixture<EventCardDemoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EventCardDemoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventCardDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
