(function () {
  'use strict';

  var mobileMenuBound = false;
  var pageInteractionsReady = false;

  document.documentElement.classList.add('loading-site');
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.documentElement.classList.remove('loading-site');
    }, 1100);
  });

  function initHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initScrollReveal() {
    var items = document.querySelectorAll('.animate-on-scroll');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  function setMobileMenuOpen(isOpen) {
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileOverlay = document.getElementById('mobileOverlay');
    if (!mobileMenu || !mobileOverlay) return;

    mobileMenu.classList.toggle('open', isOpen);
    mobileOverlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (menuToggle) {
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function initDesktopDropdowns() {
    var desktopNav = document.querySelector('.nav-desktop');
    if (!desktopNav) return;

    var items = desktopNav.querySelectorAll('.has-dropdown');
    var closeDelay = 320;

    items.forEach(function (item) {
      var closeTimer = null;

      function openMenu() {
        if (window.innerWidth <= 1024) return;
        clearTimeout(closeTimer);
        items.forEach(function (other) {
          if (other !== item) other.classList.remove('is-open');
        });
        item.classList.add('is-open');
      }

      function scheduleClose() {
        if (window.innerWidth <= 1024) return;
        clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          item.classList.remove('is-open');
        }, closeDelay);
      }

      item.addEventListener('mouseenter', openMenu);
      item.addEventListener('mouseleave', scheduleClose);
      item.addEventListener('focusin', openMenu);
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) scheduleClose();
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth <= 1024) {
        items.forEach(function (item) { item.classList.remove('is-open'); });
      }
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) return;
      if (!e.target.closest('.nav-desktop .has-dropdown')) {
        items.forEach(function (item) { item.classList.remove('is-open'); });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        items.forEach(function (item) { item.classList.remove('is-open'); });
      }
    });
  }

  function initMobileMenu() {
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileOverlay = document.getElementById('mobileOverlay');
    if (!menuToggle || !mobileMenu || !mobileOverlay) return;
    if (mobileMenuBound) return;
    mobileMenuBound = true;

    menuToggle.addEventListener('click', function () {
      setMobileMenuOpen(!mobileMenu.classList.contains('open'));
    });

    var menuClose = document.getElementById('menuClose');
    if (menuClose) {
      menuClose.addEventListener('click', closeMobileMenu);
    }

    mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileMenu.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var item = link.parentElement;
        var isOpen = item.classList.contains('open');
        mobileMenu.querySelectorAll('.has-dropdown.open').forEach(function (openItem) {
          if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open', !isOpen);
      });
    });

    mobileMenu.querySelectorAll('.sub-menu a, .nav-main > li:not(.has-dropdown) > a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) closeMobileMenu();
    });
  }

  function initHeroScene() {
    var scene = document.getElementById('heroScene');
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var visual = scene.closest('.hero-visual');
    if (!visual) return;

    var bounds = null;
    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;

    function updateBounds() {
      bounds = visual.getBoundingClientRect();
    }

    function tick() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      scene.style.setProperty('--px', currentX.toFixed(2) + 'px');
      scene.style.setProperty('--py', currentY.toFixed(2) + 'px');
      requestAnimationFrame(tick);
    }

    visual.addEventListener('mousemove', function (e) {
      if (!bounds) updateBounds();
      var x = (e.clientX - bounds.left) / bounds.width - 0.5;
      var y = (e.clientY - bounds.top) / bounds.height - 0.5;
      targetX = x * 16;
      targetY = y * 12;
    });

    visual.addEventListener('mouseleave', function () {
      targetX = 0;
      targetY = 0;
    });

    window.addEventListener('resize', updateBounds);
    updateBounds();
    tick();
  }

  function initPageInteractions() {
    if (pageInteractionsReady) return;
    if (!document.getElementById('menuToggle')) return;
    pageInteractionsReady = true;

    initMobileMenu();
    initDesktopDropdowns();
    initHeaderScroll();
    initScrollReveal();

    document.querySelectorAll('.accordion-title').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.accordion-item');
        var wasActive = item.classList.contains('active');
        item.closest('.accordion').querySelectorAll('.accordion-item').forEach(function (i) {
          i.classList.remove('active');
        });
        if (!wasActive) item.classList.add('active');
      });
    });

    document.querySelectorAll('.squiggle-animated').forEach(function (el, index) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var path = el.querySelector('path.cls-1');
            if (path) {
              var length = path.getTotalLength();
              path.style.transition = 'none';
              path.style.strokeDasharray = length + ' ' + length;
              path.style.strokeDashoffset = length;
              path.getBoundingClientRect();
              path.style.transition = 'stroke-dashoffset 1.4s ease-in-out';
              path.style.strokeDashoffset = '0';
            }
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });
      observer.observe(el);
      el.style.animationDelay = (index * 0.15) + 's';
    });
  }

  document.addEventListener('site:layout-ready', initPageInteractions);
  document.addEventListener('DOMContentLoaded', function () {
    initHeroScene();
    setTimeout(initPageInteractions, 100);
  });

  if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
    jQuery(function ($) {
      if ($('.service-slider').length) {
        $('.service-slider').slick({
          slidesToShow: 3, slidesToScroll: 1, dots: true, infinite: true,
          autoplay: true, autoplaySpeed: 3500, arrows: false,
          pauseOnFocus: false, pauseOnHover: true, cssEase: 'ease-in-out',
          responsive: [
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
          ]
        });
      }
      if ($('.student-reviews-slider').length) {
        $('.student-reviews-slider').slick({
          slidesToShow: 3, slidesToScroll: 1, dots: true, infinite: true,
          autoplay: true, autoplaySpeed: 5000, arrows: true,
          prevArrow: '<button type="button" class="slick-prev student-arrow" aria-label="Previous">&#10094;</button>',
          nextArrow: '<button type="button" class="slick-next student-arrow" aria-label="Next">&#10095;</button>',
          responsive: [
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
          ]
        });
      }
    });
  }
})();
