import { FormControl } from '@angular/forms';
import { Component, Input, inject } from '@angular/core';
import { Studio } from '@js-camp/core/models/studio';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map } from 'rxjs';

/** Chips form field. */
@Component({
	selector: 'camp-chips-form-field',
	templateUrl: './chips-form-field.component.html',
	styleUrls: ['./chips-form-field.component.css'],
})
export class ChipsFormFieldComponent {
	private readonly animeService = inject(AnimeService);

	/** Anime studios. */
	@Input() public set studios(studios: readonly Studio[] | []) {
		if (studios.length > 0) {
			this.fruits = studios.map(studio => studio.name);
		}
	}

	/** Separator keys. */
	protected readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Filtered fruits. */
	protected readonly filteredFruits$ = this.animeService.getStudiosList({ pageIndex: 0, pageSize: 15 })
		.pipe(
			map(studiosPage => studiosPage.results.map(studio => studio.name)),
		);

	/** Fruit control. */
	protected fruitControl = new FormControl('');

	/** Fruits. */
	protected fruits: string[] = [];

	/**
	 * Create and add studio.
	 * @param event Event.
	 */
	protected add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
			this.animeService.createStudio(value).subscribe(studio => {
				this.fruits.push(studio.name);
			});
		}
		event.chipInput.clear();
		this.fruitControl.setValue(null);
	}

	/**
	 * Remove studio.
	 * @param fruit Studio.
	 */
	protected remove(fruit: string): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);
		}
	}

	/**
	 * Selected.
	 * @param event Event.
	 */
	protected selected(event: MatAutocompleteSelectedEvent): void {
		this.animeService.createStudio(event.option.viewValue).subscribe(studio => {
			this.fruits.push(studio.name);
		});
		this.fruitControl.setValue(null);
	}

/*
	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}*/
}
