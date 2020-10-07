import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { ContainerStoreModule } from '../store/store.module';

import { ContainerFacadeService } from './container.facade';

describe('ContainerFacadeService', () => {
	let service: ContainerFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ AuthFacadeService ],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			]
		});
		service = TestBed.inject(ContainerFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
