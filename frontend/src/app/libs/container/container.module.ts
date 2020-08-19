import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';

@NgModule({
	declarations: [
		ContainerComponent
	],
	imports: [
		CommonModule,
		ContainerStoreModule
	],
	exports: [
		ContainerComponent
	]
})
export class ContainerModule { }
