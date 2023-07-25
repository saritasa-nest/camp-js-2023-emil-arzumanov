import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TableComponent } from './table/table.component';

/** Anime module. */
@NgModule({
	declarations: [TableComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MatTableModule,
		MatPaginatorModule,
		RouterModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		NgFor,
		MatSortModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
	],
	providers: [AnimeService],
})
export class AnimeModule {}
