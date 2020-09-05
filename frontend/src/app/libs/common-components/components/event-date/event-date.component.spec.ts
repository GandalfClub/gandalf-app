import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDateComponent } from './event-date.component';

// 	FAKE DATA
const startDate: Date = new Date('2020-02-02T20:00');
const endDate: Date = new Date('2020-02-04T21:30');

describe('EventDateComponent', () => {
	let component: EventDateComponent;
	let fixture: ComponentFixture<EventDateComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ EventDateComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(EventDateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets start/end Date', () => {
		describe('endDate was provided', () => {
			it('should show start/end Date', () => {
				component.startDate = startDate;
				component.endDate = endDate;
				fixture.detectChanges();
				expect(htmlElement.querySelector('time.app-event-date').textContent).toContain('2 Feb 20 - 4 Feb 20');
			});
		});

		describe('endDate was not provided', () => {
			it('should show only start Date', () => {
				component.startDate = startDate;
				fixture.detectChanges();
				expect(htmlElement.children.length).toBe(1);
				expect(htmlElement.querySelector('time.app-event-date > span').textContent).toContain('2 Feb 20');
			});
		});
	});
});
