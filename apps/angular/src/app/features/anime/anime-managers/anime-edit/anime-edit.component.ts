import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { switchMap } from 'rxjs';

/** Component for anime editing. */
@Component({
	selector: 'camp-anime-edit',
	templateUrl: './anime-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditComponent {
	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	/** Anime details. */
	protected readonly animeDetails$ = this.route.params.pipe(
		switchMap(params => this.animeService.getAnimeDetails(params['id'])),
	);
}
