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
import { AuthInterceptor } from '@js-camp/angular/core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from '@js-camp/angular/core/interceptors/refresh-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TableComponent } from './table/table.component';
import { AnimeRoutingModule } from './anime-routing.module';

/** Anime module. */
@NgModule({
	declarations: [TableComponent],
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
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
		AnimeService,
	],
})
export class AnimeModule {}
