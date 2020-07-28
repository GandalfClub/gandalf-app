import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { AuthEffects } from './auth.effects';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

describe('AuthEffects', () => {
	const actions$: Observable<any> = new Observable<any>();
	let effects: AuthEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				AngularFireModule.initializeApp(environment.firebase),
				AngularFireAuthModule,
			],
			providers: [
				AuthEffects,
				provideMockActions(() => actions$)
			],
		});

		effects = TestBed.inject(AuthEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
