import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { EventStoreModule } from './store/store.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventComponent } from './components/event/event.component';

@NgModule({
	declarations: [EventComponent, EventDescriptionComponent],
	imports: [CommonModule, CommonComponentsModule, EventRoutingModule, EventStoreModule],
})
export class EventModule {}
