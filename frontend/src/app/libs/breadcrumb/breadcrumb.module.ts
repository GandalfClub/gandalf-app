import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
	declarations: [
		BreadcrumbComponent
	],
	imports: [
		CommonModule,
		CommonComponentsModule,
		RouterModule,
	],
	exports: [
		BreadcrumbComponent
	]
})
export class BreadcrumbModule { }
