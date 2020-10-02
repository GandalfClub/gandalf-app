import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, NgModel } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';


@NgModule({
	declarations: [],
	exports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatMenuModule, MatSelectModule, MatCardModule, MatBadgeModule, MatToolbarModule, FormsModule, AvatarModule],
})
export class CommonComponentsModule { }
