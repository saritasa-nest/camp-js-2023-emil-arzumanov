/* eslint-disable jsdoc/require-jsdoc */

export interface Subscriber<T> {
	update: (val: T) => void;
}

export interface IThrow {
	diceResults: number;
	currentPlayerIndex: number;
}

export interface IPlayer {
	result: number;
	playerIndex: number;
	winStatus: boolean;
	resultSum: number;
}
