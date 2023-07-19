import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AnimeInterceptor } from '@js-camp/angular/core/interceptors/anime.interceptor';

import { TableComponent } from './table/table.component';

/** Anime module. */
@NgModule({
	declarations: [TableComponent],
	imports: [CommonModule, HttpClientModule, MatTableModule, DatePipe],
	providers: [AnimeService, { provide: HTTP_INTERCEPTORS, useClass: AnimeInterceptor, multi: true }],
})
export class AnimeModule {}
