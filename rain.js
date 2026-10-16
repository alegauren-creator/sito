// Pioggia sul vetro: gocce trasparenti generate su canvas
(()=>{const c=document.getElementById('rain');if(!c||matchMedia('(prefers-reduced-motion: reduce)').matches){if(c)c.style.display='none';return}
const x=c.getContext('2d');const dpr=Math.min(devicePixelRatio||1,2);let W,H,beads=[],drops=[],trails=[],run=true;
const sprite=(()=>{const s=document.createElement('canvas'),S=128;s.width=s.height=S;const g=s.getContext('2d'),m=S/2,r=S*.42;
 // corpo lente: centro chiaro, bordo scuro (rifrazione invertita)
 let q=g.createRadialGradient(m,m+r*.25,r*.1,m,m,r);q.addColorStop(0,'rgba(235,248,248,.28)');q.addColorStop(.6,'rgba(170,205,210,.10)');q.addColorStop(.88,'rgba(20,50,60,.15)');q.addColorStop(1,'rgba(10,30,40,.0)');
 g.fillStyle=q;g.beginPath();g.arc(m,m,r,0,7);g.fill();
 // ombra in basso
 g.strokeStyle='rgba(8,30,38,.18)';g.lineWidth=S*.03;g.beginPath();g.arc(m,m+S*.012,r*.93,.15*Math.PI,.85*Math.PI);g.stroke();
 // bordo luminoso in basso (luce rifratta)
 g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=S*.018;g.beginPath();g.arc(m,m,r*.8,.25*Math.PI,.75*Math.PI);g.stroke();
 // riflesso in alto
 q=g.createRadialGradient(m-r*.35,m-r*.4,0,m-r*.35,m-r*.4,r*.32);q.addColorStop(0,'rgba(255,255,255,.95)');q.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=q;g.beginPath();g.ellipse(m-r*.35,m-r*.42,r*.3,r*.2,-.6,0,7);g.fill();
 return s})();
const draw=(px,py,r,a=1)=>{x.globalAlpha=a;x.drawImage(sprite,px-r*1.19,py-r*1.32,r*2.38,r*2.64)};
const area=()=>W*H;
const reset=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
 const k=W<700?.55:1;beads=Array.from({length:Math.round(area()/14000*k)},()=>bead(Math.random()*H));drops=[];trails=[]};
const bead=y=>({x:Math.random()*W,y,r:1+Math.random()**2.2*3.8});
const MAXD=()=>W<700?5:9;
const spawn=()=>drops.push({x:Math.random()*W,y:-10-Math.random()*H*.3,r:5+Math.random()*5,v:0,wob:Math.random()*6,dir:(Math.random()-.5)*.4,hold:0});
let last=performance.now();
const tick=t=>{if(!run)return;const dt=Math.min(50,t-last)/16.7;last=t;x.clearRect(0,0,W,H);
 if(drops.length<MAXD()&&Math.random()<.02*dt)spawn();if(!tick.i){tick.i=1;for(let n=0;n<MAXD();n++){spawn();drops[n].y=Math.random()*H*.8}}
 for(let i=trails.length-1;i>=0;i--){const s=trails[i];s.a-=.0025*dt;if(s.a<=0){trails.splice(i,1);continue}draw(s.x,s.y,s.r,s.a)}
 for(const b of beads)draw(b.x,b.y,b.r,.9);
 for(let i=drops.length-1;i>=0;i--){const d=drops[i];
  if(d.hold>0){d.hold-=dt;d.v*=.8}else{const acc=.012*d.r/4;d.v=Math.min(d.v+acc*dt,.9+d.r*.25);if(Math.random()<.004*dt)d.hold=20+Math.random()*80}
  if(Math.random()<.03*dt)d.dir=(Math.random()-.5)*.6;d.wob+=.05*dt;
  const ox=d.x,oy=d.y;d.y+=d.v*dt;d.x+=(d.dir+Math.sin(d.wob)*.15)*d.v*dt;
  if(d.v>.3&&Math.random()<.25*dt&&trails.length<160){trails.push({x:ox+(Math.random()-.5)*d.r*.4,y:oy-d.r*.6,r:d.r*(.12+Math.random()*.18),a:.75});d.r=Math.max(4,d.r-.004)}
  for(let j=beads.length-1;j>=0;j--){const b=beads[j],dx=b.x-d.x,dy=b.y-d.y;if(dx*dx+dy*dy<(d.r+b.r)**2){d.r=Math.min(13,Math.sqrt(d.r*d.r+b.r*b.r));beads[j]=bead(Math.random()*-0+Math.random()*H);beads[j].y=Math.random()*H}}
  for(let j=i-1;j>=0;j--){const e=drops[j],dx=e.x-d.x,dy=e.y-d.y;if(dx*dx+dy*dy<(d.r+e.r)**2*.6){d.r=Math.min(14,Math.sqrt(d.r*d.r+e.r*e.r));d.v=Math.max(d.v,e.v);drops.splice(j,1);i--;break}}
  // corpo allungato quando scivola
  const st=1+Math.min(.35,d.v*.12);x.save();x.translate(d.x,d.y);x.scale(1/Math.sqrt(st),st);draw(0,0,d.r,1);x.restore();
  if(d.y>H+20)drops.splice(drops.indexOf(d),1)}
 x.globalAlpha=1;requestAnimationFrame(tick)};
addEventListener('resize',reset);document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run){last=performance.now();requestAnimationFrame(tick)}});
reset();requestAnimationFrame(tick)})();
