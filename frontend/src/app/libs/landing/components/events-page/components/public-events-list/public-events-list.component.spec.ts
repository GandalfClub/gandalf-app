import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsFacadeService } from 'src/app/libs/landing/store/events/events.facade';
import { PublicEventsListComponent } from './public-events-list.component';

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
