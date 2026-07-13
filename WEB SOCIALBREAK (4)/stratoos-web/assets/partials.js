/* ============================================================
   STRATOOS — Header + Footer compartidos (web dedicada Stratoos)
   Fuente única. Inyecta en #site-header y #site-footer.
   Marca activa con data-active="stratoos|core|content|design|play|live|mind|learn"
   ============================================================ */
(function () {
  var NAV = [
    { href: 'index.html#studios',     label: 'Studios' },
    { href: 'index.html#como-funciona', label: 'Implantación' },
    { href: 'index.html#stratoos-vs', label: 'Comparativa' },
    { href: 'index.html#seguridad',   label: 'Seguridad' },
  ];

  function brand(href) {
    return '<a class="brand" href="' + href + '" aria-label="Stratoos — inicio">' +
      '<img src="assets/stratoos-wordmark-bermellon.png" alt="Stratoos" class="brand-logo" /></a>';
  }

  function header(active) {
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + '</a></li>';
    }).join('');
    return '' +
      '<div class="site-header"><div class="wrap"><nav class="nav">' +
        brand('index.html') +
        '<ul class="nav-links" id="navLinks">' + links + '</ul>' +
        '<div class="nav-right">' +
          '<a class="btn btn-primary" href="index.html#demo">Solicitar demo</a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Menú"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</nav></div></div>';
  }

  function footer() {
    var legal = ['Aviso legal','Política de privacidad','Política de cookies'];
    var legalHtml = legal.map(function(l){ return '<a href="#">' + l + '</a>'; }).join('<span class="dot">·</span>');
    var studioLinks = [
      ['studio-core.html','Core'], ['studio-content.html','Content'], ['studio-design.html','Design'],
      ['studio-play.html','Play'], ['studio-live.html','Live'], ['studio-mind.html','Mind'], ['studio-learn.html','Learn']
    ];
    var mainLinks = [
      ['index.html#studios','Studios'],
      ['index.html#como-funciona','Implantación'],
      ['index.html#stratoos-vs','Comparativa'],
      ['index.html#seguridad','Seguridad'],
      ['index.html#demo','Solicitar demo']
    ];
    var navHtml = mainLinks.map(function(m){ return '<a href="' + m[0] + '">' + m[1] + '</a>'; }).join('');
    var studioHtml = studioLinks.map(function(s){ return '<a href="' + s[0] + '">' + s[1] + '</a>'; }).join('');
    return '' +
    '<footer class="site-footer" id="contacto"><div class="wrap foot-grid2">' +
      '<div class="foot-sub">' +
        '<div class="foot-sub-h">Suscríbete a</div>' +
        '<img class="foot-sub-logo" src="assets/stratoos-wordmark-peach.png" alt="Stratoos" />' +
        '<div style="font-size:12px;color:#8891a5;letter-spacing:.03em;margin:-14px 0 20px;">Powered by Smartmind</div>' +
        '<form class="foot-sub-form" onsubmit="return false;">' +
          '<div class="foot-sub-field"><input type="email" placeholder="Introduce tu email" aria-label="Introduce tu email" /><button type="submit" aria-label="Suscribirme">→</button></div>' +
          '<label class="foot-sub-consent"><input type="checkbox" /><span>He leído y acepto la Política de privacidad y me suscribo a la newsletter de Stratoos.</span></label>' +
        '</form>' +
      '</div>' +
      '<div class="foot-nav-block">' +
        '<nav class="foot-nav">' + navHtml + '</nav>' +
        '<nav class="foot-nav" style="margin-top:8px;">' + studioHtml + '</nav>' +
        '<nav class="foot-legal">' + legalHtml + '</nav>' +
        '<div class="foot-domain"><a href="index.html">Stratoos — un producto de Smartmind</a></div>' +
      '</div>' +
    '</div></footer>';
  }

  function mount() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    var active = (h && h.getAttribute('data-active')) || '';
    if (h) h.innerHTML = header(active);
    if (f) f.innerHTML = footer();
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', function () { links.classList.toggle('open'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
