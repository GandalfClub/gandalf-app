import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetRecaptchaStatus } from './recaptcha.actions';
import { Observable } from 'rxjs';
import { selectIsRecaptchaPassed } from './recaptcha.selectors';
import { RecaptchaState } from '../../models/recaptcha-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { Recaptcha } from '../../models/recaptcha';

@Injectable({
	providedIn: 'root',
})
export class RecaptchaFacadeService {
	constructor(private store: Store<RecaptchaState>) {}

	public getRecaptchaStatus(token: string): void {
		this.store.dispatch(new GetRecaptchaStatus(token));
	}

	get isRecaptchaPassed$(): Observable<EntityWrapper<Recaptcha>> {
		return this.store.pipe(select(selectIsRecaptchaPassed));
	}
}
