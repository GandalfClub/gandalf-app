import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsFacadeService } from '../../store/events';
import { PublicEventsListComponent } from './public-events-list.component';

describe('PublicEventsListComponent', () => {
	let component: PublicEventsListComponent;
	let fixture: ComponentFixture<PublicEventsListComponent>;
	const mockEventsFacadeService: any = {
		getEvents(): void {
			return;
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PublicEventsListComponent],
			providers: [{ provide: EventsFacadeService, useValue: mockEventsFacadeService }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PublicEventsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
