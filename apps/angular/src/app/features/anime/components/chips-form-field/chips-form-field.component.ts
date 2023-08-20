import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, switchMap, combineLatest, BehaviorSubject, startWith, debounceTime } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { MatFormFieldControl } from '@angular/material/form-field';
import { trackById } from '@js-camp/angular/core/utils/track-by.util';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { StudiosService } from '@js-camp/angular/core/services/studios.service';

import { CustomFormField } from '@js-camp/angular/shared/components/custom-form-field/custom-form-field.component';

const DEBOUNCE_TIME = 300;

const DEFAULT_PAGINATION = {
	pageSize: 15,
	pageIndex: 0,
};

type CreateItem<TItem> = (name: string) => Observable<TItem>;

type GetItems<TItem> = (pagination: PaginationParams, searchControl: string | null) => Observable<Pagination<TItem>>;

type GetItemsCount = (name: string) => Observable<number>;

/** Chips form field. */
@Component({
	selector: 'camp-chips-form-field',
	templateUrl: './chips-form-field.component.html',
	styleUrls: ['./chips-form-field.component.css'],
	providers: [{ provide: MatFormFieldControl, useExisting: ChipsFormFieldComponent }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsFormFieldComponent<TItem extends { id: number; name: string; }> extends CustomFormField<TItem[]> {

	/** Creation method. */
	@Input()
	public createItem: CreateItem<TItem> | null = null;

	/** Get all items. */
	@Input()
	public getItems: GetItems<TItem> | null = null;

	/** Get count of this item. */
	@Input()
	public getItemsCount: GetItemsCount | null = null;

	private readonly animeService = inject(AnimeService);

	private readonly genresService = inject(GenresService);

	private readonly studiosService = inject(StudiosService);

	/** Separator keys. */
	protected readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Filtered items. */
	protected readonly filteredItems$: Observable<readonly TItem[]>;

	/** Scroll pagination. */
	protected readonly scrollPagination$ = new BehaviorSubject<PaginationParams>(DEFAULT_PAGINATION);

	/** Item search control. */
	protected searchControl = new FormControl('');

	public constructor() {
		super();
		this.filteredItems$ = this.createFilteredItemsStream();
	}

	private createFilteredItemsStream(): Observable<readonly TItem[]> {
		return combineLatest([
			this.scrollPagination$,
			this.searchControl.valueChanges.pipe(startWith('')),
		]).pipe(
			debounceTime(DEBOUNCE_TIME),
			map(([pagination, search]) => ({ pagination, search })),
			switchMap(params => {
				if (this.getItems === null) {
					return [];
				}
				return this.getItems(params.pagination, params.search);
			}),
			map(itemsPagination => itemsPagination.results),
		);
	}

	/** @inheritdoc */
	protected override checkValueIsEmpty(value: TItem[]): boolean {
		return (value === null || value.length === 0) && (this.searchControl.value === null || this.searchControl.value.length === 0);
	}

	/** Scroll container. */
	@ViewChild('scrollContainer') protected scrollContainer: ElementRef | null = null;

	/**
	 * Scroll host listener.
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
	 * Add item to chosenItems.
	 * @param event Event.
	 * @param items Items.
	 */
	protected addToChosenItems(event: MatChipInputEvent, items: readonly TItem[]): void {
		const value = (event.value || '').trim();

		event.chipInput.clear();
		this.searchControl.setValue(null);

		if (
			this.checkIfInItemsArray === null ||
			this.value === null ||
			this.createItem === null ||
			this.checkIfInItemsArray(this.value, null, value)
		) {
			return;
		}

		if (this.checkIfInItemsArray(items, null, value) === false) {
			this.createItem(value).subscribe(newStudio => {
				this.value = this.value === null ? null : this.value.concat(newStudio);
				this.formControl.patchValue(this.value);
			});
			return;
		}

		for (const item of items) {
			if (item.name === value) {
				this.value = this.value.concat(item);
				this.formControl.patchValue(this.value);
				break;
			}
		}
	}

	/**
	 * Remove item from chosenItems.
	 * @param item Item.
	 */
	protected removeFromChosenItems(item: TItem): void {
		if (this.checkIfInItemsArray === null || this.value === null) {
			return;
		}

		if (this.checkIfInItemsArray(this.value, item.id, null)) {
			this.value.splice(this.value.indexOf(item), 1);
			this.formControl.patchValue(this.value);
		}
	}

	/**
	 * Add selected to chosen items.
	 * @param event Event.
	 */
	protected addSelectedToChosenItems(event: MatAutocompleteSelectedEvent): void {
		this.searchControl.setValue(null);
		const itemValue = event.option.value;

		if (this.checkIfInItemsArray === null || this.value === null) {
			return;
		}

		if (itemValue && this.checkIfInItemsArray(this.value, itemValue.id, null) === false) {
			this.value = this.value.concat(itemValue);
			this.formControl.patchValue(this.value);
		}
	}

	/**
	 * Check if value in array.
	 * @param items Items.
	 * @param id Id.
	 * @param name Name.
	 */
	protected checkIfInItemsArray(
		items: readonly TItem[], id: number | null, name: string | null,
	): boolean {
		for (const item of items) {
			if (item.id === id) {
				return true;
			}
			if (item.name === name) {
				return true;
			}
		}
		return false;
	}

	/** Track by id. */
	protected readonly trackById = trackById;
}
