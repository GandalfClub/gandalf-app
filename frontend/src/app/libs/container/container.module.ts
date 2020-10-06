import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationsComponent } from './components/header/components/notifications/notifications.component';
import { LocalizationComponent } from './components/header/components/localization/localization.component';

@NgModule({
	declarations: [
		ContainerComponent,
		HeaderComponent,
		FooterComponent,
		NotificationsComponent,
		LocalizationComponent
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
