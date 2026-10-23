// Types `lines` (array of arrays of {t:text, c:tokenClass}) into `el` as
// code, char-by-char, then loops after a pause. Respects reduced-motion.
(function () {
  function typewriter(el, lines, opts) {
    var speed = (opts && opts.speed) || 22;
    var pause = (opts && opts.pause) || 6000;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function renderStatic() {
      el.innerHTML = '';
      lines.forEach(function (line, i) {
        line.forEach(function (tok) {
          var span = document.createElement('span');
          if (tok.c) span.className = tok.c;
          span.textContent = tok.t;
          el.appendChild(span);
        });
        if (i < lines.length - 1) el.appendChild(document.createTextNode('\n'));
      });
    }

    if (reduced) { renderStatic(); return; }

    var spans, flatTokens;

    function buildSkeleton() {
      el.innerHTML = '';
      spans = [];
      flatTokens = [];
      lines.forEach(function (line, i) {
        line.forEach(function (tok) {
          var span = document.createElement('span');
          if (tok.c) span.className = tok.c;
          el.appendChild(span);
          spans.push(span);
          flatTokens.push(tok.t);
        });
        if (i < lines.length - 1) {
          el.appendChild(document.createTextNode('\n'));
          spans.push(null);
          flatTokens.push('');
        }
      });
      var caret = document.createElement('span');
      caret.className = 'caret';
      el.appendChild(caret);
    }

    function run() {
      buildSkeleton();
      var tokenIdx = 0, charIdx = 0;
      var timer = setInterval(function () {
        if (tokenIdx >= flatTokens.length) {
          clearInterval(timer);
          setTimeout(run, pause);
          return;
        }
        var text = flatTokens[tokenIdx];
        if (!spans[tokenIdx] || !text) { tokenIdx++; charIdx = 0; return; }
        charIdx++;
        spans[tokenIdx].textContent = text.slice(0, charIdx);
        if (charIdx >= text.length) { tokenIdx++; charIdx = 0; }
      }, speed);
    }

    run();
  }
  window.typewriter = typewriter;
})();
