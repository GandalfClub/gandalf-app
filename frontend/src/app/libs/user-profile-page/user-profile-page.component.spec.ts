import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { UserProfilePageComponent } from './user-profile-page.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { UserProfileService } from './service/user-profile-service';

describe('UserConfigComponent', () => {
	const user: any = {};
	let component: UserProfilePageComponent;
	let fixture: ComponentFixture<UserProfilePageComponent>;
	const mockAuthFacadeService: any = {
		get user$(): any {
			return of(user);
		},
	  get signInByGithub(): any {return {}; },
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserProfilePageComponent],
			imports: [EffectsModule.forRoot([]), StoreModule.forRoot({}), RouterTestingModule],
			providers: [
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				{ provide: FormBuilder },
				{ provide: UserProfileService },
			],
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
