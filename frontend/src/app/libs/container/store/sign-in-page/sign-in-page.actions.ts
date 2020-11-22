import { Action } from '@ngrx/store';

export enum SignInPageActionTypes {
	HideHeaderAndFooter = '[SIGN-IN-PAGE] Hide Header and Footer',
}

export class HideHeaderAndFooter implements Action {
	public readonly type: SignInPageActionTypes = SignInPageActionTypes.HideHeaderAndFooter;
}
