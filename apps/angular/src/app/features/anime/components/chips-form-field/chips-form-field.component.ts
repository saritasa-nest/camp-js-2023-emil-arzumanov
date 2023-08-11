import { FormControl } from '@angular/forms';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { Studio } from '@js-camp/core/models/studio';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, switchMap, combineLatest, BehaviorSubject, startWith, tap, debounceTime } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

const DEFAULT_PAGINATION = {
	pageSize: 15,
	pageIndex: 0,
};

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
			this.fruits = studios.map(studio => studio);
		}
	}

	/** Item event output. */
	@Output() public itemEvent = new EventEmitter<Studio[]>();

	/** Separator keys. */
	protected readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Filtered fruits. */
	protected readonly filteredFruits$: Observable<Studio[]>;

	/** Scroll pagination. */
	protected readonly scrollPagination$ = new BehaviorSubject<PaginationParams>(DEFAULT_PAGINATION);

	/** Fruit control. */
	protected searchControl = new FormControl('');

	/** Fruits. */
	protected fruits: Studio[] = [];

	public constructor() {
		this.filteredFruits$ = combineLatest([
			this.scrollPagination$,
			this.searchControl.valueChanges.pipe(startWith('')),
		]).pipe(
			debounceTime(300),
			map(([pagination, searchControl]) => ({
				pagination,
				searchControl,
			})),
			switchMap(params => this.animeService.getStudiosList(params.pagination, params.searchControl)),
			map(studiosPage => studiosPage.results.map(studio => studio)),
		);
	}

	/** Scroll container. */
	@ViewChild('scrollContainer') protected scrollContainer: ElementRef | null = null;

	/**
	 * Host listener.
	 * @param event Event.
	 * @param pagination Pagination.
	 */
	@HostListener('scroll', ['$event'])
	public divScroll(pagination: PaginationParams): void {
		if (this.scrollContainer === null) {
			return;
		}
		const element = this.scrollContainer.nativeElement;
		const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
		if (atBottom) {
			this.scrollPagination$.next({
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize + DEFAULT_PAGINATION.pageSize,
			});
		}
	}

	/**
	 * Create and add studio.
	 * @param event Event.
	 * @param studios Studios.
	 */
	protected add(event: MatChipInputEvent, studios: Studio[]): void {
		const value = (event.value || '').trim();

		event.chipInput.clear();
		this.searchControl.setValue(null);

		if (this.checkIfInArrayBy(this.fruits, null, value)) {
			return;
		}

		if (this.checkIfInArrayBy(studios, null, value) === false) {
			this.animeService.createStudio(value).subscribe(newStudio => {
				this.fruits.push(newStudio);
				this.itemEvent.emit(this.fruits);
			});
			return;
		}

		for (let i = 0; i < studios.length; i++) {
			if (studios[i].name === value) {
				this.fruits.push(studios[i]);
				break;
			}
		}
		this.itemEvent.emit(this.fruits);
	}

	/**
	 * Remove studio.
	 * @param fruit Studio.
	 */
	protected remove(fruit: Studio): void {
		if (this.checkIfInArrayBy(this.fruits, fruit.id, null)) {
			this.fruits.splice(this.fruits.indexOf(fruit), 1);
			this.itemEvent.emit(this.fruits);
		}
	}

	/**
	 * Selected.
	 * @param event Event.
	 */
	protected selected(event: MatAutocompleteSelectedEvent): void {
		this.searchControl.setValue(null);
		const itemValue: Studio = event.option.value;
		if (itemValue && this.checkIfInArrayBy(this.fruits, itemValue.id, null) === false) {
			this.fruits.push(itemValue);
			this.itemEvent.emit(this.fruits);
		}
	}

	/**
	 * Check if value in array.
	 * @param item Item.
	 * @param id Id.
	 * @param name Name.
	 */
	protected checkIfInArrayBy<T extends { id: number; name: string; }>(
		item: T[], id: number | null, name: string | null,
	): boolean {
		for (let i = 0; i < item.length; i++) {
			if (item[i].id === id) {
				return true;
			}
			if (item[i].name === name) {
				return true;
			}
		}
		return false;
	}
}
