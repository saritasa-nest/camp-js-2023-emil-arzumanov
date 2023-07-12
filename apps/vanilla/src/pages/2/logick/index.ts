/* eslint-disable jsdoc/require-jsdoc */

import { TurnGenerator } from './turnGenerator';
import { DiceGenerator } from './diceGenerator';
import { Player } from './player';
import { ResultDisplay } from './resultDisplay';

class Game {
	private turnGenerator = new TurnGenerator();

	private diceGenerator = new DiceGenerator();

	private buttonStart = document.getElementById('nextRoll');

	public constructor() {
		this.turnGenerator.subscribe(this.diceGenerator);
		for (let i = 0; i < this.turnGenerator.playersCount; i++) {
			const player = new Player(i);
			this.diceGenerator.subscribe(player);
			const resultDisplay = new ResultDisplay();
			player.subscribe(resultDisplay);
			resultDisplay.createCurrentPlayer(i);
		}
		if (this.buttonStart) {
			this.buttonStart.addEventListener('click', () => {
				this.turnGenerator.nextTurn();
			});
		}
	}
}

const game = new Game();
