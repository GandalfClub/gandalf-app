import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { of, Observable } from 'rxjs';
import { User } from '../../auth/models/user';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('SignUpComponent', () => {
	const user: any = {};
	let component: SignUpComponent;
	let fixture: ComponentFixture<SignUpComponent>;
	const mockAuthFacadeService: any = {
		get user$(): any {
			return of(user);
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignUpComponent],
			imports: [EffectsModule.forRoot([]), StoreModule.forRoot({}), RouterTestingModule],
			providers: [{ provide: AuthFacadeService, useValue: mockAuthFacadeService }, { provide: FormBuilder }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignUpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
