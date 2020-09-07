import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDescriptionRoutingModule } from './event-description-routing.module';
import { EventStoreModule } from './store/store.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventComponent } from './components/event/event.component';
import { EventDescriptionPanelComponent } from './components/event-description-panel/event-description-panel.component';

@NgModule({
	declarations: [EventComponent, EventDescriptionPanelComponent],
	imports: [CommonModule, CommonComponentsModule, EventDescriptionRoutingModule, EventStoreModule],
})
export class EventDescriptionModule {}