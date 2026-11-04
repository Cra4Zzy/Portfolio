const cards = [...document.querySelectorAll('.project-card')];
const modal = document.querySelector('#project-modal');
const modalVideo = document.querySelector('#modal-video');
const modalTitle = document.querySelector('#modal-title');
const modalMeta = document.querySelector('#modal-meta');
const closeButton = document.querySelector('.modal-close');

const ensureSource = (video) => {
  if (!video || video.src) return;
  const source = video.dataset.src;
  if (!source) return;
  video.src = source;
  video.load();
};

const startPreview = (card) => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const video = card.querySelector('.card-video');
  ensureSource(video);
  video.muted = true;
  const play = video.play();
  if (play?.catch) play.catch(() => {});
};

const stopPreview = (card) => {
  const video = card.querySelector('.card-video');
  if (!video) return;
  video.pause();
  try { video.currentTime = 0; } catch (_) {}
};

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => startPreview(card));
  card.addEventListener('mouseleave', () => stopPreview(card));
  card.addEventListener('focus', () => startPreview(card));
  card.addEventListener('blur', () => stopPreview(card));

  card.addEventListener('click', () => {
    cards.forEach(stopPreview);
    modalTitle.textContent = card.dataset.title;
    modalMeta.textContent = card.dataset.meta;
    modalVideo.src = card.dataset.video;
    modalVideo.load();
    modal.showModal();
    document.body.classList.add('modal-open');
    const play = modalVideo.play();
    if (play?.catch) play.catch(() => {});
  });
});

const closeModal = () => {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  if (modal.open) modal.close();
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
modal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
});

// Warm the next poster/video only when a project is close to the viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const video = entry.target.querySelector('.card-video');
    if (video) video.preload = 'metadata';
    observer.unobserve(entry.target);
  });
}, { rootMargin: '350px 0px' });

document.querySelectorAll('.project').forEach((project) => observer.observe(project));

// Progressive reveal for editorial sections. Content remains visible without JS.
document.documentElement.classList.add('js');
const revealItems = [...document.querySelectorAll('[data-reveal]')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const websiteProjects = {
 anka:{
  title:'ANKA Transport',
  category:'KUNDENPROJEKT / SPEDITION & LOGISTIK',
  image:'assets/images/anka-portfolio-1600.webp',
  alt:'ANKA Transport Website mit Mercedes-Benz-Lkw und orangefarbener Headline',
  description:'Der Auftritt stellt den Festeinsatz in den Mittelpunkt. Besucher sehen direkt, welche Lkw mit Fahrer verfügbar sind und wie sie einen regelmäßigen Einsatz anfragen können. Echte Fuhrparkbilder und die orangefarbene Typografie machen ANKA wiedererkennbar.',
  scope:['Individuelles Webdesign für ANKA Transport','Fahrzeugübersicht von 7,5 t bis Sattelzug','Kontaktführung für Festeinsatz'],
  url:'https://ankatransport.de/'
 },
 altstadt:{
  title:'AltstadtApartments Dinkelsbühl',
  category:'KUNDENPROJEKT / FERIENWOHNUNGEN',
  image:'assets/images/altstadtapartments-portfolio.webp',
  alt:'Projektmotiv für AltstadtApartments mit dem Wohnzimmer einer Ferienwohnung',
  description:'Zwei Ferienwohnungen mitten in Dinkelsbühl. Der Relaunch zeigt, wie die Apartments aussehen, für wie viele Gäste sie geeignet sind und wie man den Aufenthalt buchen kann. Gäste können zwischen Deutsch und Englisch wechseln.',
  scope:['Website-Relaunch auf Deutsch und Englisch','Eigene Seiten für beide Apartments','Buchungsanbindung mit Smoobu'],
  url:null
 },
 britta:{
  title:'Britta Rethfeldt',
  category:'KUNDENPROJEKT / RELAUNCH-VORSCHAU',
  image:'assets/images/britta-rethfeldt-portfolio.webp',
  alt:'Projektmotiv für Britta Rethfeldt mit ihrem Porträt auf einer Brücke',
  description:'Brittas neuer Auftritt zeigt, wer sie ist und wie sie Zeremonien gestaltet. Eigene Fotos, ein Portfolio mit Eindrücken von Feiern und eine Stimmprobe geben einen persönlichen ersten Eindruck.',
  scope:['Website-Relaunch für eine freie Rednerin','Fotografie-Portfolio','Stimmprobe direkt auf der Website'],
  url:'https://cra4zzy.github.io/Britta-Rednerin-/',
  linkLabel:'Relaunch-Vorschau öffnen'
 },
 dv:{title:'DV Transporte',category:'KUNDENPROJEKT / SPEDITION & LOGISTIK',image:'assets/images/dv-portfolio.webp',alt:'DV Transporte Website mit Fuhrpark, Leistungen und direkter Transportanfrage',description:'Der neue Auftritt für DV Transporte verbindet eine prägnante Typografie mit großflächigen Fuhrparkbildern und einer klaren Leistungsstruktur. Internationale Verkehre, regionale Umfuhren und verfügbare Kapazitäten werden schnell erfassbar; die Transportanfrage bleibt dabei jederzeit nah.',scope:['Individuelles Webdesign für Spedition & Logistik','Leistungs-, Fuhrpark- und Galerieinszenierung','Direkte Wege zur Transportanfrage'],url:'https://www.dvtransporte.de/'},
 butz:{title:'Butz-Bauwelt',category:'KUNDENPROJEKT / BAU & WOHNEN',image:'assets/images/website-butz-bauwelt.webp',alt:'Webdesign für Butz-Bauwelt mit Architekturmotiv und roten Akzenten',description:'Die Bildwelt rückt das Ergebnis der Arbeit in den Mittelpunkt: ein Zuhause. Eine klare Hierarchie führt vom ersten Eindruck zu den Leistungen und zum persönlichen Kontakt. Rote Akzente verbinden Orientierung und Wiedererkennung.',scope:['Individuelle Websitegestaltung','Leistungs- und Projektpräsentation','Strukturierte Kontaktführung'],url:'https://www.butz-bauwelt.de/'},
 avanti:{title:'Avanti Haarstudio',category:'KUNDENPROJEKT / BEAUTY & LIFESTYLE',image:'assets/images/avanti-portfolio.webp',alt:'Avanti Haarstudio Website mit heller Fläche und editorialer Typografie',description:'Großzügige Abstände, ruhige Farben und eine bewusst gesetzte Typografie geben der Persönlichkeit des Salons Raum. Bilder und Inhalte arbeiten zusammen, damit Besucher ein Gefühl für den Salon und sein Angebot bekommen.',scope:['Visuelle Gestaltung','Salon- und Leistungsdarstellung','Ergänzender Social-Media-Content'],url:'https://haarstudio-avanti.de/'},
 andreas:{title:'Fahrschule Andreas',category:'KUNDENPROJEKT / SCHULUNG',image:'assets/images/website-andreas-abbate.webp',alt:'Website der Gabelstaplerfahrschule Andreas mit dunklem Hintergrund und gelber Signalfarbe',description:'Das Thema verlangt Klarheit und Verlässlichkeit. Eine kräftige Bildsprache, deutliche Überschriften und gelbe Akzente machen das Angebot schnell erfassbar und heben die nächsten Schritte hervor.',scope:['Individuelles Webdesign','Strukturierung des Leistungsangebots','Deutlich hervorgehobene Kontaktwege'],url:'https://gabelstaplerfahrschule-andreas.de/'},
 stern:{title:'Der Stern',category:'KUNDENPROJEKT / GASTRONOMIE',image:'assets/images/website-der-stern.webp',alt:'Atmosphärische Website für die Bar Der Stern in Dinkelsbühl',description:'Dunkle Töne und die Bildwelt der Bar vermitteln die Atmosphäre bereits vor dem Besuch. Eine prägnante Typografie und zurückhaltende Akzente führen durch das Angebot.',scope:['Websitegestaltung für Gastronomie','Atmosphärische Bildpräsentation','Klare Informationshierarchie'],url:'https://www.xn--stern-dinkelsbhl-wzb.de/'},
 kopp:{title:'Kopp-Dach',category:'KUNDENPROJEKT / DACHHANDWERK',image:'assets/images/kopp-portfolio.webp',alt:'Kopp-Dach Website mit Dacharbeiten und rot-weißer Typografie',description:'Ein prägnanter Webauftritt für Peter Kopp aus Mönchsroth. Eine dunkle Bildbühne, kräftige rote Akzente und große Typografie geben dem Dachhandwerk ein eigenständiges Gesicht. Die Navigation macht Leistungen, Projekte und Kontakt schnell zugänglich.',scope:['Markante Websitegestaltung','Klare Leistungs- und Projektnavigation','Direkte Kontaktwege'],url:'https://kopp-dach.de/'}
};

const websiteDialog = document.querySelector('[data-portfolio-dialog]');
const websiteTitle = websiteDialog.querySelector('#portfolio-dialog-title');
const websiteCategory = websiteDialog.querySelector('[data-dialog-category]');
const websiteImage = websiteDialog.querySelector('[data-dialog-image]');
const websiteDescription = websiteDialog.querySelector('[data-dialog-description]');
const websiteScope = websiteDialog.querySelector('[data-dialog-scope]');
const websiteLink = websiteDialog.querySelector('[data-dialog-link]');
let websiteTrigger;

document.querySelectorAll('[data-open-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = websiteProjects[button.dataset.openProject];
    if (!project) return;
    websiteTrigger = button;
    websiteTitle.textContent = project.title;
    websiteCategory.textContent = project.category;
    websiteImage.src = project.image;
    websiteImage.alt = project.alt;
    websiteDescription.textContent = project.description;
    websiteScope.replaceChildren(...project.scope.map((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    websiteLink.hidden = !project.url;
    if (project.url) {
      websiteLink.href = project.url;
      websiteLink.querySelector('[data-dialog-link-label]').textContent = project.linkLabel || 'Website öffnen';
    }
    websiteDialog.showModal();
    websiteDialog.scrollTop = 0;
    document.body.classList.add('modal-open');
  });
});

websiteDialog.querySelector('[data-close-dialog]').addEventListener('click', () => websiteDialog.close());
websiteDialog.addEventListener('click', (event) => {
  if (event.target === websiteDialog) websiteDialog.close();
});
websiteDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  websiteTrigger?.focus({ preventScroll: true });
});
