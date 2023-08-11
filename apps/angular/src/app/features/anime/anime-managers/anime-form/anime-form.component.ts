import { Component, Input, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { AnimeDetails, AnimeRating, AnimeSeason, AnimeSource } from '@js-camp/core/models/anime-details';
import { AnimeDetailsForm } from '@js-camp/core/models/anime-details-form';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';
import { ValidatedFormGroupType } from '@js-camp/core/models/validated-form';

/** Anime form component for anime editing or creation. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
})
export class AnimeFormComponent {
	private readonly formBuilder = inject(NonNullableFormBuilder);

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

	/** Anime details. */
	@Input() public set animeDetails(animeDetails: AnimeDetails | null) {
		if (animeDetails !== null) {
			this.animeDetailsForm.patchValue({
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
			});
		}
	}

	/** Form group for login. */
	protected readonly animeDetailsForm: ValidatedFormGroupType<AnimeDetailsForm> = this.formBuilder.group(
		{
			titleEng: ['', [Validators.required]],
			titleJpn: ['', [Validators.required]],
			imageUrl: '',
			imageFile: this.formBuilder.control<File | null>(null),
			airedStart: this.formBuilder.control<Date | null>(null),
			airedEnd: this.formBuilder.control<Date | null>(null),
			type: [this.formBuilder.control<AnimeType | null>(null), [Validators.required]],
			status: [this.formBuilder.control<AnimeStatus | null>(null), [Validators.required]],
			trailerYoutubeId: this.formBuilder.control<string | null>(null),
			source: [this.formBuilder.control<AnimeSource | null>(null), [Validators.required]],
			airing: [this.formBuilder.control<boolean | null>(null), [Validators.required]],
			rating: [this.formBuilder.control<AnimeRating | null>(null), [Validators.required]],
			season: [this.formBuilder.control<AnimeSeason | null>(null), [Validators.required]],
			synopsis: ['', [Validators.required]],
			studiosData: [this.formBuilder.control<readonly Studio[]>([]), [Validators.required]],
			genresData: [this.formBuilder.control<readonly Genre[]>([]), [Validators.required]],
		},
		{ updateOn: 'submit' },
	);

	/** On submit. */
	protected onSubmit(): void {
		console.log(this.animeDetailsForm.getRawValue());
	}

	/**
	 * Update studiosData value.
	 * @param newStudios New studios.
	 */
	protected updateStudios(newStudios: Studio[]): void {
		this.animeDetailsForm.controls.studiosData.setValue(newStudios);
	}

	/**
	 * Track by anime type.
	 * @param index Index.
	 * @param item Item.
	 */
	protected trackByItem<T>(index: number, item: T): T {
		return item;
	}
}
