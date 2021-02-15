import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RecaptchaRepository } from './recaptcha-repository.service';
import { RecaptchaResponse } from '../models/recaptcha-response';
import { Recaptcha } from '../models/recaptcha';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('RecaptchaService', () => {
	let recaptchaRepository: RecaptchaRepository;

	const recaptcha: Recaptcha = {
		isRecaptchaPassed: true
	};

	const validResponse: Recaptcha = {
		isRecaptchaPassed: true
	};

	const mockHttpService: any = {
		get(url: string): Observable<Recaptcha> {
		  return of(recaptcha);
		},
		post(url: string, body: any): Observable<Recaptcha> {
			return of(validResponse);
		}
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [RecaptchaRepository, {provide: HttpClient, useValue: mockHttpService}],
		});
		recaptchaRepository = TestBed.inject(RecaptchaRepository);
	});

	it('should be created', () => {
		expect(recaptchaRepository).toBeTruthy();
	});

	describe('signIn', () => {
		it('should return an Observable<Recaptcha>', fakeAsync (() => {
			recaptchaRepository.getRecaptchaStatus('test').subscribe((response: Recaptcha) => {
				expect(response).toEqual(validResponse);
			});
			flush();

		}));
	});

});
