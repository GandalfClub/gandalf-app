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
import { ProgressBarDemoComponent } from './components/progress-bar-demo/progress-bar-demo.component';

@NgModule({
	declarations: [
		CommonComponentsDemoComponent,
		DemoGroupComponent,
		DemoStateComponent,
		EventTileDemoComponent,
		SlideToggleDemoComponent,
		ButtonDemoComponent,
		ProgressBarDemoComponent],
	imports: [
		CommonModule,
		CommonComponentsDemoRoutingModule,
		CommonComponentsModule
	],
	exports: [CommonComponentsDemoRoutingModule]
})
export class CommonComponentsDemoModule { }
