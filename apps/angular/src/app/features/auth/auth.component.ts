import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Auth component. */
@Component({
	selector: 'camp-auth',
	templateUrl: './auth.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
