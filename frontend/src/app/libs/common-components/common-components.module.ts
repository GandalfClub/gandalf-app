import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EventTileComponent } from './components/event-tile/event-tile.component';
import { CommonModule } from '@angular/common';

@NgModule({
	exports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, EventTileComponent],
	imports: [ CommonModule ]
})
export class CommonComponentsModule {}
