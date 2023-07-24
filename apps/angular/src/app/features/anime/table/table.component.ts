import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, debounceTime, switchMap, tap } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { FormControl } from '@angular/forms';

const DEBOUNCE = 200;

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

	/** Page size options. */
	protected readonly pageSizeOptions = [5, 10, 25, 50, 75, 100];

	/** Form. */
	protected readonly filterForm = new FormControl('');

	/** List.  */
	protected readonly filters = ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'Unknown'];

	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	/** List of anime. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Pagination. */
	protected readonly pagination$: BehaviorSubject<PaginationParams>;

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
		this.paginationParams.pageIndex = this.route.snapshot.queryParams['pageIndex'];
		this.paginationParams.pageSize = this.route.snapshot.queryParams['pageSize'];

		this.pagination$ = new BehaviorSubject(this.paginationParams);

		this.animeList$ = this.pagination$.pipe(
			debounceTime(DEBOUNCE),
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

	private setQueryParams(params: PaginationParams): void {
		this.router.navigate([], { queryParams: { ...params } });
	}
}
