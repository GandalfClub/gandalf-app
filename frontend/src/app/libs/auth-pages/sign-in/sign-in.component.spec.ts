import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { of } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { FormBuilder } from '@angular/forms';

describe('SignInComponent', () => {
	const user: any = {};
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;
	const mockAuthFacadeService: any = {
		get user$(): any {
			return of(user);
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignInComponent],
			imports: [EffectsModule.forRoot([]), StoreModule.forRoot({}), RouterTestingModule],
			providers: [{ provide: AuthFacadeService, useValue: mockAuthFacadeService }, { provide: FormBuilder }],
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
});
