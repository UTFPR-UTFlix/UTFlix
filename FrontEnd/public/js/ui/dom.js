// ui/dom.js - helpers utilitários
export const $ = (sel, el=document) => el.querySelector(sel);
export const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

export function el(tag, attrs={}, children=[]) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
  });
  children.forEach(c => e.append(c));
  return e;
}

// focus trap para o modal
export function trapFocus(container) {
  const focusable = $$('a, button, input, [tabindex]:not([tabindex="-1"])', container)
    .filter(el => !el.hasAttribute('disabled'));
  if (!focusable.length) return () => {};
  const [first, last] = [focusable[0], focusable[focusable.length - 1]];
  function onKey(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
  container.addEventListener('keydown', onKey);
  first.focus();
  return () => container.removeEventListener('keydown', onKey);
}
