import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

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

	/** Page size options. */
	protected readonly pageSizeOptions = [25, 50, 75, 100];

	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	/** Pagination. */
	protected pagination$ = new BehaviorSubject(this.paginationParams);

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
		this.setQueryParams(this.paginationParams);
		this.route.queryParams.subscribe(params => {
			this.pagination$.next(new PaginationParams({
				pageIndex: params['pageIndex'],
				pageSize: params['pageSize'],
			}));
		});
	}

	/** List of anime. */
	protected readonly animeList$ = this.pagination$.pipe(switchMap(param => this.animeService.getAnimeList(param)));

	/**
	 * Handler for pagination event.
	 * @param event Event.
	 */
	protected pageChangeHandler(event: PageEvent): void {
		this.paginationParams.pageSize = event.pageSize;
		this.paginationParams.pageIndex = event.pageIndex;
		this.setQueryParams(this.paginationParams);
	}

	private setQueryParams(params: PaginationParams): void {
		this.router.navigate([], { queryParams: { ...params } });
	}
}
