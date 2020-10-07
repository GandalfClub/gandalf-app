import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { AuthRepository } from './auth-repository.service';
import { AuthResponse } from '../models/auth-response';
import { UserDto } from '../models/user-dto';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('AuthService', () => {
	let authRepository: AuthRepository;
	const validResponse: AuthResponse = {
		status: 1,
		user: {
			_id: '1',
			email: 'test@test',
			isAdmin: true,
		},
		logged: true,
		message: 'test',
		isCompetitionActive: false,
	};

	const userDto: UserDto = {
		_id: 'test',
		email: 'test@test',
		isAdmin: false,
	};

	const mockHttpService: any = {
		get(url: string): Observable<UserDto> {
		  return of(userDto);
		},
		post(url: string, body: any): Observable<AuthResponse> {
			return of(validResponse);
		}
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [AuthRepository, {provide: HttpClient, useValue: mockHttpService}],
		});
		authRepository = TestBed.inject(AuthRepository);
	});

	it('should be created', () => {
		expect(authRepository).toBeTruthy();
	});

	describe('signIn', () => {
		it('should return an Observable<AuthResponse>', fakeAsync (() => {
			authRepository.signIn('test', 'test').subscribe((response: AuthResponse) => {
				expect(response).toEqual(validResponse);
			});
			flush();

		}));
	});

	describe('signInWithGithub', () => {
		it('should return an Observable<AuthResponse>', fakeAsync (() => {
			authRepository.signInByGithub('test', 'test').subscribe((response: AuthResponse) => {
				expect(response).toEqual(validResponse);
			});
			flush();

		}));
	});

	describe('signUp', () => {
		it('should return an Observable<AuthResponse>', fakeAsync (() => {
			authRepository.signUp('test', 'test').subscribe((response: AuthResponse) => {
				expect(response).toEqual(validResponse);
			});
			flush();
		}));
	});

	describe('LoadUser', () => {
		it('should return an Observable<UserDto>', fakeAsync (() => {
			authRepository.loadUser().subscribe((userDtoResponse: UserDto) => {
				expect(userDtoResponse).toEqual(userDto);
			});
			flush();

		}));
	});
});
