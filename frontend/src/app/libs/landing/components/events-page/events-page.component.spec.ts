import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './events-page.component';
import { EventsFacadeService } from '../../store/events/events.facade';
import { of } from 'rxjs';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('EventsPageComponent', () => {
	let component: LandingPageComponent;
	let fixture: ComponentFixture<LandingPageComponent>;
	const mockEventsFacadeService: any = {
		events$: of(
			{
				status: 'Success',
				value:
				{
					title: 'test'
				},
				error: null
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

	const mockRouter: any = {
		router$: of(
			{
				id: 'router'
			}
		),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPageComponent],
			providers: [
				{ provide: EventsFacadeService, useValue: mockEventsFacadeService },
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				{ provide: Router, useValue: mockRouter }
			],
			imports: [
				TranslateModule.forRoot(),
			]
		}).compileComponents();
		fixture = TestBed.createComponent(LandingPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
