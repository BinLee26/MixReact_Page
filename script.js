'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('#hero-video');
if (reducedMotion.matches) { hero.autoplay = false; hero.pause(); }

const contentVideos = [...document.querySelectorAll('.demo-frame video')];
const manualPauses = new WeakSet();
hero.addEventListener('play', () => contentVideos.forEach(video => video.pause()));
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
document.querySelectorAll('.motion-loop, #hero-video').forEach(video => visibleLoops.observe(video));

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

const reactionVideo = document.querySelector('#diversity-video');
const reactionChapters = [...document.querySelectorAll('[data-reaction-start]')];
reactionChapters.forEach(button => button.addEventListener('click', () => {
  const seekAndPlay = () => {
    manualPauses.delete(reactionVideo);
    reactionVideo.currentTime = Number(button.dataset.reactionStart);
    reactionVideo.play().catch(() => {});
  };
  if (reactionVideo.readyState >= 1) seekAndPlay();
  else {
    reactionVideo.addEventListener('loadedmetadata', seekAndPlay, {once: true});
    reactionVideo.load();
  }
}));
reactionVideo.addEventListener('timeupdate', () => {
  const current = reactionChapters.reduce((active, button) =>
    reactionVideo.currentTime >= Number(button.dataset.reactionStart) ? button : active,
    reactionChapters[0]);
  reactionChapters.forEach(button => button.setAttribute('aria-pressed', String(button === current)));
});
