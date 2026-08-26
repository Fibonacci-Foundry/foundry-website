/* ═══════════════════════════════════════════════════════════════════
   FIBONACCI FOUNDRY · cipher.js
   Petition modal logic. Include with <script src="/scripts/cipher.js">.
   Requires the .cipher-veil markup from /partials/cipher-veil.html
   to be present in the page. Wires up:
     · [data-petition]              → open modal
     · text matching /^petition/i   → open modal
     · .cipher-stamp                → open modal
     · #cipher-x, click outside,
       Escape key                   → close modal
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  function init() {
    var veil = document.getElementById('cipher-veil');
    if (!veil) return;

    function open()  { veil.classList.add('show');    veil.setAttribute('aria-hidden', 'false'); }
    function close() { veil.classList.remove('show'); veil.setAttribute('aria-hidden', 'true');  }

    document.querySelectorAll('[data-petition]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });

    document.querySelectorAll('a, button').forEach(function (el) {
      if (el.hasAttribute('data-petition')) return;
      var t = (el.textContent || '').trim().toLowerCase();
      if (/^petition\b/.test(t) || t === 'petition' || /petition for entry/.test(t)) {
        el.addEventListener('click', function (e) { e.preventDefault(); open(); });
      }
    });

    document.querySelectorAll('.cipher-stamp').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });

    var x = document.getElementById('cipher-x');
    if (x) x.addEventListener('click', close);
    veil.addEventListener('click', function (e) { if (e.target === veil) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
