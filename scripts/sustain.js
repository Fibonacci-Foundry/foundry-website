/* ═══════════════════════════════════════════════════════════════════
   FIBONACCI FOUNDRY · sustain.js
   Amount selection for /sustain, and the hand-off to Zeffy.

   ┌───────────────────────────────────────────────────────────────┐
   │ SET THIS BEFORE LAUNCH. While it is empty the give button      │
   │ renders disabled with a visible notice, so the page cannot go  │
   │ live with a button that silently does nothing.                 │
   └───────────────────────────────────────────────────────────────┘
   Zeffy campaign URLs look like:
     https://www.zeffy.com/en-US/donation-form/<form-id>
   ═══════════════════════════════════════════════════════════════════ */

var ZEFFY_URL = '';

(function () {
  function init() {
    var give = document.getElementById('give');
    var note = document.getElementById('give-pending');
    var amounts = document.querySelectorAll('.sustain .amt');
    var chosen = null;

    amounts.forEach(function (btn) {
      btn.addEventListener('click', function () {
        /* no multi-select and no default — one judgement at a time */
        amounts.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        chosen = btn.dataset.amount || null;
        sync();
      });
    });

    function sync() {
      if (!give) return;
      if (!ZEFFY_URL) {
        give.setAttribute('aria-disabled', 'true');
        give.removeAttribute('href');
        if (note) note.hidden = false;
        return;
      }
      give.removeAttribute('aria-disabled');
      if (note) note.hidden = true;
      /* Zeffy reads a prefilled amount off the query string; "other"
         carries none and lets their form ask. */
      give.href = chosen ? ZEFFY_URL + '?amount=' + encodeURIComponent(chosen) : ZEFFY_URL;
    }

    if (give) {
      give.addEventListener('click', function (e) {
        if (give.getAttribute('aria-disabled') === 'true') e.preventDefault();
      });
    }
    sync();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
