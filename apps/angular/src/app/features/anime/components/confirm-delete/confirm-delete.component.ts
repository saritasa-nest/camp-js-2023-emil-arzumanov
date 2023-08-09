import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { ConfirmAnimeDelete } from '@js-camp/core/models/anime-delete-confirm';

/** Confirm anime delete. */
@Component({
	selector: 'camp-confirm-delete',
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent {
	private readonly animeService = inject(AnimeService);

	private readonly router = inject(Router);

	/** Close confirm, delete anime and redirect to anime table. */
	protected closeDeleteAndRedirect(): void {
		this.dialogRef.close();
		this.animeService.deleteAnimeById(this.parentData.animeId)
			.subscribe(() => this.router.navigate(['/anime/table']));
	}

	/** Dialog reference. */
	protected readonly dialogRef = inject(DialogRef);

	/** Data from parent. */
	protected readonly parentData = inject<ConfirmAnimeDelete>(DIALOG_DATA);
}
