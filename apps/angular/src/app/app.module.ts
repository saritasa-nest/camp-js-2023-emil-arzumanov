import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '@js-camp/angular/core/services/auth-guard.service';

import { ApiKeyInterceptor } from '../core/interceptors/anime.interceptor';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from '../core/interceptors/refresh-token.interceptor';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, RouterModule, HttpClientModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		AuthGuard,
		AuthService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
