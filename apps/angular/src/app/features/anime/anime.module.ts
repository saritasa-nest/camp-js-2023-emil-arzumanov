import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { PosterPopupComponent } from './components/poster-popup/poster-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { AnimeEditComponent } from './anime-managers/anime-edit/anime-edit.component';
import { AnimeCreateComponent } from './anime-managers/anime-create/anime-create.component';
import { AnimeFormComponent } from './anime-managers/anime-form/anime-form.component';
import { ChipsFormFieldComponent } from './components/chips-form-field/chips-form-field.component';

/** Anime module. */
@NgModule({
	declarations: [
		AnimeTableComponent,
		AnimeDetailsComponent,
		SafePipe,
		PosterPopupComponent,
		HeaderComponent,
		ConfirmDeleteComponent,
		AnimeEditComponent,
		AnimeCreateComponent,
		AnimeFormComponent,
		ChipsFormFieldComponent,
	],
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
		MatDatepickerModule,
		MatNativeDateModule,
		MatCheckboxModule,
		MatAutocompleteModule,
		MatChipsModule,
	],
})
export class AnimeModule {}
