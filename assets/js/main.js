/* Horizon Wood Products — site interactions */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Quote form endpoint (Formspree). Submissions go to the inbox set up in the Formspree dashboard. */
  var FORM_ENDPOINT = 'https://formspree.io/f/xjyyzerp';

  // Sticky header shadow
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Mobile menu
  var burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Mega menu
  document.querySelectorAll('.has-mega').forEach(function (li) {
    var btn = li.querySelector('button');
    var desktop = window.matchMedia('(min-width: 901px)');
    function set(open) { li.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!li.classList.contains('open')); });
    li.addEventListener('mouseenter', function () { if (desktop.matches) set(true); });
    li.addEventListener('mouseleave', function () { if (desktop.matches) set(false); });
    document.addEventListener('click', function (e) { if (desktop.matches && !li.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  });

  // Scroll reveal: only elements below the first screen are hidden, so the page is complete at rest.
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('reveal-in'); en.target.classList.remove('reveal-pending'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el, i) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-pending');
        el.style.transitionDelay = ((el.dataset.reveal | 0) * 80) + 'ms';
        io.observe(el);
      }
    });
  }

  // Count-up stats (numbers are already correct in the HTML; this only animates them)
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, end = parseInt(el.dataset.count, 10), start = el.dataset.from ? parseInt(el.dataset.from, 10) : 0, t0 = null;
        co.unobserve(el);
        function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
          el.firstChild.nodeValue = Math.round(start + (end - start) * e);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: .6 });
    document.querySelectorAll('[data-count]').forEach(function (el) { co.observe(el); });
  }

  // Bedding video: sound toggle
  document.querySelectorAll('[data-sound]').forEach(function (b) {
    var v = document.getElementById(b.dataset.sound);
    if (!v) return;
    b.addEventListener('click', function () {
      v.muted = !v.muted; if (!v.muted) { v.play().catch(function () {}); }
      b.textContent = v.muted ? 'Sound off' : 'Sound on';
    });
  });

  // Quote form: preselect product from #hash, then submit
  var form = document.getElementById('quote-form');
  if (form) {
    var h = (location.hash || '').replace('#', '');
    var pre = form.querySelector('input[name="product"][value="' + h + '"]');
    if (pre) pre.checked = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      function show(msg) { status.hidden = false; status.textContent = msg; status.focus && status.focus(); }
      if (!FORM_ENDPOINT) {
        show('This form is not connected to an inbox yet. Please call (260) 450-8511 or email isaac@horizonwoodproducts.com and we will get your quote started.');
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (body) {
            if (r.ok) {
              form.reset();
              show('Thanks! Your request is in and we will be in touch shortly.');
              return;
            }
            var errs = (body && body.errors) ? body.errors.map(function (x) { return x.message; }).join(' ') : '';
            show((errs ? errs + ' ' : 'Your request did not go through. ') + 'You can also call (260) 450-8511 or email isaac@horizonwoodproducts.com.');
          });
        })
        .catch(function () { show('Your request did not go through. Please call (260) 450-8511 or email isaac@horizonwoodproducts.com.'); })
        .then(function () { if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); } });
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
