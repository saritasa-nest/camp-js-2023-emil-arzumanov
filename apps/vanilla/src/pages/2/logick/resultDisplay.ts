/* eslint-disable jsdoc/require-jsdoc */

import { IPlayer, Subscriber } from './types';

export class ResultDisplay implements Subscriber<IPlayer> {
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

	public update(playerData: IPlayer): void {
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

	private updateCurrentPlayer(playerData: IPlayer): void {
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

	private updateDiceCap(playerData: IPlayer): void {
		const allPlayersResultP = document.createElement('p');
		if (allPlayersResultP !== null && this.diceCap !== null) {
			allPlayersResultP.innerHTML = String(playerData.result);
			this.diceCap.getElementsByTagName('div')[0].append(allPlayersResultP);
			const diceCapSpan = this.diceCap.getElementsByTagName('span')[0];
			diceCapSpan.innerHTML = String(Number(diceCapSpan.innerText) + playerData.result);
		}
	}
}
