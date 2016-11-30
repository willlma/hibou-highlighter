// @flow
import { getIndicatorClassName, getIndicatorSelector } from './constants';
import type { Hylyt } from './constants';

function toggleSelectedClass(elems) {
  for (let i = elems.length; i--;) elems[i].classList.toggle('hi-selected');
}

const selectHl = (hylyt) => setTimeout(() => {
  if (!(hylyt && hylyt.elems && hylyt.elems.length)) return;
  const selection = document.getSelection();
  if (!selection) return;
  selection.removeAllRanges();
  const range = document.createRange();
  range.setStartBefore(hylyt.elems[0]);
  range.setEndAfter(hylyt.elems[hylyt.elems.length - 1]);
  selection.addRange(range);
});

function deactivateScrollIndicator() {
  const activeScrollIndicator = document.querySelector('.hi-scroll-indicator.active');
  if (activeScrollIndicator) activeScrollIndicator.classList.remove('active');
}

function getScrollIndicator(hylyt) {
  return document.querySelector(getIndicatorSelector(hylyt.id));
}

export function changeSelectedHighlight(lastHylyt: Object, hylyt: Object) {
  if (lastHylyt) toggleSelectedClass(lastHylyt.elems);
  deactivateScrollIndicator();
  if (hylyt) {
    selectHl(hylyt);
    if (lastHylyt !== hylyt) toggleSelectedClass(hylyt.elems);
    getScrollIndicator(hylyt).classList.add('active');
  }
}

function getTop(elems: Array<HTMLElement>) {
  return (
    ((elems[0].getBoundingClientRect().top +
    elems[elems.length - 1].getBoundingClientRect().bottom) / 2)
    + window.scrollY
  );
}

function createScrollIndicator(hylyt: Hylyt, onClick?: Function) {
  const indicator = document.createElement('div');
  indicator.className = getIndicatorClassName(hylyt.id);
  // indicator.href = '#hi-' + hylyt.id;
  document.body.appendChild(indicator);
  indicator.addEventListener('click', (evt: MouseEvent) => {
    window.scrollTo(0, (getTop(hylyt.elems) - window.innerHeight) / 2);
    if (onClick) onClick(hylyt, evt);
  });
  return indicator;
}

export function placeScrollIndicator(hylyt: Hylyt, indicator?: HTMLElement) {
  const top = getTop(hylyt.elems);
  const fixedTop = (top / document.documentElement.scrollHeight) * window.innerHeight;
  if (!indicator) indicator = getScrollIndicator(hylyt);
  indicator.style.top = `${fixedTop - 10}px`;
}

export function addScrollIndicator(hylyt: Hylyt, onClick?: Function) {
  const scrollIndicator = createScrollIndicator(hylyt, onClick);
  placeScrollIndicator(hylyt, scrollIndicator);
}

export function scrollToHighlight(hylyt: Hylyt) {
  const top = getTop(hylyt.elems);
  window.scrollTo((top - window.innerHeight) / 2);
}
