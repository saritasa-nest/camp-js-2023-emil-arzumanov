/* eslint-disable jsdoc/require-jsdoc */

import { IThrow, Subscriber } from './types';
import { Publisher } from './publisher';

export class DiceGenerator extends Publisher<IThrow> implements Subscriber<number> {
	private diceResult = 0;

	public constructor() {
		super();
	}

	public update(currentPlayerIndex: number): void {
		this.throwDiceAndSaveResults();
		this.notify({ diceResults: this.diceResult, currentPlayerIndex });
	}

	private throwDiceAndSaveResults(): void {
		const max = 6;
		const min = 1;
		this.diceResult = Math.floor(Math.random() * (max + 1 - min) + min);
	}
}
