import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'camp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {}
