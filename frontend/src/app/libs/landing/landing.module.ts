import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { LandingRoutingModule } from './landing-routing.module';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { EventsStoreModule } from './store/store.module';

@NgModule({
	declarations: [EventsComponent, EventComponent],
	imports: [CommonComponentsModule, CommonModule, EventsStoreModule],
	exports: [LandingRoutingModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class LandingModule {}
