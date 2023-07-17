import { Throw, Subscriber } from './types';
import { Publisher } from './publisher';

/**
 * Dice Generator emulates throw of dice.
 * Dice Generator is also subscriber of Turn Generator from './turnGenerator.ts'.
 * Dice Generator is also Publisher, his subscribers are instances of Player from './player.ts'.
 */
export class DiceGenerator extends Publisher<Throw> implements Subscriber<number> {
	/** The result that rolled out when the dice was thrown. */
	private diceRollResult = 0;

	/**
	 * @param currentPlayerIndex Index of player that throws dice in this turn.
	 */
	public update(currentPlayerIndex: number): void {
		/** Saves dice roll result in diceRollResult. */
		this.diceRollResult = this.throwDice(1, 6);

		/**
		 * Notifies subscribers which Player is making a move and
		 * what is his result on the current roll of the dice.
		 */
		this.notify({ diceRollResult: this.diceRollResult, currentPlayerIndex });
	}

	/**
	 * Generates random number from min to max,
	 * including both min and max.
	 * @param min Minimal number that could be generated.
	 * @param max Maximal number that could be generated.
	 */
	private throwDice(min: number, max: number): number {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	}
}
