import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeComponent } from './event-time.component';
import { start } from 'repl';

const startTime: Date = new Date('2020-02-02T20:00');
const endTime: Date = new Date('2020-02-04T21:30');

describe('EventTimeComponent', () => {
	let component: EventTimeComponent;
	let fixture: ComponentFixture<EventTimeComponent>;
	let htmlElement: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EventTimeComponent ]
		})
		.compileComponents();

		htmlElement = fixture.nativeElement;
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventTimeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets isEventInProgress', () => {
		beforeEach(() => {
			component.startTime = startTime;
			component.endTime = endTime;
			fixture.detectChanges();
		});

		it('should display InProgress text', () => {
			component.isEventInProgress = true;
			fixture.detectChanges();
			expect(htmlElement.querySelector('time.app-event-time--in-progress').textContent).toContain('In Progress');
		});

		it('should display formatted time', () => {
			component.isEventInProgress = false;
			fixture.detectChanges();
			expect(htmlElement.querySelector('time.app-event-time span').textContent).toContain('8 pm');
			expect(htmlElement.querySelector('time.app-event-time span:last-child').textContent).toContain('9:30 pm');
		});
	});
});
