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
		activeField: ActiveField.None,
		direction: Direction.None,
	};

	/** Form group with filter and search. */
	protected readonly filterForm = this.fb.group<FilterParams>({
		search: '',
		type: [],
	});

	/** Page size options. */
	protected readonly pageSizeOptions = [5, 10, 25, 50, 75, 100];

	/** Type filter options.  */
	protected readonly filters = ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'Unknown'];

	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	/** List of anime. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Pagination. */
	protected readonly pagination$ = new BehaviorSubject(this.paginationParams);

	/** Sorting. */
	protected readonly sorting$ = new BehaviorSubject(this.sortingParams);

	/** Filter form. */
	protected readonly filterForm$ = new BehaviorSubject(this.filterForm.getRawValue());

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

	/**
		* Makes snapshot of query params.
		* Saves the value of the parameters if the parameters exist.
	 */
	private makeSnapshots(): void {
		const snapshot = this.route.snapshot.queryParams;

		if (snapshot['pageIndex'] && snapshot['pageSize']) {
			this.paginationParams.pageIndex = snapshot['pageIndex'];
			this.paginationParams.pageSize = snapshot['pageSize'];
			this.pagination$.next(this.paginationParams);
		}

		if (snapshot['activeField'] && snapshot['direction']) {
			this.sortingParams.activeField = snapshot['activeField'];
			this.sortingParams.direction = snapshot['direction'];
			this.sorting$.next(this.sortingParams);
		}

		if (snapshot['search']) {
			this.filterForm.controls.search.setValue(snapshot['search']);
			const { search, type } = this.filterForm.getRawValue();
			this.filterForm$.next({
				search,
				type,
			});
		}

		if (snapshot['type']) {
			this.filterForm.controls.type.setValue(snapshot['type'].split(','));
			const { search, type } = this.filterForm.getRawValue();
			this.filterForm$.next({
				search,
				type,
			});
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

	/** Filter form submit. */
	protected onSubmit(): void {
		this.paginationParams.pageIndex = 0;

		const { search, type } = this.filterForm.getRawValue();
		this.filterForm$.next({
			search,
			type,
		});
	}

	/** Sets query parameters in URL.
		* @param params Query parameters that will be added to URL.
	 */
	private setQueryParams(params: AnimeParams): void {
		const queryParams = {
			pageSize: params.pagination.pageSize,
			pageIndex: params.pagination.pageIndex,
			activeField: params.sorting.activeField,
			direction: params.sorting.direction,
			search: params.filter.search,
			type: params.filter.type ? params.filter.type.join(',') : '',
		};
		this.router.navigate([], { queryParams: { ...queryParams } });
	}
}
