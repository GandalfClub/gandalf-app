import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AvatarComponent } from './components/header/components/avatar/avatar.component';
import { NotificationsComponent } from './components/header/components/notifications/notifications.component';
import { LocalizationModule } from './components/localization/localization.module';
import { NewEventStoreModule } from '../event-creation/store/store.module';

@NgModule({
	declarations: [
		ContainerComponent,
		HeaderComponent,
		FooterComponent,
		NotificationsComponent,
		AvatarComponent
	],
	imports: [
		CommonComponentsModule,
		CommonModule,
		ContainerStoreModule,
		RouterModule,
		LocalizationModule,
		NewEventStoreModule
	],
	exports: [
		ContainerComponent
	]
})
export class ContainerModule { }
