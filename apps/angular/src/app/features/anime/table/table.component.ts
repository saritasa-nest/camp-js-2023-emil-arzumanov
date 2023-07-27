import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { FormBuilder } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { SortField, Direction, SortingParams } from '@js-camp/core/models/sorting-params';
import { FilterParams } from '@js-camp/core/models/filter-params';
import { AnimeParams } from '@js-camp/core/models/anime-params';

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent {
	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly fb = inject(FormBuilder);

	/** Pagination parameters. */
	protected readonly paginationParams: PaginationParams = {
		pageSize: 5,
		pageIndex: 0,
	};

	/** Sorting params. */
	protected readonly sortingParams: SortingParams = {
		field: SortField.None,
		direction: Direction.None,
	};

	/** Form group with filter and search. */
	protected readonly filterForm = this.fb.group<FilterParams>({
		search: '',
		type: [],
	});

	/** Page size options. */
	protected readonly pageSizeOptions = [5, 10, 25, 50, 75, 100];

	/** Type filter options for layout.  */
	protected readonly filters = Object.values(AnimeType);

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

	public constructor() {
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
			this.pagination$.next({
				pageSize: snapshot['pageSize'],
				pageIndex: snapshot['pageIndex'],
			});
		}

		if (snapshot['sortField'] && snapshot['direction']) {
			this.sorting$.next({
				field: snapshot['sortField'],
				direction: snapshot['direction'],
			});
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
		this.pagination$.next({
			pageSize: event.pageSize,
			pageIndex: event.pageIndex,
		});
	}

	/**
	 * Handler for sorting event.
	 * @param event Event.
	 */
	protected sortHandler(event: Sort): void {
		this.sorting$.next({
			field: event.active as SortField,
			direction: event.direction as Direction,
		});
	}

	/** Filter form submit. */
	protected onSubmit(): void {
		this.pagination$.next({
			pageSize: 5,
			pageIndex: 0,
		});

		const { search, type } = this.filterForm.getRawValue();
		this.filterForm$.next({
			search,
			type,
		});
	}

	/**
		* Sets query parameters in URL.
		* @param params Query parameters that will be added to URL.
	 */
	private setQueryParams(params: AnimeParams): void {
		const queryParams = {
			pageSize: params.pagination.pageSize,
			pageIndex: params.pagination.pageIndex,
			sortField: params.sorting.field,
			direction: params.sorting.direction,
			search: params.filter.search,
			type: params.filter.type ? params.filter.type.join(',') : '',
		};
		this.router.navigate([], { queryParams });
	}
}
