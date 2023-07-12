/* eslint-disable jsdoc/require-jsdoc */

import { IThrow, IPlayer, Subscriber } from './types';
import { Publisher } from './publisher';

export class Player extends Publisher<IPlayer> implements Subscriber<IThrow> {
	private resultsArray: number[] = [];

	private playerResultsSum = 0;

	private winStatus = false;

	public constructor(private playerIndex: number = 0) {
		super();
	}

	public update(throwData: IThrow): void {
		if (throwData.currentPlayerIndex === this.playerIndex) {
			this.calculatePlayerResults(throwData.diceResults);
			this.resultsArray.push(throwData.diceResults);
			this.winStatus = this.checkIfWon();
			this.notify({
				result: throwData.diceResults,
				playerIndex: this.playerIndex,
				winStatus: this.winStatus,
				resultSum: this.playerResultsSum,
			});
		}
	}

	private checkIfWon(): boolean {
		if (this.playerResultsSum >= 21) {
			return true;
		}
		return false;
	}

	private calculatePlayerResults(diceResults: number): void {
		this.playerResultsSum += diceResults;
	}
}
