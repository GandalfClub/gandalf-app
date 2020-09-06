import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EventPooverComponent } from './event-poover/event-poover.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [EventPooverComponent],
	imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
	exports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatDialogModule, EventPooverComponent],
})
export class CommonComponentsModule {}
