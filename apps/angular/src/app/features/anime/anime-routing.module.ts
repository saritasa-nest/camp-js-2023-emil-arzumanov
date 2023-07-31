import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './table/table.component';

const routes: Routes = [
	{ path: 'table', component: TableComponent },
	{ path: '', redirectTo: 'table', pathMatch: 'full' },
];

/** Auth routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
