import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [],
	exports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatTooltipModule],
})
export class CommonComponentsModule {}
