import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnimePoster } from '@js-camp/core/models/anime-poster';

/** Poster popup. */
@Component({
	selector: 'camp-poster-popup',
	templateUrl: './poster-popup.component.html',
	styleUrls: ['./poster-popup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosterPopupComponent {
	/** Dialog reference. */
	protected readonly dialogRef = inject(DialogRef);

	/** Data from parent. */
	protected readonly parentData: AnimePoster = inject(DIALOG_DATA);
}
