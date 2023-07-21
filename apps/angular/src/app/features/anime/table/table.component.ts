import { Component } from '@angular/core';
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
	/** Columns of table to display. */
	protected readonly displayedColumns: readonly string[] = [
		'image',
		'titleEng',
		'titleJpn',
		'airedStart',
		'type',
		'status',
	];

	/** List of anime. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	public constructor(private animeService: AnimeService) {
		this.animeList$ = this.getAnimeList();
	}

	/** Uses request from service. */
	private getAnimeList(): Observable<Pagination<Anime>> {
		return this.animeService.getAnimeList();
	}
}
