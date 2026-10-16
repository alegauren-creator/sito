// Avvia la pioggia WebGL solo nell'hero (fallback: foto statica)
(()=>{const c=document.getElementById('herorain');if(!c)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const t=document.createElement('canvas');if(!(t.getContext('webgl')||t.getContext('experimental-webgl')))return;
const go=()=>window.startHeroRain&&startHeroRain(c,(window.SITE_BASE||'')+'img/hero.jpg',(window.SITE_BASE||'')+'rain/');
const s=document.createElement('script');s.src=(window.SITE_BASE||'')+'rain/hero-rain.min.js?v=1';s.onload=go;document.head.appendChild(s)})();
