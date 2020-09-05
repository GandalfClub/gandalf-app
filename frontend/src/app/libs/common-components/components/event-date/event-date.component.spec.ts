import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDateComponent } from './event-date.component';

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
		htmlElement = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input start/end Date', () => {
		it('should show start/end Date', () => {
			component.startDate = startDate;
			component.endDate = endDate;
			fixture.detectChanges();
			expect(htmlElement.querySelector('time.app-event-date > span').textContent).toContain('2 Feb 20');
			expect(htmlElement.querySelector('time.app-event-date > span:last-child').textContent).toContain('4 Feb 20');
		});

		it('should show only start Date', () => {
			component.startDate = startDate;
			fixture.detectChanges();
			expect(htmlElement.children.length).toBe(1);
			expect(htmlElement.querySelector('time.app-event-date > span').textContent).toContain('2 Feb 20');
		});
	});
});
