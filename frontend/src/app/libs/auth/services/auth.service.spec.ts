import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthRepository } from './auth.service';

describe('AuthService', () => {
	let service: AuthRepository;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [
				HttpClientModule,
			]
		});
		service = TestBed.inject(AuthRepository);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
