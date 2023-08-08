import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SafePipe } from '@js-camp/angular/core/services/dom-sanitizer.service';
import { DialogModule } from '@angular/cdk/dialog';

import { TableComponent } from './table/table.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { DetailsComponent } from './details/details.component';
import { PosterPopupComponent } from './details/poster-popup/poster-popup.component';

/** Anime module. */
@NgModule({
	declarations: [TableComponent, DetailsComponent, SafePipe, PosterPopupComponent],
	imports: [
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		RouterModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatSortModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		AnimeRoutingModule,
		MatCardModule,
		DialogModule,
	],
	providers: [AnimeService],
})
export class AnimeModule {}
