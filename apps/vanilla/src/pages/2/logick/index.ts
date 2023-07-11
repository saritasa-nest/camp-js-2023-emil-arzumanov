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
		new UICreator().createAllPlayersUI(this.playersCount);
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

class DiceGenerator extends Publisher<object> implements Subscriber<number> {
	public constructor(playersCount: number) {
		super();
		for (let i = 0; i < playersCount; i++) {
			this.subscribe(new Player(i));
		}
	}

	public update(): void {
		this.notify({ diceResults: this.throwDice(), currentPlayerIndex: this.currentPlayerIndex });
	}

	private throwDice(): number {
		const max = 6;
		const min = 1;
		return Math.round(Math.random() * (max - min) + min);
	}
}

class Player extends Publisher<number> implements Subscriber<number> {
	private readonly results: number[] = [];

	private playerIndex = 0;

	private winStatus = false;

	public constructor(playerIndex: number) {
		super();
		this.playerIndex = playerIndex;
	}

	public update(diceResults: number): void {
		this.results.push(diceResults);
		this.winStatus = this.checkIfWon();
		new UICreator().addResultToPlayerInput(diceResults, this.playerIndex);
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

class UICreator {
	private app = document.getElementById('game');

	public createAllPlayersUI(playersCount: number): void {
		for (let i = 0; i < playersCount; i++) {
			const player = document.createElement('div');
			if (this.app !== null && player !== null) {
				player.setAttribute('id', String(i));
				player.innerText = '0';
				this.app.append(player);
			}
		}
	}

	public addResultToPlayerInput(throwResult: number, playerIndex: number): void {
		const player = document.getElementById(String(playerIndex));
		if (player) {
			player.innerText += String(throwResult);
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
