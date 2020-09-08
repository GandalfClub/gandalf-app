import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTileDemoComponent } from './event-tile-demo.component';

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
});
