import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RecaptchaRepository } from '../../services/recaptcha-repository.service';
import {
	RecaptchaActionTypes,
	GetRecaptchaStatus,
	GetRecaptchaStatusSuccess,
	GetRecaptchaStatusFailure } from './recaptcha.actions';
import { Observable, of, from } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Recaptcha } from '../../models/recaptcha';

@Injectable()
export class RecaptchaEffects {

	@Effect()
	public GetRecaptchaStatus: Observable<Action> = this.actions.pipe(
		ofType(RecaptchaActionTypes.GetRecaptchaStatus),
		map((action: GetRecaptchaStatus) => action.payload),
		exhaustMap((token: string) => this.recaptchaRepository
				.getRecaptchaStatus(token)
				.pipe(map((recaptcha: Recaptcha) => new GetRecaptchaStatusSuccess()))),
		catchError((error: Error) => of(new GetRecaptchaStatusFailure(error)))
	);

	constructor(
		private actions: Actions,
		private recaptchaRepository: RecaptchaRepository,
	) {}
}
