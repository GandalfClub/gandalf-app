import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { EventsFacadeService } from '../../store/events';

describe('EventsComponent', () => {
	let component: EventsComponent;
	let fixture: ComponentFixture<EventsComponent>;
	const mockEventsFacadeService: any = {
		getEvents(): void {
			return;
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EventsComponent],
			providers: [{ provide: EventsFacadeService, useValue: mockEventsFacadeService }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
