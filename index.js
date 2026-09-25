const progress = document.getElementById('progress');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateProgress);
updateProgress();

const links = document.querySelectorAll('.navlinks a');
const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));
window.addEventListener('scroll', () => {
  let idx = sections.findIndex((s,i) => {
    const next = sections[i+1];
    const top = s.getBoundingClientRect().top;
    return top <= 90 && (!next || next.getBoundingClientRect().top > 90);
  });
  links.forEach(l => l.classList.remove('active'));
  if(idx >= 0) links[idx].classList.add('active');
});
document.querySelectorAll('.navlinks a').forEach(a => {
  a.addEventListener('click', () => { document.getElementById('navToggle').checked = false; });
});

// Découpe en lettres pour l'effet de vague au survol
function splitLetters(el){
  const text = el.textContent;
  el.textContent = '';
  el.classList.add('split');
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.transitionDelay = (i * 18) + 'ms';
    el.appendChild(span);
  });
}
document.querySelectorAll('.navlinks a, section h2, .hero .role').forEach(splitLetters);