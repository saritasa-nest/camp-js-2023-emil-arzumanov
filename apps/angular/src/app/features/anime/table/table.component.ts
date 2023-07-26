import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { FormBuilder } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { ActiveField, Direction, SortingParams } from '@js-camp/core/models/sorting-params';
import { FilterParams } from '@js-camp/core/models/filter-params';
import { AnimeParams } from '@js-camp/core/models/anime-params';

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent {
	/** Pagination parameters. */
	protected readonly paginationParams: PaginationParams = {
		pageSize: 5,
		pageIndex: 0,
	};

	/** Sorting params. */
	protected readonly sortingParams: SortingParams = {
		activeField: ActiveField.none,
		direction: Direction.none,
	};

	/** Form group with filter and search. */
	protected readonly filterForm = this.fb.group<FilterParams>({
		search: '',
		type: [],
	});

	/** Page size options. */
	protected readonly pageSizeOptions = [5, 10, 25, 50, 75, 100];

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

	/** Filter form. */
	protected readonly filterForm$: BehaviorSubject<FilterParams>;

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
		this.makeSnapshots();

		this.pagination$ = new BehaviorSubject(this.paginationParams);
		this.sorting$ = new BehaviorSubject(this.sortingParams);
		this.filterForm$ = new BehaviorSubject({
			search: this.filterForm.controls.search.value,
			type: this.filterForm.controls.type.value,
		});

		this.animeList$ = combineLatest([
			this.pagination$,
			this.sorting$,
			this.filterForm$,
		]).pipe(
			map(([pagination, sorting, filter]) => ({ pagination, sorting, filter })),
			tap(params => this.setQueryParams(params)),
			switchMap(param => this.animeService.getAnimeList(param)),
		);
	}

	private makeSnapshots(): void {
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
			this.filterForm.controls.type.setValue(snapshot['type']);
		}

		if (snapshot['search']) {
			this.filterForm.controls.search.setValue(snapshot['search']);
		}
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

		this.filterForm$.next({
			search: this.filterForm.controls.search.value,
			type: this.filterForm.controls.type.value,
		});
	}

	private setQueryParams(params: AnimeParams): void {
		const queryParams = {
			pageSize: params.pagination.pageSize,
			pageIndex: params.pagination.pageIndex,
			activeField: params.sorting.activeField,
			direction: params.sorting.direction,
			search: params.filter.search,
			type: params.filter.type,
		};
		this.router.navigate([], { queryParams: { ...queryParams } });
	}
}
