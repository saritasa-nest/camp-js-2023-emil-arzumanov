import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

/** Authorization module. */
@NgModule({
	declarations: [AuthComponent, ProfileComponent, RegistrationComponent, LoginComponent],
	imports: [CommonModule, AuthRoutingModule, RouterModule, MatButtonModule],
	providers: [AuthComponent],
})
export class AuthModule {}
