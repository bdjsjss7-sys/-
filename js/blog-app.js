(function () {
  var CATS = {
    wash:'Стиральные машины', dish:'Посудомойки', tv:'Телевизоры',
    coffee:'Кофемашины', boiler:'Водонагреватели', oven:'Духовки',
    cooktop:'Варочные панели', vacuum:'Пылесосы', hood:'Вытяжки',
    gas:'Газовые плиты', small:'Мелкая техника', micro:'Микроволновки'
  };
  var ICONS = {
    wash:'<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="14" r="1.5"/><line x1="15" y1="7" x2="17" y2="7"/>',
    dish:'<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/><circle cx="8" cy="6" r="0.5" fill="currentColor"/><path d="M8 14c1.5 0 2.5 1 2.5 2s-1 2-2.5 2"/>',
    tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><polyline points="8 21 12 17 16 21"/>',
    coffee:'<path d="M6 4h12v4a6 6 0 0 1-12 0V4z"/><path d="M4 20h16"/><path d="M12 14v4"/>',
    boiler:'<rect x="6" y="4" width="12" height="16" rx="3"/><path d="M12 8v4M12 8l-2 2M12 8l2 2"/>',
    oven:'<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="9" y1="15" x2="15" y2="15"/>',
    cooktop:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/>',
    vacuum:'<circle cx="10" cy="14" r="5"/><path d="M15 14h5v-4l-3-2"/><path d="M10 9V6"/>',
    hood:'<path d="M4 14h16v6H4z"/><path d="M7 14V6h10v8"/><circle cx="12" cy="17" r="1"/>',
    gas:'<circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M8 9c0-1.5 0-3 0-4M16 9c0-1.5 0-3 0-4"/>',
    small:'<path d="M9 3h6v6a3 3 0 0 1-6 0V3z"/><path d="M12 12v4"/><rect x="8" y="16" width="8" height="5" rx="1"/>',
    micro:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="15" cy="12" r="3"/><line x1="7" y1="12" x2="7.01" y2="12"/>'
  };
  var POSTS = window.BLOG_POSTS || [];
  var catsWrap = document.getElementById('blogCats');
  var gridWrap = document.getElementById('blogGrid');
  var moreWrap = document.getElementById('blogMoreWrap');
  var moreBtn  = document.getElementById('blogMore');
  var listView = document.getElementById('blogListView');
  var artView  = document.getElementById('articleView');
  if (!catsWrap || !gridWrap) return;

  var INITIAL = 9, STEP = 9, currentCat = 'all', shown = INITIAL;

  function renderCats() {
    var counts = { all: POSTS.length };
    for (var k in CATS) counts[k] = 0;
    POSTS.forEach(function(p){ counts[p.cat]++; });
    var h = '<button type="button" class="blog-cat'+(currentCat==='all'?' is-active':'')+'" data-cat="all">Все статьи<span class="blog-cat__count">'+counts.all+'</span></button>';
    for (var key in CATS) {
      h += '<button type="button" class="blog-cat'+(currentCat===key?' is-active':'')+'" data-cat="'+key+'">'+CATS[key]+'<span class="blog-cat__count">'+counts[key]+'</span></button>';
    }
    catsWrap.innerHTML = h;
  }

  function cardHTML(p) {
    var icon = ICONS[p.cat] || ICONS.wash;
    var catName = CATS[p.cat] || '';
    return '<button type="button" class="blog-card" data-slug="'+p.slug+'">' +
      '<div class="blog-card__cover"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">'+icon+'</svg></div>' +
      '<div class="blog-card__body">' +
        '<div class="blog-card__meta"><span class="blog-card__cat">'+catName+'</span><span class="blog-card__sep">·</span><span>'+p.time+' мин</span></div>' +
        '<div class="blog-card__title">'+p.title+'</div>' +
        '<p class="blog-card__text">'+p.excerpt+'</p>' +
        '<span class="blog-card__link">Читать статью<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>' +
      '</div></button>';
  }

  function renderPosts() {
    var list = currentCat === 'all' ? POSTS : POSTS.filter(function(p){ return p.cat === currentCat; });
    var slice = list.slice(0, shown);
    gridWrap.innerHTML = slice.map(cardHTML).join('');
    if (list.length > shown) {
      moreWrap.style.display = 'flex';
      moreBtn.textContent = 'Показать ещё (' + (list.length - shown) + ')';
    } else {
      moreWrap.style.display = 'none';
    }
  }

  function openArticle(slug) {
    var p = null;
    for (var i = 0; i < POSTS.length; i++) if (POSTS[i].slug === slug) { p = POSTS[i]; break; }
    if (!p) return;
    var catName = CATS[p.cat] || '';
    artView.innerHTML =
      '<button type="button" class="article-view__back" id="articleBack"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Ко всем статьям</button>' +
      '<div class="article-view__meta"><span class="article-view__cat">'+catName+'</span><span>·</span><span>'+p.time+' мин чтения</span></div>' +
      '<h1 class="article-view__title">'+p.title+'</h1>' +
      '<p class="article-view__lead">'+p.excerpt+'</p>' +
      '<div class="article-body">'+p.body+'</div>' +
      '<div class="article-cta">' +
        '<div class="article-cta__title">Нужна помощь мастера?</div>' +
        '<p class="article-cta__text">Позвоните — опишите проблему, назовём вилку стоимости и подскажем, когда удобнее привезти технику.</p>' +
        '<a href="tel:+375291087979" class="article-cta__phone">+375 29 108-79-79</a>' +
      '</div>';
    listView.style.display = 'none';
    artView.classList.add('is-open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('articleBack').addEventListener('click', closeArticle);
    history.replaceState(null, '', '#article-' + slug);
  }

  function closeArticle() {
    artView.classList.remove('is-open');
    listView.style.display = '';
    history.replaceState(null, '', '#blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  catsWrap.addEventListener('click', function (e) {
    var cat = e.target.closest('.blog-cat');
    if (!cat) return;
    var val = cat.dataset.cat;
    if (!val || val === currentCat) return;
    currentCat = val; shown = INITIAL;
    renderCats(); renderPosts();
  });

  gridWrap.addEventListener('click', function (e) {
    var card = e.target.closest('.blog-card');
    if (!card) return;
    openArticle(card.dataset.slug);
  });

  if (moreBtn) moreBtn.addEventListener('click', function () { shown += STEP; renderPosts(); });

  renderCats();
  renderPosts();

  if (location.hash.indexOf('#article-') === 0) openArticle(location.hash.replace('#article-',''));
})();
