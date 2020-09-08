import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTileDemoComponent } from './event-tile-demo.component';
import { ComponentsDemoGroupComponent } from '../components-demo-group/components-demo-group.component';

describe('EventTileDemoComponent', () => {
	let component: EventTileDemoComponent;
	let fixture: ComponentFixture<EventTileDemoComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ EventTileDemoComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(EventTileDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets isDark', () => {
		beforeEach(() => {
			component.isDark = true;
			fixture.detectChanges();
		});

		it('should define isDark', () => {
			expect(component.isDark).toBeTrue();
		});
	});

	describe('when @Input does not get isDark', () => {
		it('should be false by default', () => {
			expect(component.isDark).toBeFalse();
		});
	});
});
