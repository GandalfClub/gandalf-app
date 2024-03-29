import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CommonComponentsModule } from '../common-components/common-components.module';

import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { EventsStoreModule } from './store/store.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/events-page/events-page.component';
import { PublicEventsListComponent } from './components/events-page/components/public-events-list/public-events-list.component';
import { EventComponent } from './components/event/event.component';
import { UserEventsListComponent } from './components/events-page/components/user-events-list/user-events-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { BelongedToUserEventsComponent } from './components/events-page/components/belonged-to-user-events/belonged-to-user-events.component';

@NgModule({
	declarations: [
		PublicEventsListComponent,
		EventComponent,
		LandingPageComponent,
		UserEventsListComponent,
		EventListComponent,
		BelongedToUserEventsComponent
	],
	imports: [CommonComponentsModule, CommonModule, EventsStoreModule, TranslateModule],
	exports: [LandingRoutingModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class LandingModule { }
