import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './events-page.component';
import { EventsFacadeService } from '../../store/events/events.facade';
import { Observable, of } from 'rxjs';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';

import { EventCard } from '../../models/event';


describe('EventsPageComponent', () => {
	let component: LandingPageComponent;
	let fixture: ComponentFixture<LandingPageComponent>;
	const mockEventsFacadeService: any = {
		eventsValue$: of(
			{
				title: 'test'
			}
		),

		getEvents(): void {
			return;
		},
	};

	const mockAuthFacadeService: any = {
		user$: of(
			{
				id: '111',
				email: 'string@ff',
				isAdmin: true
			}
		),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPageComponent],
			providers: [
				{ provide: EventsFacadeService, useValue: mockEventsFacadeService },
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService}],
		}).compileComponents();
		fixture = TestBed.createComponent(LandingPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
