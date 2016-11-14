import { getIndicatorClassName, getIndicatorSelector } from './constants';

function toggleSelectedClass(elems) {
  for (let i = elems.length; i--;) elems[i].classList.toggle('hi-selected');
}

function selectHl(hylyt) {
  setTimeout(() => {
    if (!(hylyt && hylyt.elems && hylyt.elems.length)) return;
    const selection = document.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    const range = document.createRange();
    range.setStartBefore(hylyt.elems[0]);
    range.setEndAfter(hylyt.elems[hylyt.elems.length - 1]);
    selection.addRange(range);
  });
}

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

function getTop(elems: Array) {
  return (
    ((elems[0].getBoundingClientRect().top +
    elems[elems.length - 1].getBoundingClientRect().bottom) / 2)
    + window.scrollY
  );
}

export function showScrollIndicator(hylyt: Object, onClick?: Function) {
  const className = getIndicatorClassName(hylyt.id);
  const top = getTop(hylyt.elems);
  const windowHeight = window.innerHeight;
  const fixedTop = (top / document.documentElement.scrollHeight) * windowHeight;
  let indicator = document.getElementsByClassName(className)[0];
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = className;
    // indicator.href = '#hi-' + hylyt.id;
    document.body.appendChild(indicator);
    indicator.addEventListener('click', (evt) => {
      window.scrollTo(0, (getTop() - windowHeight) / 2);
      if (onClick) onClick(hylyt, evt);
    });
  }
  indicator.style.top = `${fixedTop - 10}px`;
  return (top - windowHeight) / 2;
}
