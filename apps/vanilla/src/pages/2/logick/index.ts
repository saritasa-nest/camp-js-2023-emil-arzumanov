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
		if (this.currentPlayerIndex === this.playersCount) {
			this.currentPlayerIndex = 0;
		}
		this.notify(this.currentPlayerIndex);
		this.currentPlayerIndex += 1;
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
	private resultsArray: number[] = [];

	private playerResultsSum = 0;

	private playerIndex = 0;

	private winStatus = false;

	public constructor(playerIndex: number) {
		super();
		this.playerIndex = playerIndex;
		this.subscribe(new ResultDisplay());
		new ResultDisplay().createCurrentPlayer(playerIndex);
	}

	public update(throwData: IThrowData): void {
		if (throwData.currentPlayerIndex === this.playerIndex) {
			this.calculatePlayerResults(throwData.diceResults);
			this.resultsArray.push(throwData.diceResults);
			this.winStatus = this.checkIfWon();
			this.notify({
				result: throwData.diceResults,
				playerIndex: this.playerIndex,
				winStatus: this.winStatus,
				resultSum: this.playerResultsSum,
			});
		}
	}

	private checkIfWon(): boolean {
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

	private allPlayerResults = document.getElementById('allThrows');

	private diceCap = document.getElementById('diceCap');

	/*
	 *createCurrentPlayer method creates this layout and appends it in tag with id='game'
	 *<div id='playerIndex'>
	 *	<h4>Player1 - <span></span></h4>
	 *	<div></div>
	 *</div>
	 */
	public createCurrentPlayer(playerIndex: number): void {
		const playerDiv = document.createElement('div');
		const playerH4 = document.createElement('h4');
		const playerH4Span = document.createElement('span');
		const playerResultsWrapper = document.createElement('div');
		if (this.app !== null && playerDiv !== null) {
			playerDiv.setAttribute('id', String(playerIndex));
			playerDiv.setAttribute('class', 'scoreWrapper');
			playerH4.innerHTML = `Player${playerIndex} - `;
			playerH4.append(playerH4Span);
			playerDiv.append(playerH4);
			playerDiv.append(playerResultsWrapper);
			this.app.append(playerDiv);
		}
	}

	public update(playerData: IPlayerData): void {
		this.updateCurrentPlayer(playerData);
		this.updateDiceCap(playerData);
	}

	/*
	 *createCurrentPlayer method creates this layout and appends it in tag with id='game'
	 *<div id='playerIndex'>
	 *	<h4>Player1 - <span>resultSum</span></h4>
	 *	<div>
	 *		<p>playerData.result</p>
	 *	</div>
	 *</div>
	 */

	private updateCurrentPlayer(playerData: IPlayerData): void {
		const currentPlayer = document.getElementById(String(playerData.playerIndex));
		const playerResultP = document.createElement('p');
		if (currentPlayer !== null && this.allPlayerResults !== null) {
			playerResultP.innerHTML = String(playerData.result);
			currentPlayer.getElementsByTagName('div')[0].append(playerResultP);
			currentPlayer.getElementsByTagName('span')[0].innerHTML = String(playerData.resultSum);
			if (playerData.winStatus) {
				currentPlayer.className += ' winner';
			}
		}
	}

	private updateDiceCap(playerData: IPlayerData): void {
		const allPlayersResultP = document.createElement('p');
		if (allPlayersResultP !== null && this.diceCap !== null) {
			allPlayersResultP.innerHTML = String(playerData.result);
			this.diceCap.getElementsByTagName('div')[0].append(allPlayersResultP);
			const diceCapSpan = this.diceCap.getElementsByTagName('span')[0];
			diceCapSpan.innerHTML = String(Number(diceCapSpan.innerText) + playerData.result);
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
