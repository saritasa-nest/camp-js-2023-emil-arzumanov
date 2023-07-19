import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

/** Table of anime. */
@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	/** Columns of table to display. */
	public displayedColumns: string[] = ['image', 'titleEng', 'titleJpn', 'airedStart', 'type', 'status'];

	/** List of anime. */
	public animeList: readonly Anime[] = [];

	public constructor(private animeService: AnimeService) {}

	/** A function that is triggered when a component is initialized. */
	public ngOnInit(): void {
		this.getAnimeList();
	}

	/** Uses request from service and subscribes function that saves data. */
	private getAnimeList(): void {
		this.animeService.getAnimeList().subscribe((data): void => {
			this.animeList = data.results;
		});
	}
}
