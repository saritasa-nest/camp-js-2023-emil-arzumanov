/* eslint-disable jsdoc/require-jsdoc */
import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	public animeList: readonly Anime[] = [];

	public constructor(private animeService: AnimeService) {}

	public ngOnInit(): void {
		this.getAnimeList();
	}

	private getAnimeList(): void {
		this.animeService.getAnimeList().subscribe((data): void => {
			this.animeList = data.results;
		});
	}
}
