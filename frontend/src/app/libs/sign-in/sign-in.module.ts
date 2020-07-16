import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
	declarations: [SignInComponent],
	imports: [CommonModule, ReactiveFormsModule, SignInRoutingModule],
})
export class SignInModule {}
