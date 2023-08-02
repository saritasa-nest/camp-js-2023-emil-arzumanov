import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@js-camp/angular/core/services/auth-guard.service';
import { LoggedAuthGuard } from '@js-camp/angular/core/services/logged-auth-guard.service';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoggedAuthGuard],
	},
	{
		path: 'registration',
		component: RegistrationComponent,
		canActivate: [LoggedAuthGuard],
	},
	{ path: '', redirectTo: 'profile', pathMatch: 'full' },
];

/** Auth routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
