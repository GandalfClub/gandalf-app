import { SignInState } from './sign-in-page.reducer';
import { MemoizedSelector, createSelector } from '@ngrx/store';

export interface MyState {
	signInPage: SignInState;
  }

export interface AllState {
	sample: MyState;
  }

  // tslint:disable-next-line: typedef
export const selectMyFeature = (state: AllState) => state.sample.signInPage;

export const selectHideHeader: MemoizedSelector<{}, boolean>
	= createSelector(selectMyFeature, (state: SignInState) =>  state.hideHeader);
export const selectHideFooter: MemoizedSelector<{}, boolean>
	= createSelector(selectMyFeature, (state: SignInState) => state.hideFooter);
