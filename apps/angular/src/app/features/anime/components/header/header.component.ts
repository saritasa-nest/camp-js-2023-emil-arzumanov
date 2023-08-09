import { Component, inject } from '@angular/core';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Header. */
@Component({
	selector: 'camp-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	private readonly authService = inject(AuthService);

	/** Check if user is logged in. */
	protected readonly isLoggedIn$ = this.authService.isLoggedIn$;

	/** Log out. */
	protected logout(): void {
		this.authService.logout();
	}
}
