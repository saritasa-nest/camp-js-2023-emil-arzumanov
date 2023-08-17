import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimePoster } from '@js-camp/core/models/anime-poster';
import { ConfirmAnimeDelete } from '@js-camp/core/models/anime-delete-confirm';
import { switchMap, tap } from 'rxjs';
import { trackById } from '@js-camp/angular/core/utils/track-by.util';

import { PosterPopupComponent } from '../components/poster-popup/poster-popup.component';
import { ConfirmDeleteComponent } from '../components/confirm-delete/confirm-delete.component';

/** Details of anime. */
@Component({
	selector: 'camp-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeService = inject(AnimeService);

	/** Anime details. */
	protected readonly animeDetails$ = this.route.params.pipe(
		switchMap(params => this.animeService.getAnimeDetails(params['id'])),
	);

	private readonly dialog = inject(Dialog);

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
	 * Opens anime delete confirm.
	 * @param animeId Id of anime.
	 */
	protected openDeleteConfirm(animeId: number): void {
		this.dialog.open<ConfirmDeleteComponent, ConfirmAnimeDelete>(ConfirmDeleteComponent, {
			data: { animeId },
		}).closed.pipe(
			tap(isClosed => {
				if (isClosed) {
					this.animeService.deleteAnimeById(animeId)
						.subscribe(() => this.router.navigate(['/anime/table']));
				}
			}),
		).subscribe();
	}

	/** Track by id. */
	protected readonly trackById = trackById;
}
