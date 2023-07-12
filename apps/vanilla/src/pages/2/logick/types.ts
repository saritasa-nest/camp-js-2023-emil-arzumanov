/* eslint-disable jsdoc/require-jsdoc */

export interface Subscriber<T> {
	update: (val: T) => void;
}

export interface IThrow {
	diceRollResult: number;
	currentPlayerIndex: number;
}

export interface IPlayer {
	result: number;
	playerIndex: number;
	winStatus: boolean;
	score: number;
}
