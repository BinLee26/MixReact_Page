'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('#hero-video');
const heroToggle = document.querySelector('#hero-toggle');
function updateHeroButton() {
  const paused = hero.paused;
  heroToggle.querySelector('span').textContent = paused ? 'Play' : 'Pause';
  heroToggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} showcase video`);
  heroToggle.querySelector('path').setAttribute('d', paused ? 'm8 5 11 7-11 7z' : 'M8 5v14M16 5v14');
}
hero.addEventListener('play', updateHeroButton);
hero.addEventListener('pause', updateHeroButton);
heroToggle.addEventListener('click', () => hero.paused ? hero.play().catch(() => {}) : hero.pause());
if (reducedMotion.matches) { hero.autoplay = false; hero.pause(); }
updateHeroButton();
const heroSound = document.querySelector('#hero-sound');
heroSound.addEventListener('click', () => {
  hero.muted = !hero.muted;
  heroSound.querySelector('span').textContent = hero.muted ? 'Sound on' : 'Mute';
  heroSound.setAttribute('aria-pressed', String(!hero.muted));
  heroSound.setAttribute('aria-label', hero.muted ? 'Turn on opening video sound' : 'Mute opening video');
  heroSound.querySelector('path').setAttribute('d', hero.muted ? 'M4 9h4l5-5v16l-5-5H4zM17 9l5 6M22 9l-5 6' : 'M4 9h4l5-5v16l-5-5H4zM17 8q5 4 0 8M19 4q9 8 0 16');
  if (!hero.muted) hero.play().catch(() => {});
});

const contentVideos = [...document.querySelectorAll('.demo-frame video')];
const manualPauses = new WeakSet();
contentVideos.forEach(video => {
  video.addEventListener('play', () => {
    hero.pause();
    contentVideos.forEach(other => { if (other !== video) other.pause(); });
  });
  // Native controls stay available; an explicit pause is respected on re-entry.
  video.addEventListener('pointerdown', () => {
    if (!video.paused) manualPauses.add(video); else manualPauses.delete(video);
  });
});
const visibleLoops = new IntersectionObserver(entries => entries.forEach(entry => {
  const video = entry.target;
  if (entry.isIntersecting && !reducedMotion.matches && !manualPauses.has(video)) {
    video.play().catch(() => {});
  } else if (!entry.isIntersecting) video.pause();
}), {threshold: 0.45});
document.querySelectorAll('.motion-loop').forEach(video => visibleLoops.observe(video));

const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('.figure-zoom').forEach(button => button.addEventListener('click', () => {
  const img = document.querySelector('#dialog-image');
  img.src = button.dataset.image;
  img.alt = button.querySelector('img').alt;
  document.querySelector('#dialog-caption').textContent = button.dataset.caption;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('#close-figure').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });

document.addEventListener('visibilitychange', () => { if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause()); });
