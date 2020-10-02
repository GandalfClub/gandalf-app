import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardDateComponent } from './event-card-date.component';

const startDate: Date = new Date('2020-02-02T20:00');
const endDate: Date = new Date('2020-02-04T21:30');

describe('EventDateComponent', () => {
	let component: EventCardDateComponent;
	let fixture: ComponentFixture<EventCardDateComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ EventCardDateComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(EventCardDateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets start/end Date', () => {
		describe('endDate was provided', () => {
			beforeEach(() => {
				component.startDate = startDate;
				component.endDate = endDate;
				fixture.detectChanges();
			});

			it('should show start/end Date', () => {
				expect(htmlElement.querySelector('time.event-card-date').textContent).toContain('2 Feb 2020 - 4 Feb 2020');
			});
		});

		describe('endDate was not provided', () => {
			beforeEach(() => {
				component.startDate = startDate;
				fixture.detectChanges();
			});

			it('should show only start Date', () => {
				expect(htmlElement.children.length).toBe(1);
				expect(htmlElement.querySelector('time.event-card-date > span').textContent).toContain('2 Feb 2020');
			});
		});
	});
});
