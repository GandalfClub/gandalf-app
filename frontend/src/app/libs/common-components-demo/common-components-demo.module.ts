import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsDemoRoutingModule } from './common-components-demo-routing.module';
import { CommonComponentsDemoComponent } from './common-components-demo.component';
import { DemoStateComponent } from './demo-state/demo-state.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventTileDemoComponent } from './event-tile-demo/event-tile-demo.component';
import { DemoGroupComponent } from './demo-group/demo-group.component';
import { SlideToggleDemoComponent } from './slide-toggle-demo/slide-toggle-demo.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';

@NgModule({
	declarations: [
		CommonComponentsDemoComponent,
		DemoGroupComponent,
		DemoStateComponent,
		EventTileDemoComponent,
		SlideToggleDemoComponent,
		ButtonDemoComponent],
	imports: [
		CommonModule,
		CommonComponentsDemoRoutingModule,
		CommonComponentsModule
	],
	exports: [CommonComponentsDemoRoutingModule]
})
export class CommonComponentsDemoModule { }
