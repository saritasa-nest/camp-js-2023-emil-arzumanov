import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './features/anime/table/table.component';

const routes: Routes = [
	{ path: '', redirectTo: '/table', pathMatch: 'full' },
	{ path: 'table', component: TableComponent },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
