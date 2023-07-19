/* eslint-disable jsdoc/require-jsdoc */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { TableComponent } from './table/table.component';
import { AnimeComponent } from './anime.component';

@NgModule({
	declarations: [TableComponent, AnimeComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		NgIf,
		MatProgressSpinnerModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		DatePipe,
	],
	providers: [AnimeService],
})
export class AnimeModule {}
