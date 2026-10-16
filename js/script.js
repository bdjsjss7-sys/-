/* ============================================================
   РемБытТехника — Скрипты v2
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     ДАННЫЕ КАЛЬКУЛЯТОРА — техника и проблемы
     ========================================================== */
  const CALC_DATA = {
    wash: {
      label: 'Стиральная',
      issues: [
        { label: 'Не сливает воду', price: 45 },
        { label: 'Не набирает воду', price: 45 },
        { label: 'Не отжимает / барабан не крутится', price: 55 },
        { label: 'Шумит, гудит при отжиме', price: 90 },
        { label: 'Течёт вода', price: 45 },
        { label: 'Не греет воду', price: 50 },
        { label: 'Ошибка на дисплее', price: 55 },
        { label: 'Не включается', price: 45 }
      ]
    },
    dish: {
      label: 'Посудомойка',
      issues: [
        { label: 'Не сливает воду (E15, F11)', price: 45 },
        { label: 'Не набирает воду (F24)', price: 45 },
        { label: 'Плохо моет посуду', price: 40 },
        { label: 'Не сушит посуду', price: 45 },
        { label: 'Течёт вода', price: 45 },
        { label: 'Не открывается дверца', price: 40 },
        { label: 'Ошибка на дисплее', price: 55 },
        { label: 'Посторонний шум', price: 50 }
      ]
    },
    tv: {
      label: 'Телевизор',
      issues: [
        { label: 'Не включается', price: 55 },
        { label: 'Нет изображения / чёрный экран', price: 60 },
        { label: 'Нет звука', price: 50 },
        { label: 'Полосы / пятна на экране', price: 70 },
        { label: 'Не работает подсветка', price: 90 },
        { label: 'Сам выключается', price: 60 },
        { label: 'Не работает HDMI', price: 50 },
        { label: 'Пульт не реагирует', price: 40 }
      ]
    },
    coffee: {
      label: 'Кофемашина',
      issues: [
        { label: 'Не наливает кофе / слабый напор', price: 55 },
        { label: 'Течёт вода снизу', price: 65 },
        { label: 'Не нагревает воду', price: 60 },
        { label: 'Не работает капучинатор', price: 55 },
        { label: 'Не мелет кофе', price: 60 },
        { label: 'Ошибка на дисплее', price: 65 },
        { label: 'Шумит / гудит', price: 55 },
        { label: 'Постоянно просит промывку', price: 50 }
      ]
    },
    vacuum: {
      label: 'Пылесос',
      issues: [
        { label: 'Не включается', price: 30 },
        { label: 'Потерял мощность, плохо сосёт', price: 30 },
        { label: 'Шумит / вибрирует', price: 30 },
        { label: 'Аккумулятор быстро садится', price: 50 },
        { label: 'Не крутится турбощётка', price: 35 },
        { label: 'Не заряжается', price: 40 },
        { label: 'Робот не находит базу', price: 45 },
        { label: 'Робот не выезжает с базы', price: 45 }
      ]
    },
    boiler: {
      label: 'Водонагреватель',
      issues: [
        { label: 'Не греет воду', price: 45 },
        { label: 'Слабо греет / долго нагревает', price: 50 },
        { label: 'Течёт вода', price: 50 },
        { label: 'Выбивает автомат', price: 55 },
        { label: 'Не включается', price: 40 },
        { label: 'Шумит при нагреве', price: 45 },
        { label: 'Ошибка на дисплее', price: 55 }
      ]
    },
    oven: {
      label: 'Духовка',
      issues: [
        { label: 'Не греет', price: 45 },
        { label: 'Не работает конвекция', price: 50 },
        { label: 'Не работает пиролиз', price: 65 },
        { label: 'Не работает гриль', price: 50 },
        { label: 'Дверца не закрывается', price: 40 },
        { label: 'Не работает таймер', price: 45 },
        { label: 'Не горит свет внутри', price: 30 },
        { label: 'Ошибка на дисплее', price: 55 }
      ]
    },
    cooktop: {
      label: 'Варочная',
      issues: [
        { label: 'Не включается', price: 55 },
        { label: 'Не греет одна зона', price: 55 },
        { label: 'Сенсоры не реагируют', price: 60 },
        { label: 'Ошибка на дисплее', price: 60 },
        { label: 'Выбивает автомат', price: 65 },
        { label: 'Трещина на стекле', price: 90 },
        { label: 'Не работает таймер / автоотключение', price: 55 }
      ]
    },
    micro: {
      label: 'Микроволновка',
      issues: [
        { label: 'Не греет', price: 45 },
        { label: 'Искрит внутри', price: 35 },
        { label: 'Не крутится поддон', price: 35 },
        { label: 'Не включается', price: 40 },
        { label: 'Не работает гриль', price: 45 },
        { label: 'Шумит при работе', price: 40 },
        { label: 'Свет не горит', price: 30 }
      ]
    },
    hood: {
      label: 'Вытяжка',
      issues: [
        { label: 'Не работает мотор', price: 50 },
        { label: 'Не работает подсветка', price: 30 },
        { label: 'Слабо всасывает', price: 40 },
        { label: 'Шумит / вибрирует', price: 45 },
        { label: 'Не реагирует на кнопки', price: 50 },
        { label: 'Течёт / капает', price: 40 }
      ]
    },
    gas: {
      label: 'Газовая плита',
      issues: [
        { label: 'Не зажигается', price: 35 },
        { label: 'Гаснет пламя', price: 40 },
        { label: 'Слабый огонь', price: 35 },
        { label: 'Не работает электророзжиг', price: 40 },
        { label: 'Забиты форсунки', price: 35 },
        { label: 'Течёт газ', price: 55 }
      ]
    },
    small: {
      label: 'Фен / отпариватель',
      issues: [
        { label: 'Не включается', price: 25 },
        { label: 'Не греет', price: 30 },
        { label: 'Слабо дует пар', price: 30 },
        { label: 'Течёт вода', price: 30 },
        { label: 'Шумит', price: 30 },
        { label: 'Не работает регулятор', price: 30 }
      ]
    }
  };

  /* ==========================================================
     HEADER SCROLL
     ========================================================== */
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

  /* ==========================================================
     BURGER
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
     SMOOTH SCROLL
     ========================================================== */
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

  /* ==========================================================
     REVEAL
     ========================================================== */
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

  /* ==========================================================
     КАЛЬКУЛЯТОР В HERO
     ========================================================== */
  function initHeroCalc() {
    const calc = document.getElementById('heroCalc');
    const typesWrap = document.getElementById('calcTypes');
    const issuesWrap = document.getElementById('calcIssues');
    const valueEl = document.getElementById('calcValue');
    if (!calc || !typesWrap || !issuesWrap || !valueEl) return;

    const state = {
      type: 'wash',
      issue: 0
    };

    /* Рендер типов техники */
    function renderTypes() {
      typesWrap.innerHTML = Object.keys(CALC_DATA).map((key) => {
        const item = CALC_DATA[key];
        const cls = key === state.type ? 'hero-calc__chip is-active' : 'hero-calc__chip';
        return `<button type="button" class="${cls}" data-value="${key}">${item.label}</button>`;
      }).join('');
    }

    /* Рендер проблем под выбранный тип */
    function renderIssues() {
      const issues = CALC_DATA[state.type].issues;
      issuesWrap.innerHTML = issues.map((issue, i) => {
        const cls = i === state.issue ? 'hero-calc__chip is-active' : 'hero-calc__chip';
        return `<button type="button" class="${cls}" data-index="${i}">${issue.label}</button>`;
      }).join('');
    }

    /* Обновление цены */
    function updatePrice() {
      const issue = CALC_DATA[state.type].issues[state.issue];
      if (!issue) return;
      valueEl.style.opacity = '0';
      setTimeout(() => {
        valueEl.textContent = issue.price + ' BYN';
        valueEl.style.opacity = '1';
      }, 120);
    }

    /* Клик по типу */
    typesWrap.addEventListener('click', (e) => {
      const chip = e.target.closest('.hero-calc__chip');
      if (!chip) return;
      const val = chip.dataset.value;
      if (!val || val === state.type) return;
      state.type = val;
      state.issue = 0;
      renderTypes();
      renderIssues();
      updatePrice();
    });

    /* Клик по проблеме */
    issuesWrap.addEventListener('click', (e) => {
      const chip = e.target.closest('.hero-calc__chip');
      if (!chip) return;
      const idx = parseInt(chip.dataset.index, 10);
      if (isNaN(idx) || idx === state.issue) return;
      state.issue = idx;
      renderIssues();
      updatePrice();
    });

    /* Стартовый рендер */
    renderTypes();
    renderIssues();
    updatePrice();
  }

  /* ==========================================================
     КАРУСЕЛЬ ОТЗЫВОВ
     ========================================================== */
  function initTestimonial() {
    const block = document.getElementById('testimonial');
    if (!block) return;

    const data = [
      {
        text: 'Стиральная машина Bosch перестала сливать воду. Позвонил — сказали привезти в мастерскую. Нашли засор помпы, заменили за день, взяли 65 рублей. Работает как новая.',
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

  /* ==========================================================
     ФОРМЫ
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

  /* ==========================================================
     МАСКА ТЕЛЕФОНА
     ========================================================== */
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

  /* ==========================================================
     CURRENT PAGE
     ========================================================== */
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

  /* ==========================================================
     INIT
     ========================================================== */
  function init() {
    initHeaderScroll();
    initBurger();
    initSmoothScroll();
    initReveal();
    initHeroCalc();
    initTestimonial();
    initForms();
    initPhoneMask();
    initCurrentPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
