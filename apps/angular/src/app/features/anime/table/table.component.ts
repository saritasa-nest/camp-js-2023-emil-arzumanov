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
		// eslint-disable-next-line no-return-assign
		this.animeService.getAnimeList().subscribe(data => this.animeList = data.results);
	}
}
