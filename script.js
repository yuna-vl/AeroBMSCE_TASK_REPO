/**
 * AeroBMSCE - Interactive Client Logic
 * Handles accessible photo carousel, mobile navigation, and safe initialization.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSlideshow();
  initHeroControls();
  initHeadingReveals();
  initMilestonesTimeline();
  initSectionTwoImagePopout();
  initCardScrollReveals();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  function closeMenu() {
    navMenu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('open');
  });

  // Close nav when clicking a link (useful on mobile anchor jumps)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close nav on click outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== toggleBtn) {
      closeMenu();
    }
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  // Close nav on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * Premium Full-Slide Horizontal Project Experience
 * Sychronously translates the entire slide (image, metadata, title, and caption)
 * horizontally across the viewport with smooth 800ms easing.
 */
function initSlideshow() {
  const slides = document.querySelectorAll('.slideshow-slide');
  const prevBtn = document.getElementById('slide-prev-btn') || document.querySelector('.slideshow-btn.prev');
  const nextBtn = document.getElementById('slide-next-btn') || document.querySelector('.slideshow-btn.next');
  const dotsContainer = document.querySelector('.slideshow-dots');
  const playPauseBtn = document.getElementById('slide-playpause-btn') || document.querySelector('.slideshow-playpause');
  const slideshowContainer = document.querySelector('.slideshow-container');
  const viewport = document.getElementById('slideshow-viewport') || document.querySelector('.slideshow-viewport');
  const counterCurr = document.getElementById('slide-counter-curr');
  const progressBar = document.getElementById('slideshow-progress');

  if (!slides || slides.length === 0) return;

  const slideCount = slides.length;
  let currentIndex = 0;
  let isAnimating = false;
  let isPlaying = true;
  let intervalId = null;
  const slideIntervalMs = 5000;
  let progressStartTime = null;
  let progressAnimFrame = null;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    isPlaying = false;
  }

  // Generate accessible dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((slide, idx) => {
      const dot = document.createElement('button');
      dot.className = `slideshow-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to project ${idx + 1} of ${slideCount}`);
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        if (idx !== currentIndex && !isAnimating) {
          const dir = idx > currentIndex ? 'next' : 'prev';
          goToSlide(idx, dir);
          pauseSlideshow();
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Progress Bar Animation
  function startProgressBar() {
    if (!progressBar || prefersReducedMotion || !isPlaying) return;
    cancelProgressBar();
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth; // Force reflow
    progressBar.style.transition = `width ${slideIntervalMs}ms linear`;
    progressBar.style.width = '100%';
  }

  function cancelProgressBar() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
  }

  function pauseProgressBar() {
    if (!progressBar) return;
    const computedWidth = window.getComputedStyle(progressBar).width;
    progressBar.style.transition = 'none';
    progressBar.style.width = computedWidth;
  }

  // Core Slide Transition
  function goToSlide(targetIndex, direction = 'next') {
    if (isAnimating || targetIndex === currentIndex) return;

    const outgoingSlide = slides[currentIndex];
    const incomingSlide = slides[targetIndex];
    if (!outgoingSlide || !incomingSlide) return;

    // Handle Reduced Motion
    if (prefersReducedMotion) {
      outgoingSlide.classList.remove('is-active');
      incomingSlide.classList.add('is-active');
      updateUI(targetIndex);
      currentIndex = targetIndex;
      return;
    }

    isAnimating = true;

    // Clean previous animation classes
    slides.forEach(s => {
      s.classList.remove('anim-exit-left', 'anim-enter-right', 'anim-exit-right', 'anim-enter-left');
    });

    // Position incoming slide before transition
    if (direction === 'next') {
      incomingSlide.style.transform = 'translate3d(100%, 0, 0)';
    } else {
      incomingSlide.style.transform = 'translate3d(-100%, 0, 0)';
    }
    incomingSlide.style.visibility = 'visible';
    incomingSlide.style.zIndex = '2';
    outgoingSlide.style.zIndex = '1';

    // Force reflow so starting transform is registered
    void incomingSlide.offsetWidth;

    // Apply synchronized transition classes
    if (direction === 'next') {
      outgoingSlide.classList.add('anim-exit-left');
      incomingSlide.classList.add('anim-enter-right');
    } else {
      outgoingSlide.classList.add('anim-exit-right');
      incomingSlide.classList.add('anim-enter-left');
    }

    // Update metadata & counter simultaneously with motion
    updateUI(targetIndex);

    // Conclude transition after 820ms (800ms transition duration + small safety margin)
    setTimeout(() => {
      outgoingSlide.classList.remove('is-active', 'anim-exit-left', 'anim-exit-right');
      outgoingSlide.style.visibility = 'hidden';
      outgoingSlide.style.transform = '';
      outgoingSlide.style.zIndex = '';

      incomingSlide.classList.remove('anim-enter-right', 'anim-enter-left');
      incomingSlide.classList.add('is-active');
      incomingSlide.style.transform = '';
      incomingSlide.style.zIndex = '';

      currentIndex = targetIndex;
      isAnimating = false;

      if (isPlaying) {
        startProgressBar();
      }
    }, 820);
  }

  function updateUI(targetIndex) {
    // Update counter
    if (counterCurr) {
      counterCurr.textContent = String(targetIndex + 1).padStart(2, '0');
    }

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slideshow-dot');
      dots.forEach((dot, idx) => {
        const isActive = idx === targetIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slideCount;
    goToSlide(nextIndex, 'next');
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToSlide(prevIndex, 'prev');
  }

  // Autoplay Engine
  function startSlideshow() {
    if (intervalId || prefersReducedMotion) return;
    isPlaying = true;
    if (playPauseBtn) {
      playPauseBtn.textContent = 'Pause ❚❚';
      playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
    }
    startProgressBar();
    intervalId = setInterval(nextSlide, slideIntervalMs);
  }

  function pauseSlideshow() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isPlaying = false;
    pauseProgressBar();
    if (playPauseBtn) {
      playPauseBtn.textContent = 'Play ▶';
      playPauseBtn.setAttribute('aria-label', 'Play slideshow');
    }
  }

  // Next / Prev Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      pauseSlideshow();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      pauseSlideshow();
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseSlideshow();
      } else {
        startSlideshow();
      }
    });
  }

  // Hover Pause & Resume
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
      if (isPlaying) {
        clearInterval(intervalId);
        intervalId = null;
        pauseProgressBar();
      }
    });

    slideshowContainer.addEventListener('mouseleave', () => {
      if (isPlaying && !intervalId && !prefersReducedMotion) {
        startProgressBar();
        intervalId = setInterval(nextSlide, slideIntervalMs);
      }
    });

    // Keyboard Arrow Navigation
    slideshowContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        pauseSlideshow();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        pauseSlideshow();
      }
    });
  }

  // Touch Swipe Support for Mobile & Tablets
  if (viewport) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      // Only trigger horizontal swipe if greater than vertical travel & threshold met
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        pauseSlideshow();
      }
    }
  }

  // Initialize First Slide state
  slides.forEach((slide, idx) => {
    if (idx === 0) {
      slide.classList.add('is-active');
      slide.style.visibility = 'visible';
      slide.style.transform = 'translate3d(0, 0, 0)';
    } else {
      slide.classList.remove('is-active');
      slide.style.visibility = 'hidden';
      slide.style.transform = 'translate3d(100%, 0, 0)';
    }
  });

  updateUI(0);

  if (isPlaying && !prefersReducedMotion) {
    startSlideshow();
  }
}

/**
 * Ported Hero Controls (Language Dropdown & Mobile Nav)
 */
function initHeroControls() {
  const langBtn = document.getElementById('lang-btn');
  const langOptions = document.getElementById('lang-options');
  const langEnBtn = document.getElementById('lang-en-btn');
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (langBtn && langOptions) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = langOptions.style.display !== 'none';
      langOptions.style.display = isVisible ? 'none' : 'block';
      langBtn.setAttribute('aria-expanded', String(!isVisible));
    });

    if (langEnBtn) {
      langEnBtn.addEventListener('click', () => {
        langOptions.style.display = 'none';
        langBtn.setAttribute('aria-expanded', 'false');
      });
    }

    document.addEventListener('click', () => {
      langOptions.style.display = 'none';
      langBtn.setAttribute('aria-expanded', 'false');
    });
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = mobileNav.style.display !== 'none';
      mobileNav.style.display = isVisible ? 'none' : 'flex';
      menuBtn.setAttribute('aria-expanded', String(!isVisible));
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && e.target !== menuBtn) {
        mobileNav.style.display = 'none';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Reusable Cinematic Heading Reveal Utility using GSAP ScrollTrigger
 * Reveals section headings upward from behind an overflow clipping mask.
 */
let headingScrollTriggers = [];

function initHeadingReveals() {
  // Graceful degradation: Check library availability & reduced motion
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Clean up any previously registered triggers to prevent leaks
  cleanupHeadingReveals();

  const targets = document.querySelectorAll('.heading-reveal-target, [data-heading-reveal]');
  if (!targets.length) return;

  targets.forEach(heading => {
    // Ensure the heading is enclosed in an overflow clipping wrapper
    let wrap = heading.parentElement;
    if (!wrap || !wrap.classList.contains('heading-reveal-wrap')) {
      wrap = document.createElement('div');
      wrap.className = 'heading-reveal-wrap';
      heading.parentNode.insertBefore(wrap, heading);
      wrap.appendChild(heading);
    }

    // Initial state: ~40px below natural position, fully transparent
    gsap.set(heading, {
      y: 40,
      opacity: 0
    });

    // Create single-play ScrollTrigger reveal animation
    const tween = gsap.to(heading, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrap,
        start: 'top 85%',
        once: true
      },
      onComplete: () => {
        // Clear transform to ensure crisp, native subpixel font rendering
        gsap.set(heading, { clearProps: 'transform' });
      }
    });

    if (tween.scrollTrigger) {
      headingScrollTriggers.push(tween.scrollTrigger);
    }
  });
}

function cleanupHeadingReveals() {
  if (headingScrollTriggers && headingScrollTriggers.length > 0) {
    headingScrollTriggers.forEach(st => st.kill());
    headingScrollTriggers = [];
  }
}

// Global cleanup hook for component unmounting / page navigation
window.cleanupHeadingReveals = cleanupHeadingReveals;
window.addEventListener('beforeunload', cleanupHeadingReveals);

/**
 * Scroll-Driven Vertical Milestones Timeline (GSAP + ScrollTrigger)
 * Progressively draws active blue timeline line downward synchronized with scroll,
 * and sequentially reveals each achievement as its marker enters ~80% of viewport height.
 */
let milestoneScrollTriggers = [];

function initMilestonesTimeline() {
  const timelineWraps = document.querySelectorAll('.milestones-timeline-wrap');
  if (!timelineWraps.length) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Graceful fallback: ensure all content and active markers are immediately fully visible
    timelineWraps.forEach(wrap => {
      const activeLine = wrap.querySelector('.milestones-track-active');
      if (activeLine) activeLine.style.height = '100%';
      wrap.querySelectorAll('.milestone-item').forEach(item => {
        item.classList.add('is-active');
        item.querySelectorAll('.milestone-meta, .milestone-title, .milestone-award, .milestone-desc').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  cleanupMilestonesTimeline();

  timelineWraps.forEach(wrap => {
    const activeLine = wrap.querySelector('.milestones-track-active');
    const items = wrap.querySelectorAll('.milestone-item');

    // 1. Progressively draw the active blue timeline line downward
    if (activeLine) {
      gsap.set(activeLine, { height: '0%' });
      const lineTween = gsap.to(activeLine, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 0.3
        }
      });
      if (lineTween.scrollTrigger) {
        milestoneScrollTriggers.push(lineTween.scrollTrigger);
      }
    }

    // 2. Sequential reveal of each achievement at ~80% viewport height
    items.forEach(item => {
      const marker = item.querySelector('.milestone-marker');
      const meta = item.querySelector('.milestone-meta');
      const title = item.querySelector('.milestone-title');
      const award = item.querySelector('.milestone-award');
      const desc = item.querySelector('.milestone-desc');

      // Initial state: subtle upward movement prep (y: 20px, opacity: 0)
      if (meta) gsap.set(meta, { y: 20, opacity: 0 });
      if (title) gsap.set(title, { y: 20, opacity: 0 });
      if (award) gsap.set(award, { y: 20, opacity: 0 });
      if (desc) gsap.set(desc, { y: 16, opacity: 0 });
      if (marker) gsap.set(marker, { scale: 0.75, opacity: 0.4 });

      // Create sequence triggered when item enters ~80% of viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            item.classList.add('is-active');
          }
        }
      });

      // Activate marker
      if (marker) {
        tl.to(marker, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
      }
      // Reveal 1: Year / metadata first
      if (meta) {
        tl.to(meta, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.15');
      }
      // Reveal 2: Competition title second
      if (title) {
        tl.to(title, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.3');
      }
      // Reveal 3: Award / result third (activates subtle copper glow if .is-copper)
      if (award) {
        tl.to(award, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.3');
      }
      // Reveal 4: Description last
      if (desc) {
        tl.to(desc, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.3');
      }

      if (tl.scrollTrigger) {
        milestoneScrollTriggers.push(tl.scrollTrigger);
      }
    });
  });
}

function cleanupMilestonesTimeline() {
  if (milestoneScrollTriggers && milestoneScrollTriggers.length > 0) {
    milestoneScrollTriggers.forEach(st => st.kill());
    milestoneScrollTriggers = [];
  }
}

// Global cleanup hook
window.cleanupMilestonesTimeline = cleanupMilestonesTimeline;
window.addEventListener('beforeunload', cleanupMilestonesTimeline);

/**
 * Scroll-Driven 3D Pop-Out Animation for Section 02 Image (GSAP + ScrollTrigger)
 * Initially appears slightly smaller (0.94x) and recessed behind its normal plane.
 * As user scrolls into Section 02 ("// 01. INSTITUTIONAL FOUNDATION - Who We Are"),
 * smoothly emerges forward in 3D perspective to ~1.08x with an authentic elevation shadow,
 * staying rock-solid and stable once peak is reached.
 */
let sectionTwoScrollTrigger = null;

function initSectionTwoImagePopout() {
  const img = document.querySelector('#who-popout-img, #who .editorial-img-box img');
  const section = document.getElementById('who');
  if (!img || !section) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  cleanupSectionTwoImagePopout();

  const stage = img.closest('.editorial-img-box') || img.parentElement;
  if (stage) {
    stage.style.perspective = '1200px';
    stage.style.transformStyle = 'preserve-3d';
  }

  // Initial recessed state: slightly smaller, behind natural plane, subtle 3D pitch/yaw, gentle shadow
  gsap.set(img, {
    scale: 0.94,
    z: -30,
    rotationX: 3.5,
    rotationY: -2,
    transformOrigin: 'center center',
    transformStyle: 'preserve-3d',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.07)',
    willChange: 'transform, box-shadow'
  });

  // Smooth scroll-driven emergence toward viewer
  const tween = gsap.to(img, {
    scale: 1.08,
    z: 42,
    rotationX: 0,
    rotationY: 0,
    boxShadow: '0 26px 52px -12px rgba(18, 20, 26, 0.36), 0 10px 24px -6px rgba(36, 73, 216, 0.18)',
    ease: 'power1.out',
    scrollTrigger: {
      trigger: stage,
      start: 'top 85%',
      end: 'center 48%',
      scrub: 0.8,
      invalidateOnRefresh: true
    }
  });

  if (tween.scrollTrigger) {
    sectionTwoScrollTrigger = tween.scrollTrigger;
  }

  // Ensure trigger bounds are refreshed once image asset finishes decoding
  if (img.complete) {
    ScrollTrigger.refresh();
  } else {
    img.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }
}

function cleanupSectionTwoImagePopout() {
  if (sectionTwoScrollTrigger) {
    sectionTwoScrollTrigger.kill();
    sectionTwoScrollTrigger = null;
  }
}

window.cleanupSectionTwoImagePopout = cleanupSectionTwoImagePopout;
window.addEventListener('beforeunload', cleanupSectionTwoImagePopout);

/**
 * Global Scroll-Triggered Reveal Animation for Cards (GSAP + ScrollTrigger)
 * Automatically discovers and animates all cards and card-like UI elements across the website:
 * - Feature & Technical Cards (.tech-card)
 * - Collaboration / Sponsorship Tiers (.tier-card)
 * - Credibility Statistical Panels (.stats-grid > .bracket-wrap, .stat-panel)
 * - Flight Line Gallery Cards (.gallery-card)
 * - Ecosystem Partner Logo Cards (.partner-logo-item)
 * - Strategic Alliance & Contact Cards (.contact-card)
 * - Feature & Deployment Items (.feature-item)
 * - Generic Cards (.scroll-card-reveal, [data-card-reveal])
 *
 * Core Animation:
 * - Starts at translateY(45px) with opacity: 0.
 * - Smoothly translates upward to natural position while fading to opacity: 1.
 * - Natural ease-out transition (800ms) with a 120ms subtle stagger between cards.
 * - Animate once; clears inline transform upon completion to preserve native CSS hover interactions.
 * - Respects prefers-reduced-motion and supports dynamically rendered cards via MutationObserver.
 */
const CARD_SELECTORS = [
  '.tech-card',
  '.tier-card',
  '.stats-grid > .bracket-wrap',
  '.stat-panel:not(.bracket-wrap .stat-panel)',
  '.gallery-card',
  '.partner-logo-item',
  '.contact-card',
  '.feature-item',
  '.scroll-card-reveal',
  '[data-card-reveal]'
];
const CARD_SELECTORS_STR = CARD_SELECTORS.join(', ');

let cardScrollTriggers = [];
let cardMutationObserver = null;

function initCardScrollReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll(CARD_SELECTORS_STR).forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.classList.add('is-card-revealed');
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Clean up any existing card triggers before re-registering
  cleanupCardScrollReveals();

  const allCards = Array.from(document.querySelectorAll(CARD_SELECTORS_STR));
  if (!allCards.length) return;

  // Filter out any elements that shouldn't be handled by card reveal
  const targets = allCards.filter(card => {
    // Exclude slides inside the horizontal project slideshow or vertical milestone items
    if (card.closest('.slideshow-container, .milestones-timeline-wrap')) return false;
    // Don't re-animate cards that have already been revealed
    if (card.classList.contains('is-card-revealed')) return false;
    return true;
  });

  if (!targets.length) return;

  // Set initial hidden state: translateY(45px), opacity 0
  targets.forEach(card => {
    card.style.transition = 'none';
    gsap.set(card, {
      y: 45,
      opacity: 0,
      willChange: 'transform, opacity'
    });
  });

  // Create batch scroll triggers: 800ms natural ease-out with 120ms subtle stagger
  const batchTriggers = ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    interval: 0.1,
    onEnter: (batch) => {
      batch.forEach((card, idx) => {
        // Prevent CSS transition from competing with GSAP frame interpolation
        card.style.transition = 'none';
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: idx * 0.12, // 120ms subtle stagger
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            // Restore native CSS transitions for hover
            card.style.transition = '';
            // Clear inline transform to allow CSS hover (translateY: -2px) without conflicts
            gsap.set(card, { clearProps: 'transform,willChange' });
            card.classList.add('is-card-revealed');
          }
        });
      });
    }
  });

  if (batchTriggers && batchTriggers.length) {
    cardScrollTriggers.push(...batchTriggers);
  }

  // Setup mutation observer for dynamically rendered cards
  setupCardMutationObserver();
}

function setupCardMutationObserver() {
  if (typeof MutationObserver === 'undefined' || cardMutationObserver) return;

  let debounceTimer = null;
  cardMutationObserver = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      initCardScrollReveals();
    }, 150);
  });

  cardMutationObserver.observe(document.body, { childList: true, subtree: true });
}

function cleanupCardScrollReveals() {
  if (cardScrollTriggers && cardScrollTriggers.length) {
    cardScrollTriggers.forEach(st => st.kill());
    cardScrollTriggers = [];
  }
}

window.initCardScrollReveals = initCardScrollReveals;
window.cleanupCardScrollReveals = cleanupCardScrollReveals;
window.addEventListener('beforeunload', cleanupCardScrollReveals);


