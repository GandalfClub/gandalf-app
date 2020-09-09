import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateDraftEventPopoverComponent } from './create-draft-event-popover/create-draft-event-popover.component';
import { EventTileComponent } from './components/event-tile/event-tile.component';
import { CommonModule } from '@angular/common';
import { EventDateComponent } from './components/event-date/event-date.component';
import { EventTimeComponent } from './components/event-time/event-time.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
	declarations: [CreateDraftEventPopoverComponent, EventTileComponent, EventDateComponent, EventTimeComponent],
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		CommonModule,
		MatIconModule,
		MatTooltipModule,
		MatMenuModule,
		MatSlideToggleModule,
		FormsModule,
	],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTooltipModule,
		EventTileComponent,
		CreateDraftEventPopoverComponent,
		MatSlideToggleModule,
		FormsModule,
	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {},
		},
	],
})
export class CommonComponentsModule {}
