import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from './libs/common-components/common-components.module';
import { ContainerModule } from './libs/container/container.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CodejarComponent } from './libs/code-editors/codejar-editor/codejar.component';
import { AuthModule } from './libs/auth/auth.module';

@NgModule({
<<<<<<< HEAD
<<<<<<< HEAD
	declarations: [AppComponent, CodejarComponent],
=======
	declarations: [AppComponent, CodejarComponent, LoginComponent],
>>>>>>> feat(gandalf/frontend): component user-profile, store added
=======
	declarations: [AppComponent, CodejarComponent, LoginComponent],
>>>>>>> 121488751ca070a866424e212c153f9d77227fa6
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CommonComponentsModule,
		ContainerModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		AuthModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
