import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: 'anime',
		loadChildren: () => import('./features/anime/anime.module').then(module => module.AnimeModule),
	},
	{
		path: 'home',
		loadChildren: () => import('./features/auth/auth.module').then(module => module.AuthModule),
	},
	{ path: '', redirectTo: 'anime', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
