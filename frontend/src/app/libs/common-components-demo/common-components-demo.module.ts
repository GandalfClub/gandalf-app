import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsDemoRoutingModule } from './common-components-demo-routing.module';
import { CommonComponentsDemoComponent } from './common-components-demo.component';
import { DemoStateComponent } from './demo-state/demo-state.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventTileDemoComponent } from './event-tile-demo/event-tile-demo.component';
import { DemoGroupComponent } from './demo-group/demo-group.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { SlideToggleDemoComponent } from './components/slide-toggle-demo/slide-toggle-demo.component';
import { PopoverDemoComponent } from './components/popover-demo/popover-demo.component';
import { ScrollbarDemoComponent } from './components/scrollbar-demo/scrollbar-demo.component';
import { RadioButtonDemoComponent } from './components/radio-button-demo/radio-button-demo.component';

@NgModule({
	declarations: [
		CommonComponentsDemoComponent,
		DemoGroupComponent,
		DemoStateComponent,
		EventTileDemoComponent,
		SlideToggleDemoComponent,
		ButtonDemoComponent,
		ScrollbarDemoComponent,
		PopoverDemoComponent,
		RadioButtonDemoComponent],
	imports: [
		CommonModule,
		CommonComponentsDemoRoutingModule,
		CommonComponentsModule,
	],
	exports: [CommonComponentsDemoRoutingModule],
})
export class CommonComponentsDemoModule {}
