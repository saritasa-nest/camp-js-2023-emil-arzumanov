import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@js-camp/angular/core/services/auth-guard.service';

import { TableComponent } from './table/table.component';
import { AnimeDetailsComponent } from './details/details.component';

const routes: Routes = [
	{
		path: 'table',
		component: TableComponent,
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
