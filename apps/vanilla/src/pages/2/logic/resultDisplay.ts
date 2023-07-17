import { PlayerInterface, Subscriber } from './types';

/**
 * Result Display creates layout and updates it.
 * Result Display is subscriber of Player from './player.ts'.
 */
export class ResultDisplay implements Subscriber<PlayerInterface> {
	/** Link to tag with id='game'. */
	private readonly app = document.getElementById('game');

	/** Link to tag that displays all results of dice rolls made by player. */
	private readonly allPlayerResults = document.getElementById('allThrows');

	/** Link to tag that displays all results of dice rolls made by all players. */
	private readonly diceCap = document.getElementById('diceCap');

	/**
	 * Creates this layout and appends it in tag with id='game'. This layout represents a Player.
	 * <div id='playerIndex'>
	 *	 <h4>Player1 - <span></span></h4>
	 *	 <div></div>
	 * </div>.
	 * @param playerIndex Index of element that displays data of this player ( 'id' of tag ).
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

	/**
	 * @param playerData Object that contains data of player that needs to be displayed.
	 * Object 'playerData' contains: .
	 * Field result Result of dice roll made by player.
	 * Field playerIndex Index of player ( 'id' of players layout).
	 * Field winStatus Tells if player won ( 'true' if won ).
	 * Field score Score of player. Sum of all of his dice rolls throughout the game.
	 */
	public update(playerData: PlayerInterface): void {
		this.updateCurrentPlayer(playerData);
		this.updateDiceCap(playerData);
	}

	/**
	 * Updates layout of player. This layout represent a Player:
	 * <div id='playerIndex'> (this is wrapper 'div')
	 *	 <h4>Player1 - <span></span></h4>
	 *	 <div></div> (this is inner 'div')
	 * </div>.
	 * Code below updates innerHTML of 'span' tag that contains score of player.
	 * Appends 'p' in inner 'div'. Each 'p' tag represents each dice roll result of player.
	 * Adds class 'winner' to wrapper 'div' if winStatus='true', which means that player won.
	 * @param playerData Object that contains data of player that needs to be displayed.
	 */
	private updateCurrentPlayer(playerData: PlayerInterface): void {
		const currentPlayer = document.getElementById(String(playerData.playerIndex));
		const playerResultP = document.createElement('p');
		if (currentPlayer !== null && this.allPlayerResults !== null) {
			playerResultP.innerHTML = String(playerData.result);
			currentPlayer.getElementsByTagName('div')[0].append(playerResultP);
			currentPlayer.getElementsByTagName('span')[0].innerHTML = String(playerData.score);
			if (playerData.winStatus) {
				currentPlayer.className += ' winner';
			}
		}
	}

	/**
	 * Updates layout of dice cap. This layout represent a dice cap:
	 * <div class="scoreWrapper" id="diceCap"> (this is wrapper 'div')
	 *  <h4>Dice cap - <span></span></h4>
	 *  <div id="allThrows"></div> (this is inner 'div')
	 * </div>
	 * InnerHTML of 'span' tag that contains score of all players combined.
	 * Appends 'p' in inner 'div'. Each 'p' tag represents each dice roll result.
	 * @param playerData Object that contains data of player that needs to be displayed.
	 */
	private updateDiceCap(playerData: PlayerInterface): void {
		const allPlayersResultP = document.createElement('p');
		if (allPlayersResultP !== null && this.diceCap !== null) {
			allPlayersResultP.innerHTML = String(playerData.result);
			this.diceCap.getElementsByTagName('div')[0].append(allPlayersResultP);
			const diceCapSpan = this.diceCap.getElementsByTagName('span')[0];
			diceCapSpan.innerHTML = String(Number(diceCapSpan.innerText) + playerData.result);
		}
	}
}
