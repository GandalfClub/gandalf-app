import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ContainerEffects } from './container.effects';

describe('ContainerEffects', () => {
	const actions$: Observable<any> = new Observable<any>();
	let effects: ContainerEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContainerEffects,
				provideMockActions(() => actions$)
			]
		});

		effects = TestBed.inject(ContainerEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
