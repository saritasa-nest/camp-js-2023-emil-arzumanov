import { Component, Input, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { S3DirectService } from '@js-camp/angular/core/services/s3direct.service';
import { StudiosService } from '@js-camp/angular/core/services/studios.service';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { AnimeDetails, AnimeRating, AnimeSeason, AnimeSource } from '@js-camp/core/models/anime-details';
import { AnimeDetailsForm } from '@js-camp/core/models/anime-details-form';
import { Genre } from '@js-camp/core/models/genre';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Studio } from '@js-camp/core/models/studio';
import { ValidatedFormGroupType } from '@js-camp/core/models/validated-form';
import { Observable, catchError, first, tap, throwError } from 'rxjs';

/** Anime form component for anime editing or creation. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
})
export class AnimeFormComponent {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly animeService = inject(AnimeService);

	private readonly genresService = inject(GenresService);

	private readonly studiosService = inject(StudiosService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly s3directService = inject(S3DirectService);

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
	public isEdit = false;

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
				imageFile: null,
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
			imageUrl: '',
			imageFile: this.formBuilder.control<File | null>(null, [Validators.required]),
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

		const file = this.animeDetailsForm.controls.imageFile.getRawValue();
		if (file !== null) {
			this.s3directService.getS3DirectParams(file)
				.pipe(
					catchError((error: unknown) => {
						this.animeDetailsForm.controls.imageFile.setErrors({ wrongImage: true });
						return throwError(() => error);
					}),
				)
				.subscribe(imageUrl => {
					this.animeDetailsForm.controls.imageUrl.patchValue(imageUrl);
					this.submitDetails();
				});
		}
	}

	private submitDetails(): void {
		if (this.isEdit) {
			this.animeService.editAnime(this.animeId, this.animeDetailsForm.getRawValue()).pipe(
				first(),
				tap(animDetails => {
					this.router.navigate([`/anime/details/${animDetails.id}`]);
				}),
			)
				.subscribe();
		} else {
			this.animeService.createAnime(this.animeDetailsForm.getRawValue()).pipe(
				first(),
				tap(animDetails => {
					this.router.navigate([`/anime/details/${animDetails.id}`]);
				}),
			)
				.subscribe();
		}
	}

	/**
	 * Get studios.
	 * @param pagination Pagination request parameters.
	 * @param search Search request parameters.
	 */
	protected getStudios(pagination: PaginationParams, search: string | null): Observable<Pagination<Studio>> {
		return this.studiosService.getStudiosList(pagination, search);
	}

	/**
	 * Create studio.
	 * @param name Studio name.
	 */
	protected createStudio(name: string): Observable<Studio> {
		return this.studiosService.createStudio(name);
	}

	/**
	 * Get genres.
	 * @param pagination Pagination request parameters.
	 * @param search Search request parameters.
	 */
	protected getGenres(pagination: PaginationParams, search: string | null): Observable<Pagination<Genre>> {
		return this.genresService.getGenresList(pagination, search);
	}

	/**
	 * Create genre.
	 * @param name Genre name.
	 */
	protected createGenres(name: string): Observable<Genre> {
		return this.genresService.createGenre(name);
	}
}
