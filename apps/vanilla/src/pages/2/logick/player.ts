import { Throw, PlayerInterface, Subscriber } from './types';
import { Publisher } from './publisher';

/**
 * Player emulates player.
 * Player is subscriber of Dice Generator from './diceGenerator.ts'.
 * Player is also Publisher, his subscriber is Result Display from './resultDisplay.ts'.
 */
export class Player extends Publisher<PlayerInterface> implements Subscriber<Throw> {
	/**
	 * @param score Array of dice roll results.
	 */
	private diceRollResults: number[] = [];

	/**
	 * @param score Score of player. Sum of all dice rolls made by player.
	 */
	private score = 0;

	/**
	 * @param winStatus Shows if player won. If 'true' - player won.
	 */
	private winStatus = false;

	/**
	 * @param playerIndex Index of this player.
	 */
	public constructor(private playerIndex: number) {
		super();
	}

	/**
	 * Checks if this player is the one that made turn.
	 * If its true:
	 * Adds result of dice roll to score of this player.
	 * Adds result of dice roll to array of dice roll results.
	 * Checks if player won.
	 * Notifies subscriber and send him: dice roll result, index, win status and score. Of this player.
	 * @param throwData Object that contains two params 'diceRollResult' and 'currentPlayerIndex'.
	 * @param diceRollResult Result of dice roll made in current turn.
	 * @param currentPlayerIndex Index of player that made turn.
	 */
	public update(throwData: Throw): void {
		if (throwData.currentPlayerIndex === this.playerIndex) {
			this.calculatePlayerScore(throwData.diceRollResult);
			this.diceRollResults.push(throwData.diceRollResult);
			this.checkIfWon();
			this.notify({
				result: throwData.diceRollResult,
				playerIndex: this.playerIndex,
				winStatus: this.winStatus,
				score: this.score,
			});
		}
	}

	/**
	 * Sets winStatus on 'true' if score of this Player is higher than 21.
	 * Which means that player won.
	 */
	private checkIfWon(): void {
		if (this.score >= 21) {
			this.winStatus = true;
		} else {
			this.winStatus = false;
		}
	}

	/**
	 * Adds result of dice to roll to score of player.
	 * @param diceRollResult Result of dice roll made in current turn.
	 */
	private calculatePlayerScore(diceRollResult: number): void {
		this.score += diceRollResult;
	}
}
