import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsDemoRoutingModule } from './common-components-demo-routing.module';
import { CommonComponentsDemoComponent } from './common-components-demo.component';
import { ComponentsDemoGroupComponent } from './components-demo-group/components-demo-group.component';
import { ComponentDemoRowComponent } from './component-demo-row/component-demo-row.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventTileDemoComponent } from './event-tile-demo/event-tile-demo.component';

@NgModule({
	declarations: [CommonComponentsDemoComponent, ComponentsDemoGroupComponent, ComponentDemoRowComponent, EventTileDemoComponent],
	imports: [
		CommonModule,
		CommonComponentsDemoRoutingModule,
		CommonComponentsModule
	],
	exports: [CommonComponentsDemoRoutingModule]
})
export class CommonComponentsDemoModule { }
