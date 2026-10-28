/* ═══════════════════════════════════════════════════════════════════
   FIBONACCI FOUNDRY · mode.js
   Vellum / nocturne toggle. Wires up:
     · button.mode-toggle  → flip [data-mode] on <html>, persist choice
   The mode is NOT resolved here. It is set by a small blocking script
   in <head> before first paint — see any page's <head>. If it were
   deferred to this file the page would flash vellum before repainting
   nocturne, which is precisely the kind of convenience-ethic sloppiness
   the house style forbids. This file only handles the click.
   Storage key: ff-mode. Values: vellum | nocturne.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  var KEY = 'ff-mode';
  var root = document.documentElement;

  function label(btn) {
    var nocturne = root.dataset.mode === 'nocturne';
    var gl = btn.querySelector('.gl');
    var lab = btn.querySelector('.lab');
    /* the glyph shows the mode you are IN, not the one you would get */
    if (gl) gl.textContent = nocturne ? '☾' : '☉';
    if (lab) lab.textContent = nocturne ? 'nocturne' : 'vellum';
    btn.setAttribute('aria-pressed', nocturne ? 'true' : 'false');
    btn.setAttribute('title', nocturne ? 'to vellum' : 'to nocturne');
  }

  function init() {
    var buttons = document.querySelectorAll('button.mode-toggle');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      label(btn);
      btn.addEventListener('click', function () {
        root.dataset.mode = root.dataset.mode === 'nocturne' ? 'vellum' : 'nocturne';
        try { localStorage.setItem(KEY, root.dataset.mode); } catch (e) { /* private mode */ }
        buttons.forEach(label);
      });
    });

    /* follow the system only while the visitor has expressed no choice */
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        var stored = null;
        try { stored = localStorage.getItem(KEY); } catch (err) { /* ignore */ }
        if (stored) return;
        root.dataset.mode = e.matches ? 'nocturne' : 'vellum';
        buttons.forEach(label);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
