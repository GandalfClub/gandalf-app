import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { LandingRoutingModule } from './landing-routing.module';
import { EventsComponent } from './components/events/events.component';
import { EventsStoreModule } from './store/store.module';

@NgModule({
	declarations: [EventsComponent],
	imports: [CommonComponentsModule, CommonModule, EventsStoreModule],
	exports: [LandingRoutingModule],
})
export class LandingModule {}
