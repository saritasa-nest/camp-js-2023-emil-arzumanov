import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Component for anime creation. */
@Component({
	selector: 'camp-anime-create',
	templateUrl: './anime-create.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCreateComponent {}
