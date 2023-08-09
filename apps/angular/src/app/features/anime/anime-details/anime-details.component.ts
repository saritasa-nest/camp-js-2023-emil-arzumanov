import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimePoster } from '@js-camp/core/models/anime-poster';
import { ConfirmAnimeDelete } from '@js-camp/core/models/anime-delete-confirm';
import { switchMap } from 'rxjs';

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

	private readonly animeService = inject(AnimeService);

	/** List of anime. */
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
