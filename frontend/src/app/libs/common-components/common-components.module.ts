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
import { SlideToggleDemoComponent } from './demo/lib/slide-toggle-demo/slide-toggle-demo.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
	declarations: [
		SlideToggleComponent,
		SlideToggleDemoComponent],
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
		MatCardModule,
		MatCheckboxModule],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTooltipModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		SlideToggleDemoComponent],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
	]
})

export class CommonComponentsModule {}
