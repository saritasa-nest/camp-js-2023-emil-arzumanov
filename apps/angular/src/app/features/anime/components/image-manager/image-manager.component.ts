import { Component, inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { catchError, throwError } from 'rxjs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { CustomFormField } from '../custom-form-field/custom-form-field.component';

/** Image manager. */
@Component({
	selector: 'camp-image-manager',
	templateUrl: './image-manager.component.html',
	styleUrls: ['./image-manager.component.css'],
	providers: [{ provide: MatFormFieldControl, useExisting: ImageManagerComponent }],
})
export class ImageManagerComponent extends CustomFormField<string> {

	/** @inheritdoc */
	protected override checkValueIsEmpty(): boolean {
		return false;
	}

	private readonly animeService = inject(AnimeService);

	/** File store. */
	protected storedFile: File | null = null;

	/** File list. */
	protected fileList: string[] = [];

	/**
	 * Handle file input change.
	 * @param fileList File list.
	 */
	public handleFileInputChange(fileList: FileList | null): void {
		if (fileList === null) {
			return;
		}
		this.storedFile = fileList[0];
		this.animeService.getS3DirectParams(this.storedFile)
			.pipe(
				catchError((error: unknown) => {
					this.formControl.setValue('');
					this.formControl.setErrors({ wrongImage: true });
					return throwError(() => error);
				}),
			)
			.subscribe(imageUrl => {
				this.formControl.patchValue(imageUrl);
			});
	}
}
