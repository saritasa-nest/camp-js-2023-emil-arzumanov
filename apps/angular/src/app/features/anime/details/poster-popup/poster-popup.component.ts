import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

/** Poster popup. */
@Component({
	selector: 'camp-poster-popup',
	templateUrl: './poster-popup.component.html',
	styleUrls: ['./poster-popup.component.css'],
})
export class PosterPopupComponent {
	/** Dialog reference. */
	protected readonly dialogRef = inject(DialogRef);

	/** Data from parent. */
	protected readonly parentData: { posterUrl: string; } = inject(DIALOG_DATA);
}
