import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { AuthGuard } from '@js-camp/angular/core/services/auth-guard.service';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PasswordFieldComponent } from './shared-components/password-field/password-field.component';

/** Authorization module. */
@NgModule({
	declarations: [AuthComponent, ProfileComponent, RegistrationComponent, LoginComponent, PasswordFieldComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		RouterModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
	],
	providers: [AuthService, AuthGuard],
})
export class AuthModule {}
