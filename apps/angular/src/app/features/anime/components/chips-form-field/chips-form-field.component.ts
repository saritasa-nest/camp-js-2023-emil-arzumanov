import { FormControl } from '@angular/forms';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Studio } from '@js-camp/core/models/studio';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

/** Chips form field. */
@Component({
	selector: 'camp-chips-form-field',
	templateUrl: './chips-form-field.component.html',
	styleUrls: ['./chips-form-field.component.css'],
})
export class ChipsFormFieldComponent {
	private readonly animeService = inject(AnimeService);

	/** Anime studios. */
	@Input() public studiosData: FormControl<readonly Studio[]> = new FormControl();

	/** Separator keys. */
	protected readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Filtered fruits. */
	protected readonly filteredFruits$: Observable<string[]>;

	/** Fruit control. */
	protected fruitControl = new FormControl('');

	/** Fruits. */
	protected fruits: string[] = this.studiosData.getRawValue() !== null ?
		this.studiosData.getRawValue().map(studio => studio.name) : [];

	/** All fruits. */
	protected allFruits: string[] = ['Mine', 'Limon'];

	/** Fruit input. */
	@ViewChild('fruitInput') public fruitInput = ElementRef<HTMLInputElement>;

	private readonly announcer = inject(LiveAnnouncer);

	public constructor() {
		this.filteredFruits$ = this.fruitControl.valueChanges.pipe(
			startWith(null),
			map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
		);
	}

	/**
	 * Add studio.
	 * @param event Event.
	 */
	protected add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our fruit
		if (value) {
			this.fruits.push(value);
		}

		// Clear the input value
		event.chipInput.clear();

		this.studiosData.setValue([]);
	}

	/**
	 * Remove fruit.
	 * @param fruit Fruit.
	 */
	protected remove(fruit: string): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);
			this.announcer.announce(`Removed ${fruit}`);
		}
	}

	/**
	 * Selected.
	 * @param event Event.
	 */
	protected selected(event: MatAutocompleteSelectedEvent): void {
		this.fruits.push(event.option.viewValue);
		this.studiosData.setValue([]);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}
}
