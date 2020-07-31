import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthFacadeService } from './auth.facade';
import { authFeatureKey, authReducer } from './auth.reducer';

describe('Auth.FacadeService', () => {
	let service: AuthFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot({}),
				StoreModule.forFeature(authFeatureKey, authReducer),
			]});
		service = TestBed.inject(AuthFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
