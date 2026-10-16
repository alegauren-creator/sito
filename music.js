/* Musica di sottofondo: "Calm Ambient 3 (Lifewave 2k)" di The Cynic Project (cynicmusic.com / pixelsphere.org)
   Fonte: https://opengameart.org/content/calm-ambient-3-lifewave-2k  Licenza: CC0 1.0 (pubblico dominio)
   Due lettori in dissolvenza incrociata per un loop senza stacchi. */
(()=>{const btn=document.getElementById('music'),KEY='ag-music',SRC='audio/lifewave-2k.mp3',VOL=.5,XF=7;
let on=false,players=[],cur=0,fadeT=null,tick=null;
const mk=()=>{const a=new Audio(SRC);a.preload='none';a.volume=0;return a};
const ramp=(a,to,ms,done)=>{const from=a.volume,t0=performance.now();const st=()=>{const k=Math.min(1,(performance.now()-t0)/ms);a.volume=from+(to-from)*k;if(k<1)a._r=requestAnimationFrame(st);else done&&done()};cancelAnimationFrame(a._r);st()};
const loopWatch=()=>{clearInterval(tick);tick=setInterval(()=>{const a=players[cur];if(!on||!a.duration)return;if(a.duration-a.currentTime<XF&&!a._x){a._x=1;const n=players[1-cur];n.currentTime=0;n._x=0;n.play().catch(()=>{});ramp(n,VOL,XF*1000);ramp(a,0,XF*1000,()=>a.pause());cur=1-cur}},250)};
const start=()=>{if(!players.length)players=[mk(),mk()];const a=players[cur];a._x=0;const p=a.play();if(p)p.catch(()=>{on=false;ui()});ramp(a,VOL,3000);loopWatch()};
const stop=()=>{clearInterval(tick);players.forEach(a=>ramp(a,0,2000,()=>a.pause()))};
const ui=()=>{btn.classList.toggle('on',on);btn.setAttribute('aria-pressed',on);btn.setAttribute('aria-label',on?'Disattiva musica':'Attiva musica rilassante');btn.querySelector('.t').textContent=on?'Musica attiva':'Musica rilassante'};
btn.onclick=()=>{on=!on;localStorage.setItem(KEY,on?'1':'0');on?start():stop();ui()};ui();
if(localStorage.getItem(KEY)==='1'){const go=e=>{if(e.target.closest&&e.target.closest('#music'))return;rm();on=true;start();ui()};const rm=()=>['pointerdown','keydown'].forEach(v=>removeEventListener(v,go,true));['pointerdown','keydown'].forEach(v=>addEventListener(v,go,true))}
})();
