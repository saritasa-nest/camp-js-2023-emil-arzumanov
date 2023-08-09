import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { AnimePoster } from '@js-camp/core/models/anime-poster';

import { PosterPopupComponent } from './poster-popup/poster-popup.component';

/** Details of anime. */
@Component({
	selector: 'camp-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly authService = inject(AuthService);

	private readonly animeService = inject(AnimeService);

	private readonly animeId = this.route.snapshot.params['id'];

	private readonly dialog = inject(Dialog);

	/** List of anime. */
	protected readonly animeDetails$ = this.animeService.getAnimeDetails(this.animeId);

	private getIdFromParams(): number {
		const { id } = this.route.snapshot.params;
		return id;
	}

	/** Log out and redirect to anime. */
	protected logout(): void {
		this.authService.logout();
		this.router.navigate(['/anime/table']);
	}

	/**
	 * Opens poster popup.
	 * @param posterUrl Poster url.
	 */
	protected openPosterPopup(posterUrl: string): void {
		this.dialog.open<PosterPopupComponent, AnimePoster>(PosterPopupComponent, {
			data: { posterUrl },
		});
	}

	/**
	 * Track by item id.
	 * @param index Index.
	 * @param item Item.
	 */
	protected trackById<T extends { id: number; }>(index: number, item: T): number {
		return item.id;
	}
}
