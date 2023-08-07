import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** Details of anime. */
@Component({
	selector: 'camp-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {

	private readonly route = inject(ActivatedRoute);

	public constructor() {
		const id = { ...this.route.snapshot.params };
		console.log(id['id']);
	}

}
