/* eslint-disable jsdoc/require-jsdoc */

interface Subscriber<T> {
	update: (val: T) => void;
}

class Publisher<T> {
	private readonly subscribers: Subscriber<T>[] = [];

	public constructor() {}

	public subscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx === -1) {
			this.subscribers.push(subscriber);
		}
	}

	public unsubscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx !== -1) {
			this.subscribers.splice(subIdx, 1);
		}
	}

	public notify(data: T): void {
		this.subscribers.forEach((sub: Subscriber<T>) => sub.update(data));
	}

	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex((sub: Subscriber<T>) => sub === subscriber);
	}
}

export class TurnGenerator extends Publisher<number> {
	private playersCount = 2;

	private currentPlayerIndex = 0;

	public constructor() {
		super();
		this.subscribe(new DiceGenerator(this.playersCount));
	}

	public nextTurn(): void {
		if (this.currentPlayerIndex < this.playersCount) {
			this.notify(this.currentPlayerIndex);
			this.currentPlayerIndex += 1;
		} else {
			this.currentPlayerIndex = 0;
			this.notify(this.currentPlayerIndex);
			this.currentPlayerIndex += 1;
		}
	}
}

interface IThrowData {
	diceResults: number;
	currentPlayerIndex: number;
}

class DiceGenerator extends Publisher<IThrowData> implements Subscriber<number> {
	private diceResult = 0;

	public constructor(playersCount: number) {
		super();
		for (let i = 0; i < playersCount; i++) {
			this.subscribe(new Player(i));
		}
	}

	public update(currentPlayerIndex: number): void {
		this.throwDiceAndSaveResults();
		this.notify({ diceResults: this.diceResult, currentPlayerIndex });
	}

	private throwDiceAndSaveResults(): void {
		const max = 6;
		const min = 1;
		this.diceResult = Math.floor(Math.random() * (max + 1 - min) + min);
	}
}

interface IPlayerData {
	result: number;
	playerIndex: number;
	winStatus: boolean;
	resultSum: number;
}

class Player extends Publisher<IPlayerData> implements Subscriber<IThrowData> {
	private results: number[] = [];

	private playerResultsSum = 0;

	private playerIndex = 0;

	private winStatus = false;

	public constructor(playerIndex: number) {
		super();
		this.playerIndex = playerIndex;
		this.subscribe(new ResultDisplay());
		new ResultDisplay().createPlayerUI(playerIndex);
	}

	public update(throwData: IThrowData): void {
		if (throwData.currentPlayerIndex === this.playerIndex) {
			this.results.push(throwData.diceResults);
			this.winStatus = this.checkIfWon(throwData.diceResults);
			this.notify({
				result: throwData.diceResults,
				playerIndex: this.playerIndex,
				winStatus: this.winStatus,
				resultSum: this.playerResultsSum,
			});
		}
	}

	private checkIfWon(diceResults: number): boolean {
		this.calculatePlayerResults(diceResults);
		if (this.playerResultsSum >= 21) {
			return true;
		}
		return false;
	}

	private calculatePlayerResults(diceResults: number): void {
		this.playerResultsSum += diceResults;
	}
}

class ResultDisplay implements Subscriber<IPlayerData> {
	private app = document.getElementById('game');

	private player = document.createElement('div');

	private playerH4 = document.createElement('h4');

	private playerSpan = document.createElement('span');

	private playerResultsDiv = document.createElement('div');

	private allPlayerResults = document.getElementById('allThrows');

	private diceCap = document.getElementById('diceCap');

	/*
	 *createPlayerUI method creates this layout and appends it in tag with id='game'
	 *<div id={playerData.playerIndex}>
	 *	<h4>Player1 - <span>{playerData.resultSum}</span></h4>
	 *	<div>
	 *		<p>{playerData.result}</p>
	 *	</div>
	 *</div>
	 */
	public createPlayerUI(playerIndex: number): void {
		if (this.app !== null && this.player !== null) {
			this.player.setAttribute('id', String(playerIndex));
			this.player.setAttribute('class', 'scoreWrapper');
			this.playerH4.innerHTML = `Player${playerIndex} - `;
			this.playerH4.append(this.playerSpan);
			this.player.append(this.playerH4);
			this.player.append(this.playerResultsDiv);
			this.app.append(this.player);
		}
	}

	public update(playerData: IPlayerData): void {
		const currentPlayer = document.getElementById(String(playerData.playerIndex));
		const playerResultP = document.createElement('p');
		const allPlayersResultP = document.createElement('p');
		if (currentPlayer !== null && this.allPlayerResults !== null && this.diceCap !== null && playerResultP !== null) {
			playerResultP.innerHTML = String(playerData.result);
			currentPlayer.getElementsByTagName('div')[0].append(playerResultP);
			currentPlayer.getElementsByTagName('span')[0].innerHTML = String(playerData.resultSum);
			allPlayersResultP.innerHTML = String(playerData.result);
			this.diceCap.getElementsByTagName('div')[0].append(allPlayersResultP);
			const diceCapSpan = this.diceCap.getElementsByTagName('span')[0];
			diceCapSpan.innerHTML = String(Number(diceCapSpan.innerText) + playerData.result);
			if (playerData.winStatus) {
				currentPlayer.className += ' winner';
			}
		}
	}
}

class Game {
	private turnGenerator = new TurnGenerator();

	private buttonStart = document.getElementById('nextRoll');

	public constructor() {
		if (this.buttonStart) {
			this.buttonStart.addEventListener('click', () => {
				this.turnGenerator.nextTurn();
			});
		}
	}
}

const game = new Game();
