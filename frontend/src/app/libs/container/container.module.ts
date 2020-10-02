import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { NonAuthComponent } from './components/user-actions/non-auth/non-auth.component';
import { ParticipantComponent } from './components/user-actions/participant/participant.component';
import { MentorComponent } from './components/user-actions/mentor/mentor.component';
import { HrComponent } from './components/user-actions/hr/hr.component';
import { EventManagerComponent } from './components/user-actions/event-manager/event-manager.component';
import { AdminComponent } from './components/user-actions/admin/admin.component';
import { AvatarMenuComponent } from './components/avatar-menu/avatar-menu.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
	declarations: [
		ContainerComponent,
		HeaderComponent,
		FooterComponent,
		LogoComponent,
		NonAuthComponent,
		ParticipantComponent,
		MentorComponent,
		HrComponent,
		EventManagerComponent,
		AdminComponent,
		AvatarMenuComponent,
		LanguageSelectorComponent
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
