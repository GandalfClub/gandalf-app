import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { of, Observable, Subscription, from } from 'rxjs';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { FormBuilder } from '@angular/forms';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';

describe('SignInComponent', () => {
	const defaultUser: any = {
		status: 'Success',
	};
	const user: Observable<unknown> = defaultUser;
	// const user$: Observable<EntityWrapper<User>>;
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignInComponent],
			imports: [EffectsModule.forRoot([]), StoreModule.forRoot({}), RouterTestingModule],
			providers: [{ provide: AuthFacadeService, useValue: { user$: () => user } }, { provide: FormBuilder }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('should navigate at userprofile if sign in success', () => {
		const facadeService: any = TestBed.inject(AuthFacadeService);
		spyOn(facadeService, 'user$').and.returnValue(from(user));
		expect(user).toBe(user);
	});
});
