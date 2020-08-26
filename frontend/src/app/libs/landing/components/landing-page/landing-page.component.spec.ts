import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { EventsFacadeService } from '../../store/events/events.facade';

describe('LandingPageComponent', () => {
	let component: LandingPageComponent;
	let fixture: ComponentFixture<LandingPageComponent>;
	const mockEventsFacadeService: any = {
		getEvents(): void {
			return;
		},
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPageComponent],
			providers: [{ provide: EventsFacadeService, useValue: mockEventsFacadeService }],
		}).compileComponents();
		fixture = TestBed.createComponent(LandingPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
