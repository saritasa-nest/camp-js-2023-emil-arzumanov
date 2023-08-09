import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@js-camp/angular/core/services/auth-guard.service';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';

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
	{ path: '', redirectTo: 'table', pathMatch: 'full' },
];

/** Auth routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
