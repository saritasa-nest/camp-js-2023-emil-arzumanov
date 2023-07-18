/* eslint-disable jsdoc/require-jsdoc */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { HttpClientModule } from '@angular/common/http';

import { TableComponent } from './table/table.component';

@NgModule({
	declarations: [TableComponent],
	imports: [CommonModule, HttpClientModule],
	providers: [AnimeService],
})
export class AnimeModule {}
