// Fetches minmj's real GitHub contribution history and renders it as a
// grid of squares colored with the site's own pink/green/butter/rose tokens
// instead of a single-color heatmap. Fails quietly (hides the section) if
// the API is unreachable — never shows fabricated data.
(function () {
  var USERNAME = 'minmj';
  var API = 'https://github-contributions-api.jogruber.de/v4/' + USERNAME + '?y=last';

  function buildWeeks(days) {
    var weeks = [];
    var first = new Date(days[0].date + 'T00:00:00Z');
    var pad = first.getUTCDay(); // 0 = Sunday
    var cells = new Array(pad).fill(null).concat(days);
    for (var i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }

  function levelFor(day) {
    var lvl = Number(day.level);
    if (lvl >= 0 && lvl <= 4) return lvl;
    var count = Number(day.count) || 0;
    if (count <= 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  }

  function render(container, days) {
    var weeks = buildWeeks(days);
    var grid = document.createElement('div');
    grid.className = 'contrib-grid';
    weeks.forEach(function (week) {
      var col = document.createElement('div');
      col.className = 'contrib-col';
      week.forEach(function (day) {
        var cell = document.createElement('span');
        cell.className = 'contrib-cell' + (day ? ' lvl-' + levelFor(day) : ' lvl-empty');
        if (day) cell.title = day.count + ' contribution' + (day.count === 1 ? '' : 's') + ' on ' + day.date;
        col.appendChild(cell);
      });
      grid.appendChild(col);
    });
    container.innerHTML = '';
    container.appendChild(grid);

    var legend = document.createElement('div');
    legend.className = 'contrib-legend';
    legend.innerHTML = '<span>Less</span>' +
      [0, 1, 2, 3, 4].map(function (l) { return '<span class="contrib-cell lvl-' + l + '"></span>'; }).join('') +
      '<span>More</span>';
    container.appendChild(legend);
  }

  var el = document.getElementById('contrib-chart');
  if (!el) return;

  fetch(API)
    .then(function (res) { if (!res.ok) throw new Error('bad status'); return res.json(); })
    .then(function (data) {
      if (!data || !Array.isArray(data.contributions) || !data.contributions.length) throw new Error('no data');
      render(el, data.contributions);
    })
    .catch(function () {
      el.closest('.section').style.display = 'none';
    });
})();
