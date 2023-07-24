import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent {
	private readonly animeService = inject(AnimeService);

	/** Pagination parameters. */
	protected readonly paginationParams: PaginationParams = {
		pageSize: 25,
		pageIndex: 0,
	};

	/** Page size options. */
	protected readonly pageSizeOptions = [25, 50, 75, 100];

	/** Pagination. */
	// protected readonly pagination$: BehaviorSubject<PaginationParams>;

	private readonly router = inject(Router);

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
	}

	/** List of anime. */
	protected readonly animeList$ = this.getAnimeList();

	/** Uses request from service. */
	private getAnimeList(): Observable<Pagination<Anime>> {
		return this.animeService.getAnimeList(this.paginationParams);
	}

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
