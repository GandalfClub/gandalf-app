import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContainerStoreModule } from '../store/store.module';
import { ContainerFacadeService } from './container-facade.service';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ ContainerFacadeService ],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			]
	});
		service = TestBed.inject(UserService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
