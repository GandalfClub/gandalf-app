import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SampleEffects } from './sample.effects';

describe('SampleEffects', () => {
	const actions$: Observable<any> = new Observable<any>();
	let effects: SampleEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SampleEffects,
				provideMockActions(() => actions$)
			]
		});

		effects = TestBed.inject(SampleEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
