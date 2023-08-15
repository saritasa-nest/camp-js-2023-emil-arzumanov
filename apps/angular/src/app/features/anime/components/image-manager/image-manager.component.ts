import { Component, Input, inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
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

	/** Default image url. */
	protected _defaultImageUrl: string | null = null;

	/** Default image url. */
	@Input() public set defaultImageUrl(value: string | null) {
		if (value !== null) {
			this.imageUrl$.next(value);
		}
		this._defaultImageUrl = value;
	}

	/** Image url subject. */
	protected readonly imageUrl$: BehaviorSubject<string> = new BehaviorSubject('');

	/**
	 * Handle file input change.
	 * @param fileList File list.
	 */
	public handleFileInputChange(fileList: FileList | null): void {
		if (fileList === null) {
			return;
		}
		this.storedFile = fileList[0];
		this.animeService.getS3DirectParams(this.storedFile);
		if (fileList.length) {
			this.formControl.patchValue(`${this.storedFile}`);
		} else {
			this.formControl.patchValue('');
		}
	}
}
