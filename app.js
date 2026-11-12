const htmlEscapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => htmlEscapeMap[character]);
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  document.getElementById('small-clock').textContent = time;
  document.getElementById('large-clock').textContent = time;
  document.getElementById('home-date').textContent = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

let activePhotoZoom;

function startPhotoZoom(slide) {
  const image = slide.querySelector(':scope > img');
  if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  activePhotoZoom?.cancel();
  image.style.transform = 'scale(1)';

  if (typeof image.animate === 'function') {
    activePhotoZoom = image.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }],
      { duration: 9000, easing: 'ease-out', fill: 'forwards' }
    );
    return;
  }

  slide.classList.add('is-zooming');
}

function createPhotoItem(item, index, isLoopClone = false) {
  const itemElement = document.createElement('article');
  itemElement.className = 'reel-item relative w-full flex flex-col justify-between p-4 overflow-hidden';
  itemElement.dataset.photoIndex = String(isLoopClone ? 0 : index);
  if (isLoopClone) itemElement.dataset.loopClone = 'true';
  const imagePositionClass = item.position === 'left' ? 'object-position-left' : '';
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${item.music.track} ${item.music.artist}`)}`;
  const gestureHint = index === 0 && !isLoopClone
    ? `<div class="notification-gesture-hint" aria-hidden="true"><i class="fa-solid fa-arrow-down" aria-hidden="true"></i><span>Puxe para baixo do topo para ver as notificações</span></div>`
    : '';
  itemElement.innerHTML = `
    <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}" class="absolute inset-0 w-full h-full object-cover z-0 ${imagePositionClass}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
    <div class="photo-overlay absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10"></div>
    ${gestureHint}
    <div class="photo-tap-area absolute inset-0 z-20" aria-label="Toque duas vezes para curtir"></div>
    <div class="absolute right-3 bottom-20 z-30 flex flex-col items-center space-y-5">
      <button class="like-button flex flex-col items-center group focus:outline-none" aria-label="Curtir foto">
        <span class="w-11 h-11 rounded-full glass-pill flex items-center justify-center transition group-active:scale-125">
          <i class="like-icon fa-solid fa-heart text-xl text-white transition-colors duration-300" aria-hidden="true"></i>
        </span>
        <span class="like-count text-[11px] font-semibold mt-1 text-white shadow-sm">${Number(item.likes) || 0}</span>
      </button>
      <button class="comments-button flex flex-col items-center group focus:outline-none" aria-label="Ver comentários">
        <span class="w-11 h-11 rounded-full glass-pill flex items-center justify-center transition group-active:scale-110">
          <i class="fa-solid fa-comment text-xl text-white" aria-hidden="true"></i>
        </span>
        <span class="text-[11px] font-semibold mt-1 text-white shadow-sm">${item.comments.length}</span>
      </button>
      <button class="share-button flex flex-col items-center opacity-50 cursor-not-allowed" aria-label="Compartilhamento desativado" title="Compartilhamento desativado" disabled>
        <span class="w-11 h-11 rounded-full glass-pill flex items-center justify-center">
          <i class="fa-solid fa-paper-plane text-lg text-white" aria-hidden="true"></i>
        </span>
        <span class="text-[11px] font-semibold mt-1 text-white shadow-sm">Enviar</span>
      </button>
    </div>
    <div class="absolute left-4 bottom-8 right-16 z-30 text-left">
      <div class="flex items-center space-x-2 mb-2">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5">
          <img src="${escapeHTML(window.memoriesData.profileImage)}" alt="" class="w-full h-full rounded-full object-cover" aria-hidden="true">
        </div>
        <span class="font-bold text-sm text-white drop-shadow">${escapeHTML(window.memoriesData.profileName)}</span>
        <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/90 backdrop-blur-sm font-semibold">Seguindo</span>
      </div>
      <p class="text-xs font-medium text-white/90 drop-shadow line-clamp-2 mb-2">${escapeHTML(item.caption)}</p>
      <div class="flex flex-col items-start text-[10px] text-white/85">
        <a class="spotify-track flex items-center space-x-1.5 font-semibold hover:text-green-300" href="${spotifySearchUrl}" target="_blank" rel="noopener noreferrer" aria-label="Buscar ${escapeHTML(item.music.track)} de ${escapeHTML(item.music.artist)} no Spotify">
          <i class="fa-brands fa-spotify text-xs" aria-hidden="true"></i>
          <span>${escapeHTML(item.music.track)} — ${escapeHTML(item.music.artist)}</span>
        </a>
        <span class="ml-4 text-white/65">${escapeHTML(item.music.context)}</span>
      </div>
    </div>`;

  const likeButton = itemElement.querySelector('.like-button');
  const likeIcon = itemElement.querySelector('.like-icon');
  const likeCount = itemElement.querySelector('.like-count');
  let liked = false;

  const toggleLike = () => {
    liked = !liked;
    likeIcon.classList.toggle('text-red-500', liked);
    likeIcon.classList.toggle('text-white', !liked);
    likeCount.textContent = String((Number(item.likes) || 0) + (liked ? 1 : 0));
  };

  const showLikeFeedback = () => {
    const feedback = document.createElement('span');
    feedback.className = 'like-feedback';
    feedback.setAttribute('aria-hidden', 'true');
    feedback.innerHTML = '<i class="fa-solid fa-heart" aria-hidden="true"></i>';
    itemElement.appendChild(feedback);
    window.setTimeout(() => feedback.remove(), 900);
  };

  likeButton.addEventListener('click', () => {
    toggleLike();
    if (liked) showLikeFeedback();
  });
  itemElement.querySelector('.comments-button').addEventListener('click', () => openComments(item.comments));

  let lastTap = 0;
  itemElement.querySelector('.photo-tap-area').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!liked) toggleLike();
      showLikeFeedback();
    }
    lastTap = now;
  });

  return itemElement;
}

function renderMemories() {
  const feed = document.getElementById('memories-feed');
  feed.replaceChildren();

  const photos = window.memoriesData.items.filter((item) => item.type === 'photo');
  if (photos.length === 0) {
    console.error('Adicione ao menos uma foto em memoriesData.items para renderizar o feed.');
    return;
  }

  photos.forEach((item, index) => {
    feed.appendChild(createPhotoItem(item, index));
  });

  const firstPhotoClone = createPhotoItem(photos[0], photos.length, true);
  firstPhotoClone.setAttribute('aria-label', 'Primeira foto; deslize para continuar a sequência');
  feed.appendChild(firstPhotoClone);
  const slides = feed.querySelectorAll('.reel-item');
  const progress = document.getElementById('photo-progress-fill');
  const counter = document.getElementById('photo-counter');
  const setActiveSlide = (slide, restartAnimation = false) => {
    const currentSlide = feed.querySelector('.reel-item.is-active');
    if (currentSlide === slide && !restartAnimation) return;

    activePhotoZoom?.cancel();
    activePhotoZoom = undefined;
    currentSlide?.classList.remove('is-zooming');
    currentSlide?.classList.remove('is-active');
    slide.classList.remove('is-active');
    if (restartAnimation) void slide.offsetWidth;
    slide.classList.add('is-active');
    if (!document.getElementById('memories-screen').classList.contains('hidden')) {
      startPhotoZoom(slide);
    }

    const activeIndex = Number(slide.dataset.photoIndex);
    progress.style.width = `${((activeIndex + 1) / photos.length) * 100}%`;
    counter.textContent = `${activeIndex + 1} de ${photos.length}`;
  };

  restartPhotoAnimation = () => {
    const activeIndex = Math.min(
      Math.round(feed.scrollTop / feed.clientHeight),
      slides.length - 1
    );
    setActiveSlide(slides[activeIndex], true);
  };

  const observer = new IntersectionObserver((entries) => {
    const activeSlide = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (!activeSlide) return;

    setActiveSlide(activeSlide.target);
  }, { root: feed, threshold: [0.6, 0.8] });

  slides.forEach((slide) => observer.observe(slide));
  feed.addEventListener('scroll', () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 1) {
      feed.scrollTop = 0;
    }
  }, { passive: true });
}

function renderComments(comments) {
  const list = document.getElementById('comments-list');
  list.replaceChildren();

  comments.forEach((comment) => {
    const row = document.createElement('div');
    row.className = 'flex space-x-3';
    row.innerHTML = `
      <div class="w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs text-white overflow-hidden">${comment.avatarImage
        ? `<img src="${escapeHTML(comment.avatarImage)}" alt="" class="w-full h-full object-cover" aria-hidden="true">`
        : escapeHTML(comment.avatar)}</div>
      <div>
        <span class="font-semibold text-xs text-neutral-300">${escapeHTML(comment.name)}</span>
        <p class="text-neutral-200 text-xs mt-0.5">${escapeHTML(comment.text)}</p>
      </div>`;
    list.appendChild(row);
  });

  list.scrollTop = 0;
}

let restartPhotoAnimation = () => {};
let memoriesTransitionTimeout;
let gestureHintTimeout;
let hasShownGestureHint = false;

function openMemories() {
  window.clearTimeout(memoriesTransitionTimeout);
  const screen = document.getElementById('memories-screen');
  const homeScreen = document.getElementById('home-screen');
  screen.classList.remove('hidden');
  screen.inert = false;
  screen.removeAttribute('aria-hidden');
  homeScreen.inert = true;
  homeScreen.setAttribute('aria-hidden', 'true');
  document.getElementById('close-memories').focus();
  memoriesTransitionTimeout = window.setTimeout(() => {
    screen.classList.remove('opacity-0');
    screen.classList.add('opacity-100');
    document.getElementById('home-screen').classList.add('scale-95', 'blur-sm');
    window.requestAnimationFrame(restartPhotoAnimation);
    const hint = document.querySelector('.notification-gesture-hint');
    if (hint && !hasShownGestureHint) {
      hasShownGestureHint = true;
      hint.classList.add('is-visible');
      window.clearTimeout(gestureHintTimeout);
      gestureHintTimeout = window.setTimeout(() => hint.classList.remove('is-visible'), 6500);
    }
  }, 50);
}

function closeMemories() {
  window.clearTimeout(memoriesTransitionTimeout);
  const screen = document.getElementById('memories-screen');
  screen.classList.remove('opacity-100');
  screen.classList.add('opacity-0');
  screen.inert = true;
  screen.setAttribute('aria-hidden', 'true');
  const homeScreen = document.getElementById('home-screen');
  homeScreen.classList.remove('scale-95', 'blur-sm');
  homeScreen.inert = false;
  homeScreen.removeAttribute('aria-hidden');
  homeScreen.querySelector('#open-memories').focus();
  memoriesTransitionTimeout = window.setTimeout(() => screen.classList.add('hidden'), 500);
}

let commentsTrigger;

function openComments(comments) {
  commentsTrigger = document.activeElement;
  renderComments(comments);
  document.getElementById('comments-title').textContent = 'Comentários';
  const modal = document.getElementById('comments-modal');
  modal.classList.remove('hidden');
  document.getElementById('memories-screen').inert = true;
  document.getElementById('comments-list').scrollTop = 0;
  document.getElementById('close-comments').focus();
}

function closeComments() {
  const modal = document.getElementById('comments-modal');
  if (modal.classList.contains('hidden')) return;

  modal.classList.add('hidden');
  document.getElementById('memories-screen').inert = false;
  commentsTrigger?.focus();
  commentsTrigger = undefined;
}

let notificationTrigger;
let notificationInertState;
let notificationCloseTimeout;

function openNotificationCenter() {
  const overlay = document.getElementById('notification-center');
  if (!overlay.classList.contains('hidden') && overlay.classList.contains('is-open')) return;
  if (!document.getElementById('comments-modal').classList.contains('hidden')) return;

  window.clearTimeout(notificationCloseTimeout);
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const timestamp = now.toISOString();
  document.getElementById('notification-date').textContent = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  ['whatsapp-notification-time', 'shopee-notification-time'].forEach((id) => {
    const timeElement = document.getElementById(id);
    timeElement.textContent = time;
    timeElement.dateTime = timestamp;
  });

  const homeScreen = document.getElementById('home-screen');
  const memoriesScreen = document.getElementById('memories-screen');
  notificationInertState = { home: homeScreen.inert, memories: memoriesScreen.inert };
  homeScreen.inert = true;
  memoriesScreen.inert = true;
  notificationTrigger = document.activeElement === document.body
    ? (memoriesScreen.classList.contains('hidden')
      ? document.getElementById('open-memories')
      : document.getElementById('close-memories'))
    : document.activeElement;

  overlay.inert = false;
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.remove('hidden');
  window.requestAnimationFrame(() => {
    if (overlay.getAttribute('aria-hidden') === 'false') overlay.classList.add('is-open');
  });
  document.getElementById('notification-title').focus();
}

function closeNotificationCenter() {
  const overlay = document.getElementById('notification-center');
  if (overlay.classList.contains('hidden')) return;

  overlay.classList.remove('is-open');
  overlay.inert = true;
  overlay.setAttribute('aria-hidden', 'true');

  const homeScreen = document.getElementById('home-screen');
  const memoriesScreen = document.getElementById('memories-screen');
  homeScreen.inert = notificationInertState?.home ?? false;
  memoriesScreen.inert = notificationInertState?.memories ?? false;
  notificationInertState = undefined;
  notificationTrigger?.focus();
  notificationTrigger = undefined;
  notificationCloseTimeout = window.setTimeout(() => overlay.classList.add('hidden'), 360);
}

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  window.setInterval(updateClock, 60_000);
  renderMemories();

  document.getElementById('open-memories').addEventListener('click', openMemories);
  document.getElementById('close-memories').addEventListener('click', closeMemories);
  document.getElementById('close-comments').addEventListener('click', closeComments);
  document.getElementById('comments-modal').addEventListener('click', (event) => {
    if (event.target.id === 'comments-modal') closeComments();
  });
  document.getElementById('comments-modal').addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      document.getElementById('close-comments').focus();
    }
  });
  document.getElementById('open-notifications-accessible').addEventListener('click', openNotificationCenter);
  document.getElementById('notification-backdrop').addEventListener('click', closeNotificationCenter);
  document.getElementById('notification-center').addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      document.getElementById('notification-title').focus();
    }
  });

  let notificationSwipeStart;
  document.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    const notificationCenter = document.getElementById('notification-center');
    if (!notificationCenter.classList.contains('hidden')) {
      if (event.target.closest('.notification-panel')) {
        notificationSwipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, closing: true };
      }
      return;
    }
    if (!document.getElementById('comments-modal').classList.contains('hidden')) return;

    const memoriesScreen = document.getElementById('memories-screen');
    const memoriesOpen = !memoriesScreen.classList.contains('hidden');
    if (memoriesOpen) {
      if (event.clientY > 56) return;
    } else {
      const statusBar = document.querySelector('[aria-label="Barra de status simulada"]');
      if (event.clientY > statusBar.getBoundingClientRect().bottom + 12) return;
    }
    notificationSwipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  }, { passive: true });

  document.addEventListener('pointerup', (event) => {
    if (!notificationSwipeStart || event.pointerId !== notificationSwipeStart.pointerId) return;

    const deltaY = event.clientY - notificationSwipeStart.y;
    const deltaX = Math.abs(event.clientX - notificationSwipeStart.x);
    const closing = notificationSwipeStart.closing;
    notificationSwipeStart = undefined;
    if (deltaX > Math.abs(deltaY) * 0.8) return;
    if (closing && deltaY <= -60) closeNotificationCenter();
    else if (!closing && deltaY >= 60) openNotificationCenter();
  }, { passive: true });
  document.addEventListener('pointercancel', () => {
    notificationSwipeStart = undefined;
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (!document.getElementById('notification-center').classList.contains('hidden')) {
      closeNotificationCenter();
    } else if (!document.getElementById('comments-modal').classList.contains('hidden')) {
      closeComments();
    } else if (!document.getElementById('memories-screen').classList.contains('hidden')) {
      closeMemories();
    }
  });
});
