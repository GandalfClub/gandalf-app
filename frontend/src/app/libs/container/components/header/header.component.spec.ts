import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { AdminLink } from '../../models/admin-link';
import { ContainerFacadeService } from '../../services/container-facade.service';
import { ContainerStoreModule } from '../../store/store.module';
import { LocalizationModule } from '../localization/localization.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule,
				LocalizationModule
			],
			declarations: [ HeaderComponent ],
			providers: [ ContainerFacadeService ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when call event onEventClick', () => {
		beforeEach(() => {
			component.onEventsClick();
		});

		it('activation of events adminLink should be true', () => {
			expect(component.adminLinksActivation.get(AdminLink.Events)).toBeTrue();
		});
	});

	describe('when call administration onAdministrationClick', () => {
		beforeEach(() => {
			component.onAdministrationClick();
		});

		it('activation of administration adminLink should be true', () => {
			expect(component.adminLinksActivation.get(AdminLink.Administration)).toBeTrue();
		});
	});

	describe('when call resetAdminLinksActivation', () => {
		beforeEach(() => {
			component.resetAdminLinksActivation();
		});

		it('activation of all AdminLinks should be false', () => {
			component.adminLinksActivation.forEach((activationState: boolean) => {
				expect(activationState).toEqual(false);
			});
		});
	});

	describe('when call eventsLink', () => {
		it('should return eventsLink', () => {
			expect(component.eventsLink).toEqual(AdminLink.Events);
		});
	});

	describe('when call administrationLink', () => {
		it('should return administrationLink', () => {
			expect(component.administrationLink).toEqual(AdminLink.Administration);
		});
	});
});
