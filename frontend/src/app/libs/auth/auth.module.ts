import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthStoreModule } from './store/store.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		AuthStoreModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class AuthModule { }
