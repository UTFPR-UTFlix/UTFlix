// ui/modal.js - modal player mock
import { $, el, trapFocus } from './dom.js';

let trapCleanup = null;

export function openModal(src) {
  let modal = $('#playerModal');
  if (!modal) {
    modal = el('div', { class: 'modal', id: 'playerModal', role: 'dialog', 'aria-modal': 'true', 'aria-hidden': 'true' });
    const dialog = el('div', { class: 'modal__dialog', role: 'document' }, [
      el('div', { class: 'modal__header' }, [
        el('h2', { class: 'modal__title' }, ['Reprodução']),
        el('button', { class: 'modal__close', 'aria-label': 'Fechar', onclick: () => closeModal() }, ['✕'])
      ]),
      el('div', { class: 'modal__body' }, [
        el('iframe', { class: 'modal__iframe', src: src || 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Player mock', allowfullscreen: true })
      ])
    ]);
    modal.append(dialog);
    document.body.append(modal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
  modal.setAttribute('aria-hidden', 'false');
  trapCleanup = trapFocus(modal);
}

export function closeModal() {
  const modal = document.querySelector('#playerModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  if (trapCleanup) trapCleanup();
}
