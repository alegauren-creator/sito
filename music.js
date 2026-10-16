// Musica spa generata con Web Audio: pad morbidi, campanelli, acqua leggera
(()=>{const btn=document.getElementById('music');let ctx,master,verb,on=false,timers=[],started=false;
const KEY='ag-music';
const init=()=>{ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=0;
 const comp=ctx.createDynamicsCompressor();comp.threshold.value=-20;master.connect(comp).connect(ctx.destination);
 verb=ctx.createConvolver();const L=ctx.sampleRate*5,b=ctx.createBuffer(2,L,ctx.sampleRate);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.8)}verb.buffer=b;
 const vg=ctx.createGain();vg.gain.value=.6;verb.connect(vg).connect(master)};
const bus=(dry,wet)=>{const g=ctx.createGain();g.gain.value=dry;g.connect(master);const w=ctx.createGain();w.gain.value=wet;g.connect(w).connect(verb);return g};
const CH=[[146.83,220,293.66,369.99],[130.81,196,261.63,329.63],[110,164.81,220,277.18],[123.47,185,246.94,293.66]];
const NOTES=[587.33,659.25,739.99,880,987.77,1174.66,1318.5];
let padBus,pads=[];
const playChord=(fr)=>{const t=ctx.currentTime,f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=700;f.Q.value=.4;const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+6);g.gain.setValueAtTime(.16,t+12);g.gain.linearRampToValueAtTime(0,t+20);f.connect(g).connect(padBus);
 fr.forEach((q,i)=>[-6,6].forEach(dt=>{const o=ctx.createOscillator();o.type=i%2?'sine':'triangle';o.frequency.value=q;o.detune.value=dt;const og=ctx.createGain();og.gain.value=.22/fr.length;o.connect(og).connect(f);o.start(t);o.stop(t+21)}))};
const bell=()=>{const t=ctx.currentTime,fq=NOTES[Math.floor(Math.random()*NOTES.length)],v=.05+Math.random()*.04,p=ctx.createStereoPanner?ctx.createStereoPanner():null,dst=bus(.6,.9);let o2=dst;if(p){p.pan.value=Math.random()*1.4-.7;p.connect(dst);o2=p}
 [1,2.76,5.4].forEach((m,i)=>{const o=ctx.createOscillator();o.frequency.value=fq*m;const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v/(i*2+1),t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+5/(i+1));o.connect(g).connect(o2);o.start(t);o.stop(t+5.2)})};
const water=()=>{const L=ctx.sampleRate*4,b=ctx.createBuffer(1,L,ctx.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<L;i++){l=(l+.02*(Math.random()*2-1))/1.02;d[i]=l*3.5}
 const s=ctx.createBufferSource();s.buffer=b;s.loop=true;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=600;f.Q.value=.6;const g=ctx.createGain();g.gain.value=.05;
 const lo=ctx.createOscillator(),lg=ctx.createGain();lo.frequency.value=.07;lg.gain.value=250;lo.connect(lg).connect(f.frequency);lo.start();s.connect(f).connect(g).connect(bus(1,.3));s.start()};
const every=(a,b,fn)=>{const l=()=>{fn();timers.push(setTimeout(l,a+Math.random()*(b-a)))};l()};
const start=()=>{if(!ctx)init();if(!started){started=true;padBus=bus(.8,.7);let k=0;every(10000,10000,()=>playChord(CH[k++%CH.length]));timers.push(setTimeout(()=>every(2500,7000,bell),3000));water()}
 ctx.resume();const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(.55,t+3)};
const stop=()=>{if(!ctx)return;const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(0,t+2);setTimeout(()=>{if(!on)ctx.suspend()},2200)};
const ui=()=>{btn.classList.toggle('on',on);btn.setAttribute('aria-pressed',on);btn.setAttribute('aria-label',on?'Disattiva musica':'Attiva musica rilassante');btn.querySelector('.t').textContent=on?'Musica attiva':'Musica rilassante'};
btn.onclick=()=>{on=!on;localStorage.setItem(KEY,on?'1':'0');on?start():stop();ui()};
ui();
// se l'utente l'aveva attivata, riparte al primo tocco/clic sulla pagina (i browser bloccano l'autoplay)
if(localStorage.getItem(KEY)==='1'){btn.classList.add('wait');const go=e=>{if(e.target.closest('#music'))return;on=true;start();ui();btn.classList.remove('wait');rm()};const rm=()=>['pointerdown','keydown'].forEach(v=>removeEventListener(v,go,true));['pointerdown','keydown'].forEach(v=>addEventListener(v,go,true))}
})();
