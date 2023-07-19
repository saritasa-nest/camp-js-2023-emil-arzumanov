/* eslint-disable jsdoc/require-jsdoc */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table/table.component';
import { AnimeComponent } from './anime.component';

@NgModule({
	declarations: [TableComponent, AnimeComponent],
	imports: [CommonModule, HttpClientModule, MatTableModule, DatePipe],
	providers: [AnimeService],
})
export class AnimeModule {}
