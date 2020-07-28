import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthStoreModule } from './store/store.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		AuthStoreModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
	]
})
export class AuthModule { }
