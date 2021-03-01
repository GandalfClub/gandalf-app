import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDescriptionRoutingModule } from './event-description-routing.module';
import { EventStoreModule } from './store/store.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventComponent } from './components/event/event.component';
import { EventDescriptionPanelComponent } from './components/event-description-panel/event-description-panel.component';
import { SafeHtmlPipe } from '../pipes/sanitizer.pipe';
import { BreadcrumbStoreModule } from '../common-components/components/breadcrumb/store/store.module';
import { BreadcrumbModule } from '../common-components/components/breadcrumb/breadcrumb.module';
import { EventParticipationControlComponent } from './components/event-participation-control/event-participation-control.component';

@NgModule({
	declarations: [EventComponent, EventDescriptionPanelComponent, SafeHtmlPipe, EventParticipationControlComponent],
	imports: [CommonModule, CommonComponentsModule, EventDescriptionRoutingModule, EventStoreModule, BreadcrumbStoreModule, BreadcrumbModule],
})
export class EventDescriptionModule {}
