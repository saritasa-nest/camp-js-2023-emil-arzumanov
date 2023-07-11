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
	public constructor(playersCount: number) {
		super();
		for (let i = 0; i < playersCount; i++) {
			this.subscribe(new Player(i));
		}
	}

	public update(currentPlayerIndex: number): void {
		this.notify({ diceResults: this.throwDice(), currentPlayerIndex });
	}

	private throwDice(): number {
		const max = 6;
		const min = 1;
		return Math.round(Math.random() * (max - min) + min);
	}
}

interface IPlayerData {
	result: number;
	playerIndex: number;
	winStatus: boolean;
}

class Player extends Publisher<IPlayerData> implements Subscriber<IThrowData> {
	private results: number[] = [];

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
			this.winStatus = this.checkIfWon();
			this.notify({ result: throwData.diceResults, playerIndex: this.playerIndex, winStatus: this.winStatus });
		}
	}

	private checkIfWon(): boolean {
		let resultSum = 0;
		for (let i = 0; i < this.results.length; i++) {
			resultSum += this.results[i];
		}
		if (resultSum >= 21) {
			return true;
		}
		return false;
	}
}

class ResultDisplay implements Subscriber<IPlayerData> {
	private app = document.getElementById('game');

	private player = document.createElement('div');

	public createPlayerUI(playerIndex: number): void {
		if (this.app !== null && this.player !== null) {
			this.player.setAttribute('id', String(playerIndex));
			this.player.innerText = `player${playerIndex}: `;
			this.app.append(this.player);
		}
	}

	public update(playerData: IPlayerData): void {
		const currentPlayer = document.getElementById(String(playerData.playerIndex));
		if (currentPlayer) {
			currentPlayer.innerText += String(playerData.result);
			if (playerData.winStatus) {
				currentPlayer.className = 'winner';
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
