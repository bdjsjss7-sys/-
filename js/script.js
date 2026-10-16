/* ============================================================
   РемБытТехника — Скрипты
   Header · Меню · Reveal · Формы · Плавный скролл
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     1. HEADER ПРИ СКРОЛЛЕ
     ========================================================== */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    const update = () => {
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ==========================================================
     2. БУРГЕР-МЕНЮ
     ========================================================== */
  function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    const toggle = () => {
      const willOpen = !nav.classList.contains('is-open');
      burger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
      document.body.style.overflow = willOpen ? 'hidden' : '';
    };

    burger.addEventListener('click', toggle);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) toggle();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) toggle();
    });
  }

  /* ==========================================================
     3. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
     ========================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ==========================================================
     4. REVEAL ПРИ СКРОЛЛЕ
     ========================================================== */
  function initReveal() {
    const selectors = [
      '.section-head',
      '.service-card',
      '.process__step',
      '.feature',
      '.faq__item',
      '.form-block',
      '.footer__top'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    elements.forEach((el, index) => {
      el.classList.add('reveal');
      const delay = (index % 6) * 60;
      el.style.transitionDelay = delay + 'ms';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ==========================================================
     5. ОБРАБОТКА ФОРМ
     ========================================================== */
  function initForms() {
    const forms = document.querySelectorAll('form[data-formspree]');
    if (!forms.length) return;

    forms.forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        const formData = new FormData(form);

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';
          submitBtn.innerHTML = 'Отправляем...';
        }

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            showMessage(form, 'success', 'Спасибо! Мы перезвоним в течение 30 минут.');
            form.reset();
          } else {
            showMessage(form, 'error', 'Что-то пошло не так. Позвоните нам: +375 29 108-79-79');
          }
        } catch (error) {
          showMessage(form, 'error', 'Ошибка соединения. Позвоните нам: +375 29 108-79-79');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            submitBtn.innerHTML = originalText;
          }
        }
      });
    });
  }

  function showMessage(form, type, text) {
    const existing = form.querySelector('.form__message');
    if (existing) existing.remove();

    const message = document.createElement('div');
    message.className = 'form__message form__message--' + type;
    message.textContent = text;

    const styles = {
      success: {
        padding: '12px 14px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        background: 'rgba(16, 185, 129, 0.12)',
        color: '#047857',
        border: '1px solid rgba(16, 185, 129, 0.28)',
        marginTop: '4px',
        lineHeight: '1.5'
      },
      error: {
        padding: '12px 14px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        background: 'rgba(239, 68, 68, 0.10)',
        color: '#B91C1C',
        border: '1px solid rgba(239, 68, 68, 0.28)',
        marginTop: '4px',
        lineHeight: '1.5'
      }
    };

    Object.assign(message.style, styles[type] || styles.error);
    form.appendChild(message);

    setTimeout(() => message.remove(), 8000);
  }

  /* ==========================================================
     6. МАСКА ТЕЛЕФОНА
     ========================================================== */
  function initPhoneMask() {
    const inputs = document.querySelectorAll('input[data-phone]');
    if (!inputs.length) return;

    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.startsWith('80')) {
          value = '375' + value.slice(2);
        }

        value = value.slice(0, 12);

        let formatted = '';
        if (value.length > 0) formatted = '+';
        if (value.length > 0) formatted += value.slice(0, 3);
        if (value.length > 3) formatted += ' ' + value.slice(3, 5);
        if (value.length > 5) formatted += ' ' + value.slice(5, 8);
        if (value.length > 8) formatted += '-' + value.slice(8, 10);
        if (value.length > 10) formatted += '-' + value.slice(10, 12);

        e.target.value = formatted;
      });
    });
  }

  /* ==========================================================
     7. АНИМАЦИЯ ЧИСЕЛ
     ========================================================== */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = '1';
            animate(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ==========================================================
     8. АКТИВНАЯ ССЫЛКА В МЕНЮ
     ========================================================== */
  function initCurrentPage() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const path = window.location.pathname.split('/').pop() || 'index.html';

    nav.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      link.classList.remove('is-current');

      if (href === path) {
        link.classList.add('is-current');
      }
    });
  }

  /* ==========================================================
     ИНИЦИАЛИЗАЦИЯ
     ========================================================== */
  function init() {
    initHeaderScroll();
    initBurger();
    initSmoothScroll();
    initReveal();
    initForms();
    initPhoneMask();
    initCounters();
    initCurrentPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
