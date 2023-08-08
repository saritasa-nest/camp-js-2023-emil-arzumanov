import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, startWith, switchMap, tap } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { FormBuilder } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Direction, SortField, SortParams } from '@js-camp/core/models/sorting-params';
import { FilterParams } from '@js-camp/core/models/filter-params';
import { AnimeParams } from '@js-camp/core/models/anime-params';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Query parameters for snapshots. */
enum Params {
	PageSize = 'pageSize',
	PageIndex = 'pageIndex',
	SortingParameter = 'sortField',
	DirectionParameter = 'direction',
	Search = 'search',
	Type = 'type',
}

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly authService = inject(AuthService);

	private readonly fb = inject(FormBuilder);

	/** Page size options. */
	protected readonly pageSizeOptions = [5, 10, 25, 50, 75, 100];

	/** Type filter options for layout.  */
	protected readonly filters = Object.values(AnimeType);

	/** Columns of table to display. */
	protected readonly displayedColumns: readonly string[] = [
		'poster',
		'titleEng',
		'titleJpn',
		'airedStart',
		'type',
		'status',
	];

	/** Form group with filter and search. */
	protected readonly filterForm = this.fb.group<FilterParams>({
		search: '',
		type: [],
	}, { updateOn: 'submit' });

	/** List of anime. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Pagination. */
	protected readonly pagination$ = new BehaviorSubject<PaginationParams>({
		pageSize: 5,
		pageIndex: 0,
	});

	/** Sorting. */
	protected readonly sorting$ = new BehaviorSubject<SortParams>({
		field: SortField.None,
		direction: Direction.None,
	});

	/** Mapped filter valueChanges. */
	protected readonly filter$: Observable<FilterParams>;

	public constructor() {
		this.makeAndSaveSnapshots();
		this.filter$ = this.createFiltersStream();

		this.animeList$ = combineLatest([
			this.pagination$,
			this.sorting$,
			this.filter$,
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
	private makeAndSaveSnapshots(): void {
		const snapshot = this.route.snapshot.queryParams;

		if (snapshot[Params.PageIndex] != null && snapshot[Params.PageSize] != null) {
			this.pagination$.next({
				pageSize: snapshot[Params.PageSize],
				pageIndex: snapshot[Params.PageIndex],
			});
		}

		if (snapshot[Params.SortingParameter] != null && snapshot[Params.DirectionParameter] != null) {
			this.sorting$.next({
				field: snapshot[Params.SortingParameter],
				direction: snapshot[Params.DirectionParameter],
			});
		}

		if (snapshot[Params.Search] != null) {
			this.filterForm.controls.search.setValue(snapshot[Params.Search]);
		}

		if (snapshot[Params.Type] != null) {
			this.filterForm.controls.type.setValue(snapshot[Params.Type].split(','));
		}
	}

	private createFiltersStream(): Observable<FilterParams> {
		return this.filterForm.valueChanges.pipe(
			startWith(this.filterForm.value),
			map(({ search, type }): FilterParams => ({
				search: search === undefined ? '' : search,
				type: type === undefined ? [] : type,
			})),
		);
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
			direction: event.direction === 'asc' ? Direction.Ascending : Direction.Descending,
		});
	}

	/** Filter form submit. */
	protected onSubmit(): void {
		this.pagination$.next({
			pageSize: 5,
			pageIndex: 0,
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

	/** Check if user is logged in. */
	protected isLoggedIn$ = new BehaviorSubject(this.authService.isLoggedIn());

	/** Log out. */
	protected logout(): void {
		this.authService.logout();
		this.isLoggedIn$.next(this.authService.isLoggedIn());
	}

	/**
	 * Track by anime id.
	 * @param index Index.
	 * @param anime Anime.
	 */
	protected trackById(index: number, anime: Anime): number {
		return anime.id;
	}

	/**
	 * Track by anime type.
	 * @param index Index.
	 * @param type Anime type.
	 */
	protected trackByAnimeType(index: number, type: AnimeType): AnimeType {
		return type;
	}

	/**
		* Navigate to anime details by id.
		* @param id Anime id.
		*/
	protected navigateToDetails(id: number): void {
		this.router.navigate([`/anime/details/${id}`]);
	}
}
