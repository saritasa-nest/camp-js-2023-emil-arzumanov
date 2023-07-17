import { TurnGenerator } from './turnGenerator';
import { DiceGenerator } from './diceGenerator';
import { Player } from './player';
import { ResultDisplay } from './resultDisplay';

/** Game is class that collects all game components. */
class Game {
	/** Turn Generator. */
	private readonly turnGenerator: TurnGenerator;

	/* Dice Generator */
	private readonly diceGenerator: DiceGenerator;

	public constructor() {
		this.turnGenerator = new TurnGenerator();
		this.diceGenerator = new DiceGenerator();

		this.turnGenerator.subscribe(this.diceGenerator);

		for (let i = 0; i < this.turnGenerator.playersCount; i++) {
			const player = new Player(i);
			const resultDisplay = new ResultDisplay();

			this.diceGenerator.subscribe(player);
			player.subscribe(resultDisplay);

			resultDisplay.createCurrentPlayer(i);
		}

		const buttonStart = document.getElementById('nextRoll');
		if (buttonStart) {
			buttonStart.addEventListener('click', () => {
				this.turnGenerator.nextTurn();
			});
		}
	}
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Game();
