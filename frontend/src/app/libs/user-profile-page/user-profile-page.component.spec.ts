import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePageComponent } from './user-profile-page.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { UserFacadeService } from './store/user/user.facade';

describe('UserConfigComponent', () => {
	const user: any = {};
	let component: UserProfilePageComponent;
	let fixture: ComponentFixture<UserProfilePageComponent>;
	const mockAuthFacadeService: any = {
		get user$(): any {
			return of(user);
		},
		get signInByGithub(): any {
			return {};
		},
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserProfilePageComponent],
			imports: [EffectsModule.forRoot([]), StoreModule.forRoot({}), RouterTestingModule],
			providers: [{ provide: UserFacadeService, useValue: mockAuthFacadeService }, { provide: FormBuilder }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserProfilePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
