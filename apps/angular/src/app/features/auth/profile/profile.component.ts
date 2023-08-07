import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** User profile. */
@Component({
	selector: 'camp-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	/** Log out and redirect to anime. */
	protected logout(): void {
		this.authService.logout();
		this.router.navigate(['/anime/table']);
	}
}
