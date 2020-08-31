import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventsListComponent } from './public-events-list.component';
import { EventsFacadeService } from '../../store/events/events.facade';

describe('PublicEventsListComponent', () => {
	let component: PublicEventsListComponent;
	let fixture: ComponentFixture<PublicEventsListComponent>;
	const mockEventsFacadeService: any = {
		eventsValue(): void {
			return;
		},
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PublicEventsListComponent],
			providers: [{ provide: EventsFacadeService, useValue: mockEventsFacadeService }],
		}).compileComponents();
		fixture = TestBed.createComponent(PublicEventsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
