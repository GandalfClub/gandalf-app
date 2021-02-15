import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RecaptchaFacadeService } from './recaptcha.facade';
import { RecaptchaState } from '../../models/recaptcha-state';
import { Recaptcha } from '../../models/recaptcha';
import { EntityStatus } from '../../../auth/models/entity-status';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { first } from 'rxjs/operators';
import { selectIsRecaptchaPassed } from './recaptcha.selectors';
import { MemoizedSelector } from '@ngrx/store';

describe('Recaptcha.FacadeService', () => {
	let mockStore: MockStore<RecaptchaState>;
	let mockUserSelector: MemoizedSelector<RecaptchaState, EntityWrapper<Recaptcha>>;
	let recaptchaFacadeService: RecaptchaFacadeService;
	const recaptcha: EntityWrapper<Recaptcha> = {
		status: EntityStatus.Success,
	};
	const initialState: RecaptchaState = { recaptcha };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RecaptchaFacadeService, provideMockStore({ initialState })],
		});
		recaptchaFacadeService = TestBed.inject(RecaptchaFacadeService);
		mockStore = TestBed.inject(MockStore);
		mockUserSelector = mockStore.overrideSelector(selectIsRecaptchaPassed, recaptcha);
	});

	it('should return isRecaptchaPassed', (done: Function) => {
		recaptchaFacadeService.isRecaptchaPassed$.pipe(first()).subscribe((result: EntityWrapper<Recaptcha>) => {
			expect(result).toEqual(recaptcha);
			done();
		});
	});
});
