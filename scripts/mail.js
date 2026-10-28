/* ═══════════════════════════════════════════════════════════════════
   FIBONACCI FOUNDRY · mail.js
   Writes the contact address in at load, so it never appears whole in
   the HTML for a scraper to lift. Wires up:
     · [data-mail]                → href becomes mailto:<address>
     · [data-mail="text"]         → text also becomes the address
     · [data-subject]             → appended as ?subject=
   Markup carries a readable fallback ("hello at fibonaccifoundry dot
   org") for anyone reading without scripts.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  var USER = 'hello';
  var HOST = ['fibonaccifoundry', 'org'].join('.');

  function init() {
    var addr = USER + String.fromCharCode(64) + HOST;
    document.querySelectorAll('[data-mail]').forEach(function (el) {
      var subject = el.getAttribute('data-subject');
      if (el.tagName === 'A') {
        el.href = 'mailto:' + addr + (subject ? '?subject=' + encodeURIComponent(subject) : '');
      }
      if (el.getAttribute('data-mail') === 'text') el.textContent = addr;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
