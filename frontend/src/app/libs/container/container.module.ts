import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
	declarations: [
		ContainerComponent,
		HeaderComponent,
		FooterComponent,
		LogoComponent,
	],
	imports: [
		CommonComponentsModule,
		CommonModule,
		ContainerStoreModule,
		RouterModule
	],
	exports: [
		ContainerComponent
	]
})
export class ContainerModule { }
