/** Subscriber is interface that describes a subscriber. */
export interface Subscriber<T> {

	/**
	 * Describes update function in subscriber.
	 * @param val Data that subscriber gets from Publisher.
	 */
	update: (val: T) => void;
}

/** Throw is interface that describes data of one dice throw. */
export interface Throw {

	/** Result of dice roll. */
	diceRollResult: number;

	/** Index of player that made dice roll. */
	currentPlayerIndex: number;
}

/** Player is interface that describes data of one player. */
export interface PlayerInterface {

	/** Result of dice roll made by player. */
	result: number;

	/** Index of player ( 'id' of players layout). */
	playerIndex: number;

	/** Tells if player won ( 'true' if won ). */
	winStatus: boolean;

	/** Score of player. Sum of all of his dice rolls throughout the game. */
	score: number;
}
