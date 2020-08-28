import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { doesNotReject } from 'assert';

describe('AuthInterceptor', () => {
	let httpMock: HttpTestingController;
	let httpClient: HttpClient;
	let interceptor: AuthInterceptor;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				HttpClient,
				AuthInterceptor,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: AuthInterceptor,
					multi: true,
				},
			],
		});

		httpClient = TestBed.inject(HttpClient);
		httpMock = TestBed.inject(HttpTestingController);
		interceptor = TestBed.inject(AuthInterceptor);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should set Content-Type header to application/json', () => {
		httpClient.post('/test', {}).subscribe((response: any) => {
			expect(response).toBeTruthy();
		});
		const httpRequest: TestRequest = httpMock.expectOne('/test');
		expect(httpRequest.request.headers.get('content-type')).toBe('application/json');
	});
});
