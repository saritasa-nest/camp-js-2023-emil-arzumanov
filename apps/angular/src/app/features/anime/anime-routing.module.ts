import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@js-camp/angular/core/services/auth-guard.service';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { AnimeEditComponent } from './anime-managers/anime-edit/anime-edit.component';
import { AnimeCreateComponent } from './anime-managers/anime-create/anime-create.component';

const routes: Routes = [
	{
		path: 'table',
		component: AnimeTableComponent,
	},
	{
		path: 'details/:id',
		component: AnimeDetailsComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AnimeEditComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'create',
		component: AnimeCreateComponent,
		canActivate: [AuthGuard],
	},
	{ path: '', redirectTo: 'table', pathMatch: 'full' },
];

/** Auth routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
