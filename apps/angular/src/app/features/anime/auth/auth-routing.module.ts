import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'registration', component: RegistrationComponent },
	{ path: 'profile', component: ProfileComponent },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AuthRoutingModule {}
