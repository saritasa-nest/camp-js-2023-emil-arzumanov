import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** User profile. */
@Component({
	selector: 'camp-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
	private readonly authService = inject(AuthService);

	/** Log out and redirect to anime. */
	protected logout(): void {
		this.authService.logout();
	}
}
