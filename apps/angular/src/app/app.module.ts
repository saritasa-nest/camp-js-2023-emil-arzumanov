import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from '../core/interceptors/anime.interceptor';
import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, RouterModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }],
	bootstrap: [AppComponent],
})
export class AppModule {}
