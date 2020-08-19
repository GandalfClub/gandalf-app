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
import { LoginComponent } from './libs/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './libs/auth/auth.module';

@NgModule({
	declarations: [AppComponent, CodejarComponent, LoginComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CommonComponentsModule,
		ContainerModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		FormsModule,
		AuthModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
