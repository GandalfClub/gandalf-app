import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CreateDraftEventPopoverComponent } from './create-draft-event-popover/create-draft-event-popover.component';
import { EventTileComponent } from './components/event-tile/event-tile.component';
import { EventDateComponent } from './components/event-date/event-date.component';
import { EventTimeComponent } from './components/event-time/event-time.component';
import { ButtonComponent } from './components/button/button.component';
import { ScrollbarDirective } from './directives/scrollbar/scrollbar.directive';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';

@NgModule({
	declarations: [
		SlideToggleComponent,
		CreateDraftEventPopoverComponent,
		EventTileComponent,
		EventDateComponent,
		EventTimeComponent,
		ButtonComponent,
		ScrollbarDirective,
		RadioButtonComponent],
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		CommonModule,
		MatIconModule,
		MatTooltipModule,
		MatSlideToggleModule,
		FormsModule,
		MatCardModule,
		MatCheckboxModule,
		MatMenuModule,
		MatRadioModule
	],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		CommonModule,
		FormsModule,
		MatCardModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatRadioModule,
		MatTooltipModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		EventTileComponent,
		CreateDraftEventPopoverComponent,
		ButtonComponent,
		SlideToggleComponent,
		RadioButtonComponent,
		ScrollbarDirective],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
	]
})

export class CommonComponentsModule {}
