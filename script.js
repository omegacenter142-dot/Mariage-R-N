(function(){
  const S = SITE, $ = (s,r=document)=>r.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = t => String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const tel = n => n.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/,'$1 $2 $3 $4');

  $('#seal').textContent = S.initiales;
  $('#cardNames').innerHTML = esc(S.prenom1)+' &amp; '+esc(S.prenom2);

  const mapQ = encodeURIComponent(S.lieu.recherche);
  const wa = 'https://wa.me/'+S.rsvp.whatsapp+'?text='+encodeURIComponent('Bonjour, je confirme ma présence au mariage de '+S.prenom1+' & '+S.prenom2+'. Nom : ');
  const rsvpHref = S.rsvp.lien || wa;

  $('#app').innerHTML = `
  <section id="accueil">
    <div class="bg"><img src="${esc(S.photoAccueil)}" alt="${esc(S.prenom1)} et ${esc(S.prenom2)}" fetchpriority="high"></div>
    <div class="hero">
      <p class="kicker rv">NOUS NOUS MARIONS</p>
      <h1 class="names rv" style="--d:.2s">${esc(S.prenom1)}<span class="amp">&amp;</span>${esc(S.prenom2)}</h1>
      <p class="lead rv" style="--d:.5s">${esc(S.accueil)}</p>
      <div class="jours rv" style="--d:.7s">${S.jours.map(j=>`<span>${esc(j.date.toUpperCase())}</span>`).join('')}</div>
      <div class="count rv" style="--d:.9s" id="count" aria-live="off">
        <div><b data-u="j">0</b><span>JOURS</span></div><div><b data-u="h">0</b><span>HEURES</span></div>
        <div><b data-u="m">0</b><span>MINUTES</span></div><div><b data-u="s">0</b><span>SECONDES</span></div>
      </div>
      <span class="scroll" aria-hidden="true"></span>
    </div>
  </section>

  <section id="histoire"><div class="wrap">
    <p class="kicker rv">DEPUIS LE DÉBUT</p>
    <h2 class="words">Notre histoire</h2>
    <div class="tl" id="tl"><span class="fill" id="tlFill"></span>
      ${S.histoire.map(e=>`<div class="ev rv"><h3>${esc(e.titre)}</h3><p class="dt">${esc(e.date.toUpperCase())}</p><p>${esc(e.texte)}</p></div>`).join('')}
    </div>
  </div></section>

  <section id="galerie" class="dark"><div class="wrap">
    <p class="kicker rv">EN IMAGES</p>
    <h2 class="words">Galerie</h2></div>
    <div class="gal">${S.galerie.map((p,i)=>`<div class="ph rv"><div class="in-ph"><img src="${esc(p)}" alt="Photo ${i+1} du couple" loading="lazy"></div></div>`).join('')}</div>
  </section>

  <section id="programme"><div class="wrap">
    <p class="kicker rv">LES FESTIVITÉS</p>
    <h2 class="words">Le programme</h2>
    ${S.programme.map(d=>`<div class="jour rv"><h3>${esc(d.jour.toUpperCase())}</h3><ul class="prog">${d.items.map(i=>`<li><time>${esc(i[0])}</time><span>${esc(i[1])}</span></li>`).join('')}</ul></div>`).join('')}
    <p class="rv" style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:.2em;color:var(--gold)">${esc(S.theme.toUpperCase())}</p>
  </div></section>

  <section id="lieu" class="dark"><div class="wrap">
    <p class="kicker rv">OÙ NOUS RETROUVER</p>
    <h2 class="words">Le lieu</h2>
    <p class="addr rv">${esc(S.lieu.nom)}<small>${esc(S.lieu.adresse)}, ${esc(S.lieu.ville)}</small></p>
    <div class="map rv"><iframe title="Carte Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${mapQ}&output=embed"></iframe></div>
    <a class="btn gold rv" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${mapQ}">Ouvrir l'itinéraire</a>
  </div></section>

  <section id="tenue"><div class="wrap">
    <p class="kicker rv">CÔTÉ STYLE</p>
    <h2 class="words">Tenue</h2>
    <p class="rv">${esc(S.tenue.texte)}</p>
    <div class="dots rv">${S.tenue.couleurs.map(c=>`<figure><i style="background:${c[1]}"></i><figcaption>${esc(c[0].toUpperCase())}</figcaption></figure>`).join('')}</div>
  </div></section>

  <section id="rsvp" class="dark"><div class="wrap">
    <p class="kicker rv">VOTRE RÉPONSE</p>
    <h2 class="words">Confirmer ma présence</h2>
    <p class="rv">${esc(S.rsvp.texte)}</p>
    <p class="deadline rv">${esc(S.rsvp.delai)}</p>
    <a class="btn gold rv" target="_blank" rel="noopener" href="${esc(rsvpHref)}">Confirmer ma présence</a>
    <p class="tels rv">Une question ? Appelez-nous :<br>${S.rsvp.telephones.map(t=>`<a href="tel:+237${t}">${tel(t)}</a>`).join(' / ')}</p>
  </div></section>

  <footer>
    <p class="merci rv">Merci de faire partie de notre histoire</p>
    <p class="ini rv" style="--d:.2s">${esc(S.initiales.replace('&','&amp;')).replace('&amp;amp;','&amp;')}</p>
    <p class="ht rv" style="--d:.4s">${esc(S.hashtag)}</p>
  </footer>`;

  /* titres mot par mot */
  document.querySelectorAll('.words').forEach(el=>{
    if(el.querySelector('.w')) return;
    let i=0; el.innerHTML = el.textContent.split(' ').map(w=>`<span class="w"><span style="--i:${i++}">${esc(w)}</span></span>`).join(' ');
  });

  /* apparition au défilement */
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  function watch(){ document.querySelectorAll('.rv,.words').forEach(el=>io.observe(el)); }

  /* compte à rebours */
  const target = new Date(S.dateCible).getTime(), cb = {};
  document.querySelectorAll('#count b').forEach(b=>cb[b.dataset.u]=b);
  function tick(){
    let d = Math.max(0, target-Date.now()), s=Math.floor(d/1000);
    cb.j.textContent = Math.floor(s/86400); cb.h.textContent = String(Math.floor(s%86400/3600)).padStart(2,'0');
    cb.m.textContent = String(Math.floor(s%3600/60)).padStart(2,'0'); cb.s.textContent = String(s%60).padStart(2,'0');
  }
  tick(); setInterval(tick,1000);

  /* frise qui se dessine + parallaxe galerie */
  const tl=$('#tl'), fill=$('#tlFill'), imgs=[...document.querySelectorAll('.ph img')];
  let ticking=false;
  function onScroll(){
    ticking=false;
    const vh=innerHeight, r=tl.getBoundingClientRect();
    const p=Math.min(1,Math.max(0,(vh*.65-r.top)/r.height));
    fill.style.height=(p*(r.height-12))+'px';
    if(reduce) return;
    imgs.forEach(im=>{
      const b=im.parentElement.getBoundingClientRect();
      if(b.bottom<-50||b.top>vh+50) return;
      const off=((b.top+b.height/2)-vh/2)/vh;
      im.style.transform=`translateY(${(-9+off*-9).toFixed(2)}%)`;
    });
  }
  addEventListener('scroll',()=>{ if(!ticking){ticking=true;requestAnimationFrame(onScroll);} },{passive:true});
  addEventListener('resize',onScroll);

  /* ouverture de l'enveloppe */
  const intro=$('#intro');
  function reveal(){
    intro.classList.add('gone'); document.body.classList.remove('lock'); document.body.classList.add('ready');
    scrollTo(0,0); watch(); onScroll(); setTimeout(()=>intro.remove(),2000);
  }
  $('#openBtn').addEventListener('click',()=>{
    if(reduce){ reveal(); return; }
    intro.classList.add('s1');
    setTimeout(()=>intro.classList.add('s2'),1100);
    setTimeout(()=>intro.classList.add('s3'),2900);
    setTimeout(reveal,3800);
  });
})();
