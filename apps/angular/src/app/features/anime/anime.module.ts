import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

import { TableComponent } from './table/table.component';

/** Anime module. */
@NgModule({
	declarations: [TableComponent],
	imports: [CommonModule, HttpClientModule, MatTableModule, MatPaginatorModule, RouterModule],
	providers: [AnimeService],
})
export class AnimeModule {}
