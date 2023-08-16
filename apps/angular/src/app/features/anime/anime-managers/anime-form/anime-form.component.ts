import { Component, Input, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { AnimeDetails, AnimeRating, AnimeSeason, AnimeSource } from '@js-camp/core/models/anime-details';
import { AnimeDetailsForm } from '@js-camp/core/models/anime-details-form';
import { Genre } from '@js-camp/core/models/genre';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Studio } from '@js-camp/core/models/studio';
import { ValidatedFormGroupType } from '@js-camp/core/models/validated-form';
import { Observable } from 'rxjs';

/** Anime form component for anime editing or creation. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
})
export class AnimeFormComponent {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/** Type filter options for layout.  */
	protected readonly typeOptions = Object.values(AnimeType);

	/** Type filter options for status.  */
	protected readonly statusOptions = Object.values(AnimeStatus);

	/** Type filter options for source.  */
	protected readonly sourceOptions = Object.values(AnimeSource);

	/** Type filter options for rating.  */
	protected readonly ratingOptions = Object.values(AnimeRating);

	/** Type filter options for season.  */
	protected readonly seasonOptions = Object.values(AnimeSeason);

	/** Id of anime. */
	protected readonly animeId = this.activatedRoute.snapshot.params['id'];

	/** Type of submit. */
	@Input()
	public submitType = '';

	/** Title. */
	@Input()
	public title = '';

	/** Anime details. */
	@Input()
	public set animeDetails(animeDetails: AnimeDetails | null) {
		if (animeDetails !== null) {
			this.animeDetailsForm.patchValue(new AnimeDetailsForm({
				titleEng: animeDetails.titleEng,
				titleJpn: animeDetails.titleJpn,
				imageUrl: animeDetails.imageUrl,
				airedStart: animeDetails.aired.start,
				airedEnd: animeDetails.aired.end,
				type: animeDetails.type,
				status: animeDetails.status,
				trailerYoutubeId: animeDetails.trailerYoutubeId,
				source: animeDetails.source,
				airing: animeDetails.airing,
				rating: animeDetails.rating,
				season: animeDetails.season,
				synopsis: animeDetails.synopsis,
				studiosData: animeDetails.studiosData,
				genresData: animeDetails.genresData,
			}));
		}
	}

	/** Form group for login. */
	protected readonly animeDetailsForm: ValidatedFormGroupType<AnimeDetailsForm> = this.formBuilder.group(
		{
			titleEng: ['', [Validators.required]],
			titleJpn: ['', [Validators.required]],
			imageUrl: ['', [Validators.required]],
			airedStart: this.formBuilder.control<Date | null>(null),
			airedEnd: this.formBuilder.control<Date | null>(null),
			type: this.formBuilder.control<AnimeType | null>(null, [Validators.required]),
			status: this.formBuilder.control<AnimeStatus | null>(null, [Validators.required]),
			trailerYoutubeId: this.formBuilder.control<string | null>(null),
			source: this.formBuilder.control<AnimeSource | null>(null, [Validators.required]),
			airing: this.formBuilder.control<boolean | null>(null, [Validators.required]),
			rating: this.formBuilder.control<AnimeRating | null>(null, [Validators.required]),
			season: this.formBuilder.control<AnimeSeason | null>(null, [Validators.required]),
			synopsis: ['', [Validators.required]],
			studiosData: this.formBuilder.control<readonly Studio[]>([], [Validators.required]),
			genresData: this.formBuilder.control<readonly Genre[]>([], [Validators.required]),
		},
		{ updateOn: 'submit' },
	);

	/** On submit. */
	protected onSubmit(): void {
		if (this.animeDetailsForm.invalid === true) {
			return;
		}
		if (this.submitType === 'editAnime') {
			this.animeService.editAnime(this.animeId, this.animeDetailsForm.getRawValue()).subscribe(animDetails => {
				this.router.navigate([`/anime/details/${animDetails.id}`]);
			});
		} else {
			this.animeService.createAnime(this.animeDetailsForm.getRawValue()).subscribe(animDetails => {
				this.router.navigate([`/anime/details/${animDetails.id}`]);
			});
		}
	}

	/**
	 * Track by anime type.
	 * @param index Index.
	 * @param item Item.
	 */
	protected trackByItem<T>(index: number, item: T): T {
		return item;
	}

	/**
	 * Get studios.
	 * @param pagination Pagination request parameters.
		* @param searchControl Search request parameters.
	 */
	protected getStudios(pagination: PaginationParams, searchControl: string | null): Observable<Pagination<Studio>> {
		return this.animeService.getStudiosList(pagination, searchControl);
	}

	/**
	 * Create studio.
	 * @param name Studio name.
	 */
	protected createStudio(name: string): Observable<Studio> {
		return this.animeService.createStudio(name);
	}

	/**
	 * Get genres.
	 * @param pagination Pagination request parameters.
	 * @param searchControl Search request parameters.
	 */
	protected getGenres(pagination: PaginationParams, searchControl: string | null): Observable<Pagination<Genre>> {
		return this.animeService.getGenresList(pagination, searchControl);
	}

	/**
	 * Create genre.
	 * @param name Genre name.
	 */
	protected createGenres(name: string): Observable<Genre> {
		return this.animeService.createGenre(name);
	}
}