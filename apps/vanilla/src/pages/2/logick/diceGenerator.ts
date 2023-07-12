import { IThrow, Subscriber } from './types';
import { Publisher } from './publisher';

/**
 * Dice Generator emulates throw of dice. It is subscriber of Turn Generator.
 * It is also Publisher, his subscribers are instances of Player from 'player.ts'.
 */
export class DiceGenerator extends Publisher<IThrow> implements Subscriber<number> {
	/**
	 * @param diceResult The result that rolled out when the dice was thrown.
	 */
	private diceResult = 0;

	public constructor() {
		super();
	}

	/**
	 * @param currentPlayerIndex Index of player that throws dice in this turn.
	 */
	public update(currentPlayerIndex: number): void {
		this.throwDiceAndSaveResults();
		this.notify({ diceResults: this.diceResult, currentPlayerIndex });
	}

	/**
	 *
	 */
	private throwDiceAndSaveResults(): void {
		const max = 6;
		const min = 1;
		this.diceResult = Math.floor(Math.random() * (max + 1 - min) + min);
	}
}
