(function () {
  'use strict';

  /* ---------- Team list (edited through Pages CMS: data/team.json) ---------- */
  var ICONS = {
    orcid: { src: 'assets/img/orcid.png', alt: 'ORCID', cls: 'orcid' },
    linkedin: { src: 'assets/img/linkedin.png', alt: 'LinkedIn', cls: 'linkedin' },
    profile: { src: 'assets/img/ku-medicine.png', alt: 'KU Medicine', cls: 'ku' }
  };

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    (children || []).forEach(function (c) {
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  function memberNode(m) {
    var info = el('div', { 'class': 'info' }, [
      el('p', {}, [m.name || '']),
      el('p', {}, [m.title || ''])
    ]);
    var linkKeys = ['orcid', 'linkedin', 'profile'].filter(function (k) { return m[k]; });
    if (linkKeys.length) {
      var links = el('div', { 'class': 'links' });
      linkKeys.forEach(function (k) {
        var ic = ICONS[k];
        links.appendChild(el('a', { href: m[k], target: '_blank', rel: 'noopener' }, [
          el('img', { src: ic.src, alt: ic.alt, 'class': ic.cls })
        ]));
      });
      info.appendChild(links);
    }
    var children = [];
    if (m.photo) {
      children.push(el('img', { 'class': 'photo', src: m.photo, alt: m.name || '', loading: 'lazy' }));
    } else {
      children.push(el('div', { 'class': 'photo' }));
    }
    children.push(info);
    return el('div', { 'class': 'member' }, children);
  }

  function renderTeam(data) {
    var members = (data && data.members) || [];
    var pi = document.getElementById('team-pi');
    var grid = document.getElementById('team-grid');
    members.forEach(function (m) {
      if (m.hidden) return;
      (m.pi ? pi : grid).appendChild(memberNode(m));
    });
  }

  fetch('data/team.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(renderTeam)
    .catch(function (err) { console.error('team.json could not be loaded', err); });

  /* ---------- Mobile menu ---------- */
  var nav = document.querySelector('.menu');
  var toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* ---------- Menu: smooth scroll and active section ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('data-target');
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      nav.classList.remove('open');
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      history.replaceState(null, '', id === 'top' ? location.pathname : '#' + id);
    });
  });

  var order = links.map(function (a) { return document.getElementById(a.getAttribute('data-target')); });
  function setActive() {
    var header = document.getElementById('site-header').offsetHeight;
    var y = window.scrollY + header + 1;
    var idx = 0;
    order.forEach(function (sec, i) { if (sec && sec.offsetTop <= y) idx = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) idx = order.length - 1;
    links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
})();
