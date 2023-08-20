import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';

import { CustomFormField } from '../custom-form-field/custom-form-field.component';

const POSSIBLE_IMAGE_TYPE = ['image/jpeg', 'image/png', 'image/webp'];

/** Image manager. */
@Component({
	selector: 'camp-image-manager',
	templateUrl: './image-manager.component.html',
	styleUrls: ['./image-manager.component.css'],
	providers: [{ provide: MatFormFieldControl, useExisting: ImageManagerComponent }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageManagerComponent extends CustomFormField<File> {

	/** @inheritdoc */
	protected override checkValueIsEmpty(): boolean {
		return false;
	}

	/** File store. */
	protected storedFile: File | null = null;

	/** File list. */
	protected fileList: string[] = [];

	/** Set url of stored file. */
	@Input() public set imageUrl(imageUrl: string | null) {
		if (imageUrl !== null) {
			this.imageUrl$.next(imageUrl);
		}
	}

	/** Url of stored file. */
	protected imageUrl$ = new BehaviorSubject<string | null>(null);

	/**
	 * Handle file input change.
	 * @param fileList File list.
	 * @param event Event.
	 */
	public handleFileInputChange(fileList: FileList | null): void {
		if (fileList === null) {
			return;
		}

		if (!POSSIBLE_IMAGE_TYPE.includes(fileList[0].type)) {
			this.formControl.setErrors({ acceptType: true });
			return;
		}

		if (fileList[0].size < 5000) {
			this.formControl.setErrors({ minSize: true });
			return;
		}

		this.storedFile = fileList[0];

		this.formControl.patchValue(this.storedFile);
		this.imageUrl$.next(URL.createObjectURL(this.storedFile));
	}
}
