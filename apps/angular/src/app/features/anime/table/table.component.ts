import { NumberInput } from '@angular/cdk/coercion';
import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable } from 'rxjs';

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent {
	private readonly animeService = inject(AnimeService);

	/** Amount of anime. */
	protected readonly resultsLength: NumberInput = 100;

	/** Size of page. */
	protected readonly pageSize: NumberInput = 25;

	/** Columns of table to display. */
	protected readonly displayedColumns: readonly string[] = [
		'poster',
		'titleEng',
		'titleJpn',
		'airedStart',
		'type',
		'status',
	];

	/** List of anime. */
	protected readonly animeList$ = this.getAnimeList();

	/** Uses request from service. */
	private getAnimeList(): Observable<Pagination<Anime>> {
		return this.animeService.getAnimeList();
	}

	/**
	 * Handler for pagination event.
	 * @param event Event.
	 */
	protected pageChangeHandler(event: PageEvent): void {
		console.log(event);
	}
}
