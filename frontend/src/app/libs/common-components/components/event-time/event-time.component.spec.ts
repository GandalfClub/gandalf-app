import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeComponent } from './event-time.component';

const startTime: Date = new Date('2020-02-02T20:00');
const endTime: Date = new Date('2020-02-04T21:30');

describe('EventTimeComponent', () => {
	let component: EventTimeComponent;
	let fixture: ComponentFixture<EventTimeComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ EventTimeComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(EventTimeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
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

		describe('isEventInProgress is true', () => {
			beforeEach(() => {
				component.isEventInProgress = true;
				fixture.detectChanges();
			});

			it('should show InProgress text', () => {
				expect(htmlElement.querySelector('time.app-event-time--in-progress').textContent).toContain('In Progress');
			});
		});

		describe('isEventInProgress is false', () => {
			beforeEach(() => {
				component.isEventInProgress = false;
				fixture.detectChanges();
			});

			it('should show formatted time', () => {
				expect(htmlElement.querySelector('time.app-event-time > span').textContent).toContain('8:00 PM');
				expect(htmlElement.querySelector('time.app-event-time > span:last-child').textContent).toContain('9:30 PM');
			});
		});
	});
});
