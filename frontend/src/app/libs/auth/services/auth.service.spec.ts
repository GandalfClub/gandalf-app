import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthRepository } from './auth.service';

describe('AuthService', () => {
	let service: AuthRepository;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthRepository);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
