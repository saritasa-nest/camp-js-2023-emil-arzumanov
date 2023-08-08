import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { Observable } from 'rxjs';

import { PosterPopupComponent } from './poster-popup/poster-popup.component';

/** Details of anime. */
@Component({
	selector: 'camp-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly authService = inject(AuthService);

	private readonly animeService = inject(AnimeService);

	private readonly animeId: number;

	/** List of anime. */
	protected readonly animeDetails$: Observable<AnimeDetails>;

	public constructor() {
		this.animeId = this.getIdFromParams();

		this.animeDetails$ = this.animeService.getAnimeDetails(this.animeId);
	}

	private getIdFromParams(): number {
		const params = { ...this.route.snapshot.params };
		return params['id'];
	}

	/** Log out and redirect to anime. */
	protected logout(): void {
		this.authService.logout();
		this.router.navigate(['/anime/table']);
	}

	/** Dialog. */
	protected readonly dialog = inject(Dialog);

	/**
		* Opens poster popup.
		* @param posterUrl Poster url.
		*/
	protected openPosterPopup(posterUrl: string): void {
		this.dialog.open(PosterPopupComponent, {
			data: { posterUrl },
		});
	}
}
