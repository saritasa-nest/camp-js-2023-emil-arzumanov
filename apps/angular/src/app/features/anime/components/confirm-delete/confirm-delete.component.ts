import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ConfirmAnimeDelete } from '@js-camp/core/models/anime-delete-confirm';

/** Confirm anime delete. */
@Component({
	selector: 'camp-confirm-delete',
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent {

	/** Dialog reference. */
	protected readonly dialogRef = inject(DialogRef);

	/** Data from parent. */
	protected readonly parentData = inject<ConfirmAnimeDelete>(DIALOG_DATA);
}
