/* ====== TEXTES À MODIFIER ====== */
const CONFIG = {
  prenom1: "Raoul", prenom2: "Nimosette", initiales: "R & N",
  dateISO: "2026-12-18T09:00:00", dateTexte: "18 et 19 décembre 2026",
  accueil: "Avec amour et gratitude, nous serions heureux de partager ces moments précieux avec vous.",
  salle: "Mairie de Santchou", adresse: "Santchou Ville", carte: "Mairie de Santchou, Cameroun",
  hashtag: "#RaoulEtNimosette",
  photoAccueil: "couple.jpg",
  galerie: ["photo1.jpg","photo2.jpg","photo3.jpg","photo4.jpg"],
  histoire: [
    {titre:"Notre rencontre", date:"Mois année", texte:"Il faisait semblant de ne pas la regarder. Elle faisait semblant de ne pas le voir. Le destin, lui, prenait des notes."},
    {titre:"Le premier rendez-vous", date:"Mois année", texte:"Il est arrivé trop tôt et a fait trois fois le tour du quartier pour ne pas paraître pressé. Elle regardait par la fenêtre."},
    {titre:"La demande en mariage", date:"Mois année", texte:"Un genou à terre, un discours oublié et des mains qui tremblent. Elle a dit oui, puis elle a pleuré de joie."}
  ],
  programme: [
    {heure:"Ven. 18", titre:"Mariage coutumier", texte:"Vendredi 18 décembre 2026, Santchou Ville"},
    {heure:"Sam. 19", titre:"Mariage civil et religieux", texte:"Samedi 19 décembre 2026, Santchou Ville"}
  ],
  tenueTexte: "Thème : Amour. Nous aimerions vous voir dans les tons de notre palette.",
  couleurs: [{nom:"Bleu marine",hex:"#0B1E5B"},{nom:"Or",hex:"#D4AF37"},{nom:"Blanc",hex:"#FFFFFF"}],
  limite: "1er décembre 2026",
  telephones: ["698075099", "650211546"],
  lienReponse: "https://wa.me/237698075099?text=" + encodeURIComponent("Bonjour, je confirme ma présence au mariage de Raoul et Nimosette. Nom et Prénom:")
};
/* ====== FIN DES TEXTES ====== */

const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
CONFIG.noms = CONFIG.prenom1 + " & " + CONFIG.prenom2;
CONFIG.adresseComplete = CONFIG.adresse;
document.querySelectorAll("[data-t]").forEach(e => e.textContent = CONFIG[e.dataset.t]);
document.querySelectorAll("[data-photo]").forEach(i => i.src = CONFIG.photoAccueil);
$("#tels").innerHTML = CONFIG.telephones.map(t => `<a href="tel:+237${t}">${t}</a>`).join(" · ");
const place = encodeURIComponent(CONFIG.carte);
$("#map").src = "https://www.google.com/maps?q=" + place + "&output=embed";
$("#route").href = "https://www.google.com/maps/dir/?api=1&destination=" + place;
$("#rsvpBtn").href = CONFIG.lienReponse;

$("#tl").innerHTML = CONFIG.histoire.map(h => `<li class="rv"><p class="sub">${h.date}</p><h3>${h.titre}</h3><p>${h.texte}</p></li>`).join("");
$("#gal").innerHTML = CONFIG.galerie.map((p, i) => `<figure class="rv"><img src="${p}" alt="Photo ${i + 1}" loading="lazy"></figure>`).join("");
$("#prog").innerHTML = CONFIG.programme.map(p => `<li class="rv"><time>${p.heure}</time><div><h3>${p.titre}</h3><p>${p.texte}</p></div></li>`).join("");
$("#sws").innerHTML = CONFIG.couleurs.map(c => `<div><div class="sw" style="background:${c.hex}"></div><span>${c.nom}</span></div>`).join("");

/* Compte à rebours */
const cd = $("#cd"), cible = new Date(CONFIG.dateISO).getTime();
function tick() {
  let d = Math.max(0, cible - Date.now()) / 1000;
  const v = [Math.floor(d / 86400), Math.floor(d % 86400 / 3600), Math.floor(d % 3600 / 60), Math.floor(d % 60)];
  cd.innerHTML = ["jours", "heures", "minutes", "secondes"].map((l, i) => `<div><b>${String(v[i]).padStart(2, "0")}</b><small>${l}</small></div>`).join("");
}
tick(); setInterval(tick, 1000);

/* Titres mot par mot + apparitions */
document.querySelectorAll(".words").forEach(h => {
  h.innerHTML = h.textContent.split(" ").map((w, i) => `<span class="w"><span style="--d:${i * .18}s">${w}</span></span>`).join(" ");
});
document.querySelectorAll("section > *:not(.tl):not(.gal):not(.prog)").forEach(e => e.classList.add("rv"));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold: .15});
function observe() { document.querySelectorAll(".rv,.words").forEach(e => io.observe(e)); }

/* Défilement : frise + profondeur de la galerie */
const tl = $("#tl"), imgs = [...document.querySelectorAll(".gal img")];
function onScroll() {
  const r = tl.getBoundingClientRect();
  tl.style.setProperty("--p", Math.min(1, Math.max(0, (innerHeight * .75 - r.top) / r.height)));
  if (reduce) return;
  imgs.forEach(img => {
    const b = img.parentElement.getBoundingClientRect();
    if (b.bottom < 0 || b.top > innerHeight) return;
    const k = (b.top + b.height / 2 - innerHeight / 2) / innerHeight;
    img.style.transform = `translateY(${-k * 9 - 9}%)`;
  });
}
addEventListener("scroll", () => requestAnimationFrame(onScroll), {passive: true});
addEventListener("resize", onScroll);

/* Ouverture de l'enveloppe */
$("#open").addEventListener("click", () => {
  const intro = $("#intro"), fin = () => {
    document.body.classList.remove("locked"); document.body.classList.add("opened");
    intro.classList.add("done"); observe(); onScroll();
    setTimeout(() => intro.remove(), 1600);
  };
  if (reduce) return fin();
  intro.classList.add("open");
  setTimeout(fin, 3300);
});
