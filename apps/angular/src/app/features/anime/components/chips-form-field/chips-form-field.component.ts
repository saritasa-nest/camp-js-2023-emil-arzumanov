import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ElementRef, HostListener, Input, ViewChild, forwardRef, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, switchMap, combineLatest, BehaviorSubject, startWith, debounceTime, of } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Pagination } from '@js-camp/core/models/pagination';

const DEFAULT_PAGINATION = {
	pageSize: 15,
	pageIndex: 0,
};

type CreateItem<TItem> = (name: string) => Observable<TItem>;

type CheckIfInArray<TItem> = (item: readonly TItem[], id: number | null, name: string | null) => boolean;

type GetItems<TItem> = (pagination: PaginationParams, searchControl: string | null) => Observable<Pagination<TItem>>;

/** Chips form field. */
@Component({
	selector: 'camp-chips-form-field',
	templateUrl: './chips-form-field.component.html',
	styleUrls: ['./chips-form-field.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ChipsFormFieldComponent),
			multi: true,
		},
	],
})
export class ChipsFormFieldComponent<TItem extends { id: number; name: string; }> implements ControlValueAccessor {
	private readonly animeService = inject(AnimeService);

	/** Creation method. */
	@Input() public createItem: CreateItem<TItem> | null = null;

	/** Check if in array. */
	@Input() public checkIfInArray: CheckIfInArray<TItem> | null = null;

	/** Get all items. */
	@Input() public getItems: GetItems<TItem> | null = null;

	/** Value for mat label. */
	@Input() public labelValue = '';

	/** @inheritdoc */
	public get value(): TItem[] {
		return this.chosenItems;
	}

	/** @inheritdoc */
	@Input()
	public set value(val) {
		this.chosenItems = val;
	}

	/** @inheritdoc */
	public writeValue(value: TItem[]): void {
		this.chosenItems = value;
	}

	/** @inheritdoc */
	// eslint-disable-next-line no-empty-function
	public registerOnChange(): void {}

	/** @inheritdoc */
	// eslint-disable-next-line no-empty-function
	public registerOnTouched(): void {}

	/** Separator keys. */
	protected readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Filtered items. */
	protected readonly filteredItems$: Observable<readonly TItem[]>;

	/** Scroll pagination. */
	protected readonly scrollPagination$ = new BehaviorSubject<PaginationParams>(DEFAULT_PAGINATION);

	/** Item search control. */
	protected searchControl = new FormControl('');

	/** Chosen items. */
	protected chosenItems: TItem[] = [];

	public constructor() {
		this.filteredItems$ = combineLatest([
			this.scrollPagination$,
			this.searchControl.valueChanges.pipe(startWith('')),
		]).pipe(
			debounceTime(300),
			map(([pagination, searchControl]) => ({
				pagination,
				searchControl,
			})),
			switchMap(params => {
				if (this.getItems === null) {
					return [];
				}
				return this.getItems(params.pagination, params.searchControl);
			}),
			map(itemsPagination => itemsPagination.results),
		);
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

		if (this.checkIfInArray === null || this.createItem === null || this.checkIfInArray(this.chosenItems, null, value)) {
			return;
		}

		if (this.checkIfInArray(items, null, value) === false) {
			this.createItem(value).subscribe(newStudio => {
				this.chosenItems.push(newStudio);
			});
			return;
		}

		for (let i = 0; i < items.length; i++) {
			if (items[i].name === value) {
				this.chosenItems.push(items[i]);
				break;
			}
		}
	}

	/**
	 * Remove item from chosenItems.
	 * @param item Item.
	 */
	protected removeFromChosenItems(item: TItem): void {
		if (this.checkIfInArray === null) {
			return;
		}

		if (this.checkIfInArray(this.chosenItems, item.id, null)) {
			this.chosenItems.splice(this.chosenItems.indexOf(item), 1);
		}
	}

	/**
	 * Add selected to chosen items.
	 * @param event Event.
	 */
	protected addSelectedToChosenItems(event: MatAutocompleteSelectedEvent): void {
		this.searchControl.setValue(null);
		const itemValue = event.option.value;

		if (this.checkIfInArray === null) {
			return;
		}

		if (itemValue && this.checkIfInArray(this.chosenItems, itemValue.id, null) === false) {
			this.chosenItems.push(itemValue);
		}
	}
}
