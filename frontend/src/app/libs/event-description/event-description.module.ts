import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDescriptionRoutingModule } from './event-description-routing.module';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { EventDescriptionStoreModule } from './store/store.module';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
	declarations: [EventDescriptionComponent],
	imports: [CommonModule, CommonComponentsModule, EventDescriptionRoutingModule, EventDescriptionStoreModule],
})
export class EventDescriptionModule {}
