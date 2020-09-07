import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsDemoRoutingModule } from './common-components-demo-routing.module';
import { CommonComponentsDemoComponent } from './common-components-demo.component';
import { ComponentsDemoGroupComponent } from './components-demo-group/components-demo-group.component';
import { ComponentDemoComponent } from './component-demo/component-demo.component';
import { EventTileComponent } from '../common-components/components/event-tile/event-tile.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
	declarations: [CommonComponentsDemoComponent, ComponentsDemoGroupComponent, ComponentDemoComponent],
	imports: [
		CommonModule,
		CommonComponentsDemoRoutingModule,
		CommonComponentsModule
	],
	exports: [CommonComponentsDemoRoutingModule]
})
export class CommonComponentsDemoModule { }
