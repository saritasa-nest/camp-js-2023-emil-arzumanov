import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

import { TableComponent } from './features/anime/table/table.component';

const routes: Routes = [
	{ path: 'anime/table', component: TableComponent },
	{ path: '', redirectTo: 'anime/table', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
