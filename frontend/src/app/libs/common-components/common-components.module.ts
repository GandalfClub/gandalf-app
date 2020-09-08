import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateDraftEventPopoverComponent } from './create-draft-event-popover/create-draft-event-popover.component';

@NgModule({
	declarations: [CreateDraftEventPopoverComponent],
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		ReactiveFormsModule,
		MatDialogModule,
		CreateDraftEventPopoverComponent],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
	]
})
export class CommonComponentsModule {}
