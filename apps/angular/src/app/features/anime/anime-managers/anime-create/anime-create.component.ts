import { Component } from '@angular/core';
import { SubmitType } from '@js-camp/core/models/anime-managers';

/** Component for anime creation. */
@Component({
	selector: 'camp-anime-create',
	templateUrl: './anime-create.component.html',
})
export class AnimeCreateComponent {
	/** Type of submit. */
	protected readonly submitType = SubmitType.Create;
}
