import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { RecaptchaEffects } from './recaptcha.effects';
import { RecaptchaRepository } from '../../services/recaptcha-repository.service';
import { Recaptcha } from '../../models/recaptcha';
import {
	GetRecaptchaStatus,
	GetRecaptchaStatusSuccess,
	GetRecaptchaStatusFailure
} from './recaptcha.actions';
import { cold, hot } from 'jasmine-marbles';
import { auth } from 'firebase';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../helpers/createSpy';
import { RecaptchaDto } from '../../models/recaptcha-dto';
import { RecaptchaResponse } from '../../models/recaptcha-response';
import { RecaptchaFacadeService } from './recaptcha.facade';

describe('Recaptcha Effects', () => {
	let mockRecaptchaRepository: jasmine.SpyObj<RecaptchaRepository>;
	let recaptchaFacade: jasmine.SpyObj<RecaptchaFacadeService>;

	recaptchaFacade = null;

	function createEffects(source: Observable<Action>): RecaptchaEffects {
		return new RecaptchaEffects(new Actions(source), mockRecaptchaRepository);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: RecaptchaRepository,
					useValue: createSpy(RecaptchaRepository.prototype),
				},
			],
		});

		mockRecaptchaRepository = TestBed.inject(RecaptchaRepository) as jasmine.SpyObj<RecaptchaRepository>;
	});

	describe('GetRecaptchaStatus', () => {
		const recaptcha: Recaptcha = {
			isRecaptchaPassed: true
		};

		const token = {
			token: 'testToken'
		};

		const error: Error = new Error('error') as any;

		describe('when recaptcha was successful', () => {
			it('should emit GetRecaptchaStatusSuccess action', () => {
				mockRecaptchaRepository.getRecaptchaStatus.and.returnValue(of(recaptcha));
				const actions: Observable<Action> = hot('-a-|', { a: new GetRecaptchaStatus(token) });
				const expected: Observable<Action> = cold('-s-|', {
					s: new GetRecaptchaStatusSuccess(),
				});
				expect(createEffects(actions).GetRecaptchaStatus).toBeObservable(expected);
			});
		});

		describe('when recaptcha failed', () => {
			it('should emit GetRecaptchaStatusFailure action', () => {
				mockRecaptchaRepository.getRecaptchaStatus.and.throwError(error);
				const actions: Observable<Action> = hot('--a|', { a: new GetRecaptchaStatus(token) });
				const expected: Observable<Action> = cold('--(f|)', { f: new GetRecaptchaStatusFailure(error) });
				expect(createEffects(actions).GetRecaptchaStatus).toBeObservable(expected);
			});
		});
	});

});
