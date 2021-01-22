import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { BreadcrumbState } from './breadcrumb.reducer';
import { breadcrumbFeatureKey } from './store.module';

export const selectBreadcrumb: MemoizedSelector<{}, BreadcrumbState> = createFeatureSelector<BreadcrumbState>(breadcrumbFeatureKey);

export const selectLastValueBreadcrumb: MemoizedSelector<{}, string> = createSelector(selectBreadcrumb,
	(state: BreadcrumbState) => state.label);
