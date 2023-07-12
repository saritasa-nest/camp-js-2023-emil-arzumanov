/* eslint-disable jsdoc/require-jsdoc */

import { Publisher } from './publisher';

export class TurnGenerator extends Publisher<number> {
	private currentPlayerIndex = 0;

	public constructor(public playersCount: number = 2) {
		super();
	}

	public nextTurn(): void {
		if (this.currentPlayerIndex === this.playersCount) {
			this.currentPlayerIndex = 0;
		}
		this.notify(this.currentPlayerIndex);
		this.currentPlayerIndex += 1;
	}
}
