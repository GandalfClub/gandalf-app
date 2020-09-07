import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventTileComponent } from './components/event-tile/event-tile.component';
import { CommonModule } from '@angular/common';
import { EventDateComponent } from './components/event-date/event-date.component';
import { EventTimeComponent } from './components/event-time/event-time.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
	declarations: [EventTileComponent, EventDateComponent, EventTimeComponent],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		ReactiveFormsModule,
		MatTooltipModule,
		EventTileComponent,
		MatSlideToggleModule,
		FormsModule,
	],
	imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule],
})
export class CommonComponentsModule {}
