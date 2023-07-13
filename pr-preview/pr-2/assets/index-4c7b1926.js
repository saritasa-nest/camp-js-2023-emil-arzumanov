var u=Object.defineProperty;var a=(n,t,e)=>t in n?u(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(a(n,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";class l{constructor(){r(this,"subscribers",[])}subscribe(t){this.getSubscriberIndex(t)===-1&&Array.isArray(this.subscribers)&&this.subscribers.push(t)}unsubscribe(t){const e=this.getSubscriberIndex(t);e!==-1&&Array.isArray(this.subscribers)&&this.subscribers.splice(e,1)}notify(t){this.subscribers.forEach(e=>e.update(t))}getSubscriberIndex(t){return this.subscribers.findIndex(e=>e===t)}}class d extends l{constructor(e=2){super();r(this,"currentPlayerIndex",0);this.playersCount=e}nextTurn(){this.currentPlayerIndex===this.playersCount&&(this.currentPlayerIndex=0),this.notify(this.currentPlayerIndex),this.currentPlayerIndex+=1}}class o extends l{constructor(){super();r(this,"diceRollResult",0)}update(e){this.throwDiceAndSaveResults(1,6),this.notify({diceRollResult:this.diceRollResult,currentPlayerIndex:e})}throwDiceAndSaveResults(e,s){this.diceRollResult=Math.floor(Math.random()*(s+1-e)+e)}}class p extends l{constructor(e){super();r(this,"diceRollResults",[]);r(this,"score",0);r(this,"winStatus",!1);this.playerIndex=e}update(e){e.currentPlayerIndex===this.playerIndex&&(this.calculatePlayerScore(e.diceRollResult),this.diceRollResults.push(e.diceRollResult),this.checkIfWon(),this.notify({result:e.diceRollResult,playerIndex:this.playerIndex,winStatus:this.winStatus,score:this.score}))}checkIfWon(){this.score>=21?this.winStatus=!0:this.winStatus=!1}calculatePlayerScore(e){this.score+=e}}class h{constructor(){r(this,"app",document.getElementById("game"));r(this,"allPlayerResults",document.getElementById("allThrows"));r(this,"diceCap",document.getElementById("diceCap"))}createCurrentPlayer(t){const e=document.createElement("div"),s=document.createElement("h4"),i=document.createElement("span"),c=document.createElement("div");this.app!==null&&e!==null&&(e.setAttribute("id",String(t)),e.setAttribute("class","scoreWrapper"),s.innerHTML=`Player${t} - `,s.append(i),e.append(s),e.append(c),this.app.append(e))}update(t){this.updateCurrentPlayer(t),this.updateDiceCap(t)}updateCurrentPlayer(t){const e=document.getElementById(String(t.playerIndex)),s=document.createElement("p");e!==null&&this.allPlayerResults!==null&&(s.innerHTML=String(t.result),e.getElementsByTagName("div")[0].append(s),e.getElementsByTagName("span")[0].innerHTML=String(t.score),t.winStatus&&(e.className+=" winner"))}updateDiceCap(t){const e=document.createElement("p");if(e!==null&&this.diceCap!==null){e.innerHTML=String(t.result),this.diceCap.getElementsByTagName("div")[0].append(e);const s=this.diceCap.getElementsByTagName("span")[0];s.innerHTML=String(Number(s.innerText)+t.result)}}}class y{constructor(){r(this,"turnGenerator");r(this,"diceGenerator");this.turnGenerator=new d,this.diceGenerator=new o,this.turnGenerator.subscribe(this.diceGenerator);for(let e=0;e<this.turnGenerator.playersCount;e++){const s=new p(e),i=new h;this.diceGenerator.subscribe(s),s.subscribe(i),i.createCurrentPlayer(e)}const t=document.getElementById("nextRoll");t&&t.addEventListener("click",()=>{this.turnGenerator.nextTurn()})}}new y;
