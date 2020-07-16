import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { EffectsRootModule, EffectsModule } from '@ngrx/effects';
import { StoreRootModule, StoreModule } from '@ngrx/store';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignInComponent],
			imports: [EffectsModule.forRoot([]), StoreModule.forRoot({}), RouterTestingModule],
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
