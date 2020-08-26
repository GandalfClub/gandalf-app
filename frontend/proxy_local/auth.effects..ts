import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AuthRepository } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { UserCredentials } from '../../models/user-credentials';
import { SignIn, SignInSuccess, SignUpSuccess, SignInFailure, SignInByGithub, SignUp, SignUpFailure } from './auth.actions';
import { cold, hot } from 'jasmine-marbles';
import { auth } from 'firebase';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../helpers/createSpy';

describe('Auth Effects', () => {

	let mockAuthRepository: jasmine.SpyObj<AuthRepository>;
	let mockAngularFireAuth: jasmine.SpyObj<AngularFireAuth>;

	function createEffects(source: Observable<Action>): AuthEffects {
		return new AuthEffects(
			new Actions(source),
			mockAuthRepository,
			mockAngularFireAuth,
		);
	}

	const authUserCredential: auth.UserCredential = {
		user: {
			email: 'test',
			uid: 'test',
		} as any,
		credential: {} as any,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: AuthRepository,
					useValue: createSpy(AuthRepository.prototype),
				},
				{
					provide: AngularFireAuth,
					useValue: createSpy(AngularFireAuth.prototype, {
						auth: createSpy(auth.prototype,
							{
								signInWithEmailAndPassword: jasmine.createSpy().and.returnValue(of(authUserCredential)),
								signInWithPopup: jasmine.createSpy().and.returnValue(of(authUserCredential)),
								createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(of(authUserCredential)),
							}
						)
					})
				},
			],
		});

		mockAuthRepository = TestBed.inject(AuthRepository) as jasmine.SpyObj<AuthRepository>;
		mockAngularFireAuth = TestBed.inject(AngularFireAuth);
	});

	describe('SignIn', () => {
		const user: User = {
			id: 'test',
			email: 'test@test',
			isAdmin: false,
		};

		const credentials: UserCredentials = {
			email: 'test@test',
			password: '123',
		};

		const error: Error = new Error('error') as any;

		describe('when auth was successful', () => {
			it('should emit SignInSuccess action', () => {
				mockAuthRepository.signIn.and.returnValue(of(user));
				const actions: Observable<Action> = hot('-a-|', { a: new SignIn(credentials) });
				const expected: Observable<Action> = cold('-s-|', { s: new SignInSuccess(user) });
				expect(createEffects(actions).SignIn).toBeObservable(expected);
			});
		});

		describe('when auth failed', () => {
			it('should emit SignInFailed action', () => {
				mockAuthRepository.signIn.and.throwError(error);
				const actions: Observable<Action> = hot('--a|', { a: new SignIn(credentials) });
				const expected: Observable<Action> = cold('--(f|)', { f: new SignInFailure(error) });
				expect(createEffects(actions).SignIn).toBeObservable(expected);
			});
		});
	});

	describe('SignByGithub', () => {

		const user: User = {
			id: 'test',
			email: 'test@test',
			isAdmin: false,
		};

		const error: Error = new Error('error') as any;

		describe('when auth was successful', () => {
			it('should emit SignInSuccess action', () => {
				mockAuthRepository.signInByGithub.and.returnValue(of(user));
				const actions: Observable<Action> = hot('-a-|', { a: new SignInByGithub() });
				const expected: Observable<Action> = cold('-s-|', { s: new SignInSuccess(user) });
				expect(createEffects(actions).SignInByGithub).toBeObservable(expected);
			});
		});

		describe('when auth failed', () => {
			it('should emit SignInFailed action', () => {
				mockAuthRepository.signInByGithub.and.throwError(error);
				const actions: Observable<Action> = hot('--a|', { a: new SignInByGithub() });
				const expected: Observable<Action> = cold('--(f|)', { f: new SignInFailure(error) });
				expect(createEffects(actions).SignInByGithub).toBeObservable(expected);
			});
		});
	});

	describe('SignUp', () => {
		const user: User = {
			id: 'test',
			email: 'test@test',
			isAdmin: false,
		};

		const credentials: UserCredentials = {
			email: 'test@test',
			password: '123',
		};

		const error: Error = new Error('error') as any;

		describe('when auth was successful', () => {
			it('should emit SignUpSuccess action', () => {
				mockAuthRepository.signUp.and.returnValue(of(user));
				const actions: Observable<Action> = hot('-a-|', { a: new SignUp(credentials) });
				const expected: Observable<Action> = cold('-s-|', { s: new SignUpSuccess(user) });
				expect(createEffects(actions).SignUp).toBeObservable(expected);
			});
		});

		describe('when auth failed', () => {
			it('should emit SignUpFailed action', () => {
				mockAuthRepository.signUp.and.throwError(error);
				const actions: Observable<Action> = hot('--a|', { a: new SignUp(credentials) });
				const expected: Observable<Action> = cold('--(f|)', { f: new SignUpFailure(error) });
				expect(createEffects(actions).SignUp).toBeObservable(expected);
			});
		});
	});
});
