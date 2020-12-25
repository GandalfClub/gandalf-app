import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { breadcrumbReducer } from './breadcrumb.reducer';


export const breadcrumbFeatureKey: string = 'breadcrumb';

@NgModule({
	imports: [StoreModule.forFeature(breadcrumbFeatureKey, breadcrumbReducer)],
})
export class BreadcrumbStoreModule {}