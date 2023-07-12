var u=Object.defineProperty;var a=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(a(r,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";class l{constructor(){n(this,"subscribers",[])}subscribe(t){this.getSubscriberIndex(t)===-1&&this.subscribers.push(t)}unsubscribe(t){const e=this.getSubscriberIndex(t);e!==-1&&this.subscribers.splice(e,1)}notify(t){this.subscribers.forEach(e=>e.update(t))}getSubscriberIndex(t){return this.subscribers.findIndex(e=>e===t)}}class o extends l{constructor(e=2){super();n(this,"currentPlayerIndex",0);this.playersCount=e}nextTurn(){this.currentPlayerIndex===this.playersCount&&(this.currentPlayerIndex=0),this.notify(this.currentPlayerIndex),this.currentPlayerIndex+=1}}class d extends l{constructor(){super();n(this,"diceRollResult",0)}update(e){this.throwDiceAndSaveResults(),this.notify({diceRollResult:this.diceRollResult,currentPlayerIndex:e})}throwDiceAndSaveResults(){this.diceRollResult=Math.floor(Math.random()*(6+1-1)+1)}}class p extends l{constructor(e){super();n(this,"diceRollResults",[]);n(this,"score",0);n(this,"winStatus",!1);this.playerIndex=e}update(e){e.currentPlayerIndex===this.playerIndex&&(this.calculatePlayerScore(e.diceRollResult),this.diceRollResults.push(e.diceRollResult),this.checkIfWon(),this.notify({result:e.diceRollResult,playerIndex:this.playerIndex,winStatus:this.winStatus,score:this.score}))}checkIfWon(){this.score>=21?this.winStatus=!0:this.winStatus=!1}calculatePlayerScore(e){this.score+=e}}class h{constructor(){n(this,"app",document.getElementById("game"));n(this,"allPlayerResults",document.getElementById("allThrows"));n(this,"diceCap",document.getElementById("diceCap"))}createCurrentPlayer(t){const e=document.createElement("div"),s=document.createElement("h4"),i=document.createElement("span"),c=document.createElement("div");this.app!==null&&e!==null&&(e.setAttribute("id",String(t)),e.setAttribute("class","scoreWrapper"),s.innerHTML=`Player${t} - `,s.append(i),e.append(s),e.append(c),this.app.append(e))}update(t){this.updateCurrentPlayer(t),this.updateDiceCap(t)}updateCurrentPlayer(t){const e=document.getElementById(String(t.playerIndex)),s=document.createElement("p");e!==null&&this.allPlayerResults!==null&&(s.innerHTML=String(t.result),e.getElementsByTagName("div")[0].append(s),e.getElementsByTagName("span")[0].innerHTML=String(t.score),t.winStatus&&(e.className+=" winner"))}updateDiceCap(t){const e=document.createElement("p");if(e!==null&&this.diceCap!==null){e.innerHTML=String(t.result),this.diceCap.getElementsByTagName("div")[0].append(e);const s=this.diceCap.getElementsByTagName("span")[0];s.innerHTML=String(Number(s.innerText)+t.result)}}}class m{constructor(){n(this,"turnGenerator");n(this,"diceGenerator");this.turnGenerator=new o,this.diceGenerator=new d,this.turnGenerator.subscribe(this.diceGenerator);for(let e=0;e<this.turnGenerator.playersCount;e++){const s=new p(e),i=new h;this.diceGenerator.subscribe(s),s.subscribe(i),i.createCurrentPlayer(e)}const t=document.getElementById("nextRoll");t&&t.addEventListener("click",()=>{this.turnGenerator.nextTurn()})}}new m;
