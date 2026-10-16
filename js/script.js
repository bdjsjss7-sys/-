/* ============================================================
   РемБытТехника — Скрипты v2
   ============================================================ */

(function () {
  'use strict';

  /* HEADER SCROLL + TOPBAR */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    const topbar = document.getElementById('topbar');
    if (!header) return;

    let ticking = false;
    const update = () => {
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
        if (topbar) topbar.classList.add('is-hidden');
      } else {
        header.classList.remove('is-scrolled');
        if (topbar) topbar.classList.remove('is-hidden');
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

  /* BURGER */
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

  /* SMOOTH SCROLL */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* REVEAL */
  function initReveal() {
    const elements = document.querySelectorAll(
      '.head, .service-row, .stat-block, .tl-step, .not-doing, .testimonial, .form-wrap, .hero-calc'
    );
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    elements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* HERO КАЛЬКУЛЯТОР */
  function initHeroCalc() {
    const calc = document.getElementById('heroCalc');
    const valueEl = document.getElementById('calcValue');
    if (!calc || !valueEl) return;

    const prices = {
      wash:      { simple: 30, medium: 45, complex: 60 },
      dish:      { simple: 35, medium: 50, complex: 70 },
      tv:        { simple: 40, medium: 60, complex: 90 },
      coffee:    { simple: 45, medium: 65, complex: 90 },
      boiler:    { simple: 35, medium: 55, complex: 80 },
      oven:      { simple: 30, medium: 50, complex: 70 }
    };

    const state = { type: 'wash', issue: 'simple' };

    const update = () => {
      const price = prices[state.type]?.[state.issue] || 30;
      valueEl.style.opacity = '0';
      setTimeout(() => {
        valueEl.textContent = price + ' BYN';
        valueEl.style.opacity = '1';
      }, 120);
    };

    calc.querySelectorAll('.hero-calc__chips').forEach((group) => {
      const groupName = group.dataset.group;
      group.querySelectorAll('.hero-calc__chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          group.querySelectorAll('.hero-calc__chip').forEach((c) => c.classList.remove('is-active'));
          chip.classList.add('is-active');
          state[groupName] = chip.dataset.value;
          update();
        });
      });
    });
  }

  /* КАРУСЕЛЬ ОТЗЫВОВ */
  function initTestimonial() {
    const block = document.getElementById('testimonial');
    if (!block) return;

    const data = [
      {
        text: 'Стиральная машина Bosch перестала сливать воду. Позвонил — сказали привезти в мастерскую. Диагностика бесплатная, нашли засор помпы. Заменили за день, взяли 65 рублей. Работает как новая.',
        name: 'Андрей',
        device: 'Стиральная машина Bosch'
      },
      {
        text: 'Телевизор Samsung перестал включаться. В сервисе по гарантии сказали, что ремонт нецелесообразен. Здесь нашли проблему в блоке питания, заменили за 2 дня. Работает уже год.',
        name: 'Марина',
        device: 'Телевизор Samsung'
      },
      {
        text: 'Посудомойка Indesit выдавала ошибку E15. Ребята быстро разобрались, заменили уплотнитель. Обошлось в 50 рублей, а не в новый агрегат. Спасибо.',
        name: 'Дмитрий',
        device: 'Посудомойка Indesit'
      },
      {
        text: 'Кофемашина DeLonghi перестала подавать воду. Думал, всё — покупать новую. Починили за день, заменили помпу. Работает отлично.',
        name: 'Елена',
        device: 'Кофемашина DeLonghi'
      },
      {
        text: 'Водонагреватель потёк. Привёз в мастерскую, заменили ТЭН и анод, почистили от накипи. 70 рублей и всё работает. Рекомендую.',
        name: 'Сергей',
        device: 'Водонагреватель'
      }
    ];

    let current = 0;
    const quoteEl = document.getElementById('testimonialQuote');
    const nameEl = document.getElementById('testimonialName');
    const avatarEl = document.getElementById('testimonialAvatar');
    const deviceEl = document.getElementById('testimonialDevice');
    const dotsWrap = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');

    const render = () => {
      const item = data[current];
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = item.text;
        nameEl.textContent = item.name;
        deviceEl.textContent = item.device;
        avatarEl.textContent = item.name.charAt(0);
        quoteEl.style.transition = 'opacity 0.35s';
        quoteEl.style.opacity = '1';
      }, 200);

      dotsWrap.querySelectorAll('.testimonial__dot').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
      });
    };

    data.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
      dot.addEventListener('click', () => { current = i; render(); });
      dotsWrap.appendChild(dot);
    });

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + data.length) % data.length;
      render();
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % data.length;
      render();
    });

    render();
  }

  /* ФОРМЫ */
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
            showMessage(form, 'error', 'Что-то пошло не так. Позвоните: +375 29 108-79-79');
          }
        } catch (err) {
          showMessage(form, 'error', 'Ошибка соединения. Позвоните: +375 29 108-79-79');
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
    message.className = 'form__message';
    message.textContent = text;
    const styles = type === 'success'
      ? { padding: '12px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', background: 'rgba(16,185,129,0.12)', color: '#047857', border: '1px solid rgba(16,185,129,0.28)', marginTop: '8px' }
      : { padding: '12px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', background: 'rgba(239,68,68,0.10)', color: '#B91C1C', border: '1px solid rgba(239,68,68,0.28)', marginTop: '8px' };
    Object.assign(message.style, styles);
    form.appendChild(message);
    setTimeout(() => message.remove(), 8000);
  }

  /* МАСКА ТЕЛЕФОНА */
  function initPhoneMask() {
    document.querySelectorAll('input[data-phone]').forEach((input) => {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('80')) value = '375' + value.slice(2);
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

  /* СЧЁТЧИКИ */
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

  /* CURRENT PAGE */
  function initCurrentPage() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const path = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      link.classList.remove('is-current');
      if (href === path) link.classList.add('is-current');
    });
  }

  /* INIT */
  function init() {
    initHeaderScroll();
    initBurger();
    initSmoothScroll();
    initReveal();
    initHeroCalc();
    initTestimonial();
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
