import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { LandingRoutingModule } from './landing-routing.module';
import { EventComponent } from './components/event/event.component';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { EventsStoreModule } from './store/store.module';
import { PublicEventsListComponent } from './components/public-events-list/public-events-list.component';

@NgModule({
	declarations: [PublicEventsListComponent, EventComponent],
	imports: [CommonComponentsModule, CommonModule, EventsStoreModule],
	exports: [LandingRoutingModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class LandingModule {}