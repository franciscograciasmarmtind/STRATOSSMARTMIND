/* ============================================================
   STRATOOS — Interacciones: explorador de Studios, contadores, reveal
   ============================================================ */
(function () {
  var STUDIOS = {
    core:    { n:'01', name:'Core',    verb:'Centralizar', metric:'∞', color:'var(--s-core)', href:'studio-core.html',
      desc:'El núcleo semántico del ecosistema. Un sistema RAG que entiende qué contenido existe, evita la duplicación y compone el recorrido exacto para cada persona.',
      caps:['Estructura semántica compleja','Recuperación aumentada (RAG)','Composición de rutas','Detección de obsolescencia','Orquestación del sistema','Integración con tu LMS'] },
    content: { n:'02', name:'Content', verb:'Generar', metric:'−90%', color:'var(--s-content)', href:'studio-content.html',
      desc:'El generador de cursos IA más completo del mercado. Pipeline de 10 etapas con verificación factual y validación normativa. Del brief al curso en menos de 10 minutos.',
      caps:['Verificación factual real','Validación normativa (BOE, ISO)','Generación parametrizada','Generación paralela multi-nivel','Control de costes por etapa','Independencia de proveedor IA'] },
    design:  { n:'03', name:'Design',  verb:'Diseñar', metric:'SCORM', color:'var(--s-design)', href:'studio-design.html',
      desc:'La herramienta de autor que no deja de sorprender. La IA genera contenido rico y coherente, y el autor mantiene control total. Publica en SCORM, xAPI y HTML5.',
      caps:['Generación automática AI-native','Editor visual de máxima potencia','Diseño de marca institucional','Publicación multi-formato'] },
    play:    { n:'04', name:'Play',    verb:'Sumergir', metric:'0', color:'var(--s-play)', href:'studio-play.html',
      desc:'El alumno no completa un curso: lo protagoniza. Aventuras contextuales ramificadas y role plays sin opciones predefinidas. Genera evidencia cognitiva (Bloom, xAPI).',
      caps:['Aventuras contextuales ramificadas','Role play sin opciones predefinidas','Evidencia cognitiva científica','Transforma contenido existente'] },
    live:    { n:'05', name:'Live',    verb:'Tutorizar', metric:'−70%', color:'var(--s-live)', href:'studio-live.html',
      desc:'El motor de productividad educativa AI-native. Se construye sobre tu LMS actual y lo transforma: bandeja unificada, detección de riesgo, asistente por voz y analítica.',
      caps:['Bandeja unificada multi-LMS','Detección proactiva de riesgo','Asistente por voz','La IA propone, el tutor decide'] },
    mind:    { n:'06', name:'Mind',    verb:'Medir', metric:'5', color:'var(--s-mind)', href:'studio-mind.html',
      desc:'El motor de evaluación cognitiva con base científica. No mide completado: certifica competencia demostrada. Cinco scores y tres estados de certificación acumulativos.',
      caps:['5 dimensiones de competencia','Conjuntivo, no compensatorio','Base científica (Bloom, ECD)','Evidencia auditable y exportable'] },
    learn:   { n:'07', name:'Learn',   verb:'Escalar', metric:'∞', color:'var(--s-learn)', href:'studio-learn.html',
      desc:'La plataforma de formación continua B2B que personaliza rutas en tiempo real. Funciona como un streaming, pero entiende a quién sirve. Engagement tipo Duolingo.',
      caps:['Acceso ilimitado B2B','Personalización por Mind en vivo','Analítica detallada real','Engagement tipo Duolingo'] }
  };

  function renderPanel(key) {
    var s = STUDIOS[key];
    var panel = document.getElementById('sxPanel');
    if (!s || !panel) return;
    panel.style.setProperty('--c', s.color);
    panel.querySelector('.pnum').textContent = s.n;
    panel.querySelector('.pname').textContent = s.name;
    panel.querySelector('.pverb').textContent = s.verb;
    panel.querySelector('.pmetric').textContent = s.metric;
    panel.querySelector('.pdesc').textContent = s.desc;
    var ul = panel.querySelector('.pcaps');
    ul.innerHTML = s.caps.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    var a = panel.querySelector('.pfoot a');
    a.href = s.href;
    a.innerHTML = 'Ver Studio ' + s.name + ' <span aria-hidden="true">→</span>';
    var inner = panel.querySelector('.pinner');
    inner.classList.remove('sx-fade'); void inner.offsetWidth; inner.classList.add('sx-fade');
  }

  function initExplorer() {
    var tabs = document.querySelectorAll('.sx-tab');
    if (!tabs.length) return;
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        t.setAttribute('aria-selected', 'true');
        renderPanel(t.getAttribute('data-studio'));
      });
      t.addEventListener('mouseenter', function () {
        if (window.matchMedia('(hover:hover)').matches) {
          tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
          t.setAttribute('aria-selected', 'true');
          renderPanel(t.getAttribute('data-studio'));
        }
      });
    });
    renderPanel('core');
  }

  // Contadores animados
  function animateCount(el) {
    var raw = el.getAttribute('data-count');
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var target = parseFloat(raw);
    if (isNaN(target)) { el.textContent = prefix + raw + suffix; return; }
    var dur = 1100, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initObservers() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revs = document.querySelectorAll('.reveal');
    var counts = document.querySelectorAll('[data-count]');
    if (reduce || !('IntersectionObserver' in window)) {
      revs.forEach(function (r) { r.classList.add('in'); });
      counts.forEach(function (c) { c.textContent = (c.getAttribute('data-prefix')||'') + c.getAttribute('data-count') + (c.getAttribute('data-suffix')||''); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revs.forEach(function (r) { io.observe(r); });

    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io2.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counts.forEach(function (c) { io2.observe(c); });
  }

  function boot() { initObservers(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
