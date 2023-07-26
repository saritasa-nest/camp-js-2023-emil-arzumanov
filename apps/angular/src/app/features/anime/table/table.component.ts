import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, switchMap, tap } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { FormBuilder, FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { ActiveField, Direction, SortingParams } from '@js-camp/core/models/sorting-params';

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent {
	/** Pagination parameters. */
	protected readonly paginationParams: PaginationParams = {
		pageSize: 25,
		pageIndex: 0,
	};

	/** Sorting params. */
	protected readonly sortingParams: SortingParams = {
		activeField: ActiveField.none,
		direction: Direction.none,
	};

	/** Form group with filter and search. */
	protected readonly filterAndSearchForm = this.fb.group({
		search: '',
		type: new FormControl<AnimeType[]>([], { nonNullable: false }),
	});

	/** Page size options. */
	protected readonly pageSizeOptions = [25, 50, 75, 100];

	/** List.  */
	protected readonly filters = ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'Unknown'];

	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	/** List of anime. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Pagination. */
	protected readonly pagination$: BehaviorSubject<PaginationParams>;

	/** Sorting. */
	protected readonly sorting$: BehaviorSubject<SortingParams>;

	/** Searching. */
	protected readonly search$: BehaviorSubject<FormControl<string | null>>;

	/** Type filter. */
	protected readonly typeFilter$: BehaviorSubject<FormControl<AnimeType[] | null>>;

	/** Columns of table to display. */
	protected readonly displayedColumns: readonly string[] = [
		'poster',
		'titleEng',
		'titleJpn',
		'airedStart',
		'type',
		'status',
	];

	public constructor(private fb: FormBuilder) {
		const snapshot = this.route.snapshot.queryParams;

		if (snapshot['pageIndex'] && snapshot['pageSize']) {
			this.paginationParams.pageIndex = snapshot['pageIndex'];
			this.paginationParams.pageSize = snapshot['pageSize'];
		}

		if (snapshot['activeField'] && snapshot['direction']) {
			this.sortingParams.activeField = snapshot['activeField'];
			this.sortingParams.direction = snapshot['direction'];
		}

		if (snapshot['type']) {
			this.filterAndSearchForm.controls.type.setValue(snapshot['type'].split(','));
		}

		if (snapshot['search']) {
			this.filterAndSearchForm.controls.search.setValue(snapshot['search']);
		}

		this.pagination$ = new BehaviorSubject(this.paginationParams);
		this.sorting$ = new BehaviorSubject(this.sortingParams);
		this.search$ = new BehaviorSubject(this.filterAndSearchForm.controls.search);
		this.typeFilter$ = new BehaviorSubject(this.filterAndSearchForm.controls.type);

		this.animeList$ = combineLatest([
			this.pagination$,
			this.sorting$,
			this.search$,
			this.typeFilter$,
		]).pipe(
			tap(params => this.setQueryParams(params)),
			switchMap(param => this.animeService.getAnimeList(param)),
		);
	}

	/**
	 * Handler for pagination event.
	 * @param event Event.
	 */
	protected pageChangeHandler(event: PageEvent): void {
		this.paginationParams.pageIndex = event.pageIndex;
		this.paginationParams.pageSize = event.pageSize;
		this.pagination$.next(this.paginationParams);
	}

	/**
	 * Handler for sorting event.
	 * @param event Event.
	 */
	protected sortHandler(event: Sort): void {
		this.sortingParams.activeField = event.active as ActiveField;
		this.sortingParams.direction = event.direction as Direction;
		this.sorting$.next(this.sortingParams);
	}

	/** Submit. */
	protected onSubmit(): void {
		this.paginationParams.pageIndex = 0;
		this.paginationParams.pageSize = 25;
		this.pagination$.next(this.paginationParams);

		this.search$.next(this.filterAndSearchForm.controls.search);
		this.typeFilter$.next(this.filterAndSearchForm.controls.type);
	}

	private setQueryParams(params: [PaginationParams, SortingParams, FormControl<string | null>, FormControl<AnimeType[] | null>]): void {
		const queryParams = {
			pageSize: params[0].pageSize,
			pageIndex: params[0].pageIndex,
			activeField: params[1].activeField,
			direction: params[1].direction,
			search: params[2].value,
			type: params[3].value ? params[3].value.join(',') : '',
		};
		this.router.navigate([], { queryParams: { ...queryParams } });
	}
}
