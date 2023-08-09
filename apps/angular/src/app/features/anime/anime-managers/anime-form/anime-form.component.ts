import { Component, Input, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { AnimeDetailsForm } from '@js-camp/core/models/anime-details-form';
import { ValidatedFormGroupType } from '@js-camp/core/models/validated-form';

/** Anime form component for anime editing or creation. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
})
export class AnimeFormComponent {
	private readonly formBuilder = inject(NonNullableFormBuilder);

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
			titleEng: '',
			titleJpn: '',
			imageUrl: '',
			imageFile: null,
			airedStart: null,
			airedEnd: null,
			type: null,
			status: null,
			trailerYoutubeId: null,
			source: null,
			airing: false,
			rating: null,
			season: null,
			synopsis: '',
			studiosData: [],
			genresData: [],
		},
		{ updateOn: 'submit' },
	);
}
