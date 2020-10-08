import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AuthRepository } from '../../services/auth-repository.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { UserCredentials } from '../../models/user-credentials';
import {
	SignIn,
	SignInSuccess,
	SignUpSuccess,
	SignInFailure,
	SignInByGithub,
	SignUp,
	SignUpFailure,
	UpdateUserInfo,
	UpdateUserInfoSuccess,
	UpdateUserInfoFail,
	LoadUser,
	LoadUserSuccess,
	LoadUserFail,
} from './auth.actions';
import { cold, hot } from 'jasmine-marbles';
import { auth } from 'firebase';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../helpers/createSpy';
import { AuthConverter } from '../../services/auth-converter.service';
import { UserDto } from '../../models/user-dto';
import { AuthResponse } from '../../models/auth-response';
import { UserClaim } from 'src/app/libs/admin-role-management/models/user-claims.enum';
import { AuthFacadeService } from './auth.facade';

describe('Auth Effects', () => {
	let mockAuthRepository: jasmine.SpyObj<AuthRepository>;
	let mockAngularFireAuth: jasmine.SpyObj<AngularFireAuth>;
	let mockAuthConverter: jasmine.SpyObj<AuthConverter>;
	let authFacade: jasmine.SpyObj<AuthFacadeService>;

	authFacade = null;

	function createEffects(source: Observable<Action>): AuthEffects {
		return new AuthEffects(new Actions(source), mockAuthRepository, mockAngularFireAuth, mockAuthConverter, authFacade);
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
					provide: AuthConverter,
					useValue: createSpy(AuthConverter.prototype),
				},
				{
					provide: AngularFireAuth,
					useValue: createSpy(AngularFireAuth.prototype, {
						auth: createSpy(auth.prototype, {
							signInWithEmailAndPassword: jasmine.createSpy().and.returnValue(of(authUserCredential)),
							signInWithPopup: jasmine.createSpy().and.returnValue(of(authUserCredential)),
							createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(of(authUserCredential)),
						}),
					}),
				},
			],
		});

		mockAuthRepository = TestBed.inject(AuthRepository) as jasmine.SpyObj<AuthRepository>;
		mockAuthConverter = TestBed.inject(AuthConverter) as jasmine.SpyObj<AuthConverter>;
		mockAngularFireAuth = TestBed.inject(AngularFireAuth);
	});

	describe('SignIn', () => {
		const user: User = {
			id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [],
		};

		const userDto: UserDto = {
			_id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [],
		};

		const authResponse: AuthResponse = {
			isCompetitionActive: false,
			logged: true,
			message: '',
			status: 0,
			user: userDto,
		};

		const credentials: UserCredentials = {
			email: 'test@test',
			password: '123',
		};

		const error: Error = new Error('error') as any;

		describe('when auth was successful', () => {
			it('should emit SignInSuccess action', () => {
				mockAuthRepository.signIn.and.returnValue(of(authResponse));
				const actions: Observable<Action> = hot('-a-|', { a: new SignIn(credentials) });
				const expected: Observable<Action> = cold('-s-|', {
					s: new SignInSuccess(mockAuthConverter.convertFromDto(authResponse.user)),
				});
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
			claims: [],
		};

		const userDto: UserDto = {
			_id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [],
		};

		const authResponse: AuthResponse = {
			isCompetitionActive: false,
			logged: true,
			message: '',
			status: 0,
			user: userDto,
		};

		const error: Error = new Error('error') as any;

		describe('when auth was successful', () => {
			it('should emit SignInSuccess action', () => {
				mockAuthRepository.signInByGithub.and.returnValue(of(authResponse));
				const actions: Observable<Action> = hot('-a-|', { a: new SignInByGithub() });
				const expected: Observable<Action> = cold('-s-|', {
					s: new SignInSuccess(mockAuthConverter.convertFromDto(authResponse.user)),
				});
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
			claims: [],
		};

		const credentials: UserCredentials = {
			email: 'test@test',
			password: '123',
		};

		const userDto: UserDto = {
			_id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [],
		};

		const authResponse: AuthResponse = {
			isCompetitionActive: false,
			logged: true,
			message: '',
			status: 0,
			user: userDto,
		};

		const error: Error = new Error('error') as any;

		describe('when auth was successful', () => {
			it('should emit SignUpSuccess action', () => {
				mockAuthRepository.signUp.and.returnValue(of(authResponse));
				const actions: Observable<Action> = hot('-a-|', { a: new SignUp(credentials) });
				const expected: Observable<Action> = cold('-s-|', {
					s: new SignUpSuccess(mockAuthConverter.convertFromDto(authResponse.user)),
				});
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

	describe('Update user', () => {
		const user: User = {
			id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [],
		};

		const credentials: UserCredentials = {
			email: 'test@test',
			password: '123',
		};

		const userDto: UserDto = {
			_id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [],
		};

		const error: Error = new Error('error') as any;

		describe('update user success', () => {
			it('should success', () => {
				mockAuthRepository.updateUser.and.returnValue(of(userDto));
				const actions: Observable<Action> = hot('-a-', { a: new UpdateUserInfo({ user }) });
				const expected: Observable<Action> = cold('-s-', {
					s: new UpdateUserInfoSuccess({ user: mockAuthConverter.convertFromDto(userDto) }),
				});
				expect(createEffects(actions).updateUser$).toBeObservable(expected);
			});
		});
	});

	describe('LoadUser', () => {
		const user: User = {
			id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [UserClaim.Admin]
		};

		const userDto: UserDto = {
			_id: 'test',
			email: 'test@test',
			isAdmin: false,
			claims: [UserClaim.Admin]
		};

		const authResponse: AuthResponse = {
			isCompetitionActive: false,
			logged: true,
			message: '',
			status: 0,
			user: userDto,
		};

		const error: Error = new Error('error') as any;

		describe('when LoadUser was successful', () => {
			it('should emit LoadUserSuccess action', () => {
				mockAuthRepository.loadUser.and.returnValue(of(userDto));
				const actions: Observable<Action> = hot('-a-|', { a: new LoadUser() });
				const expected: Observable<Action> = cold('-s-|', {
					s: new LoadUserSuccess({ user: mockAuthConverter.convertFromDto(userDto) }),
				});
				expect(createEffects(actions).LoadUserBack).toBeObservable(expected);
			});
		});

		describe('when LoadUser failed', () => {
			it('should emit LoadUserFail action', () => {
				mockAuthRepository.loadUser.and.throwError(error);
				const actions: Observable<Action> = hot('--a|', { a: new LoadUser() });
				const expected: Observable<Action> = cold('--(f|)', { f: new LoadUserFail({ message: error }) });
				expect(createEffects(actions).LoadUserBack).toBeObservable(expected);
			});
		});
	});
});
