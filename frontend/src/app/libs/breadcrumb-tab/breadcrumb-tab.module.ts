import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbTabComponent } from './breadcrumb-tab.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
	declarations: [
		BreadcrumbTabComponent
	],
	imports: [
		CommonModule,
		CommonComponentsModule,
		BreadcrumbModule
	],
	exports: [
		BreadcrumbTabComponent
	]
})
export class BreadcrumbTabModule { }
