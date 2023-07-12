import { Publisher } from './publisher';

/**
 * Turn Generator emulates one turn. It is Publisher,
 * his subscriber is Dice Generator from 'diceGenerator.ts'.
 */
export class TurnGenerator extends Publisher<number> {
	/**
	 * @param currentPlayerIndex Player that will make turn.
	 */
	private currentPlayerIndex = 0;

	/**
	 * @param playersCount How many players will participate in game.
	 */
	public constructor(public playersCount: number = 2) {
		super();
	}

	/**
	 * Initiates one turn and notifies subscribers which player made turn
	 * by sending currentPlayerIndex to subscriber.
	 */
	public nextTurn(): void {
		if (this.currentPlayerIndex === this.playersCount) {
			this.currentPlayerIndex = 0;
		}
		this.notify(this.currentPlayerIndex);
		this.currentPlayerIndex += 1;
	}
}
