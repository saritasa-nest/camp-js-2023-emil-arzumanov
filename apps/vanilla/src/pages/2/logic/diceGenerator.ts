import { Throw, Subscriber } from './types';
import { Publisher } from './publisher';

/**
 * Dice Generator emulates throw of dice.
 * Dice Generator is also subscriber of Turn Generator from './turnGenerator.ts'.
 * Dice Generator is also Publisher, his subscribers are instances of Player from './player.ts'.
 */
export class DiceGenerator extends Publisher<Throw> implements Subscriber<number> {
	/**
	 * @param currentPlayerIndex Index of player that throws dice in this turn.
	 */
	public update(currentPlayerIndex: number): void {
		/**
		 * Notifies subscribers which Player is making a move and
		 * what is his result on the current roll of the dice.
		 */
		this.notify({ diceRollResult: this.throwDice(1, 6), currentPlayerIndex });
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
