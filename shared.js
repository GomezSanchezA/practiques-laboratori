/* ═══════════ shared.js — Practice pages (S01–S09, D01–D17c) ═══════════ */

// ── Tabs ──
function showTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const t = btn.getAttribute('data-tab') || btn.textContent.trim().toLowerCase();
    btn.classList.toggle('active', t === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('panel-' + tabId);
  if (panel) panel.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab') || btn.textContent.trim().toLowerCase();
      showTab(tabId);
    });
  });

  // ── Slider binding (calls page-specific updateSim if defined) ──
  const slider = document.getElementById('simSlider');
  if (slider && typeof updateSim === 'function') {
    slider.addEventListener('input', updateSim);
    updateSim();
  }
});

// ── Simulator helpers ──
function lerp(a, b, t) { return a + (b - a) * t; }

function lerpRGBA(c1, c2, t, alpha) {
  return `rgba(${Math.round(lerp(c1.r,c2.r,t))},${Math.round(lerp(c1.g,c2.g,t))},${Math.round(lerp(c1.b,c2.b,t))},${alpha})`;
}

let _dropTimeout = null;

function triggerDrop() {
  const simDrop = document.getElementById('simDrop');
  if (!simDrop) return;
  simDrop.classList.remove('falling');
  void simDrop.offsetWidth;
  simDrop.classList.add('falling');
}
