import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsDemoRoutingModule } from './common-components-demo-routing.module';
import { CommonComponentsDemoComponent } from './common-components-demo.component';
import { DemoStateComponent } from './demo-state/demo-state.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { DemoGroupComponent } from './demo-group/demo-group.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { SlideToggleDemoComponent } from './components/slide-toggle-demo/slide-toggle-demo.component';
import { InputDemoComponent } from './components/input-demo/input-demo.component';
import { ProgressBarDemoComponent } from './components/progress-bar-demo/progress-bar-demo.component';

import { PopoverDemoComponent } from './components/popover-demo/popover-demo.component';
import { ScrollbarDemoComponent } from './components/scrollbar-demo/scrollbar-demo.component';
import { RadioGroupDemoComponent } from './components/radio-group-demo/radio-group-demo.component';
import { TypographyDemoComponent } from './components/typography-demo/typography-demo.component';
import { TabsDemoComponent } from './components/tabs-demo/tabs-demo.component';
import { TagDemoComponent } from './components/tag-demo/tag-demo.component';
import { EventCardDemoComponent } from './components/event-card-demo/event-card-demo.component';

@NgModule({
	declarations: [
		CommonComponentsDemoComponent,
		DemoGroupComponent,
		DemoStateComponent,
		SlideToggleDemoComponent,
		ButtonDemoComponent,
		InputDemoComponent,
		ProgressBarDemoComponent,
		ScrollbarDemoComponent,
		PopoverDemoComponent,
		RadioGroupDemoComponent,
		TypographyDemoComponent,
		TabsDemoComponent,
		TagDemoComponent,
		EventCardDemoComponent],
	imports: [
		CommonModule,
		CommonComponentsDemoRoutingModule,
		CommonComponentsModule
	],
	exports: [CommonComponentsDemoRoutingModule],
})
export class CommonComponentsDemoModule {}
