// @flow
import { getLocation } from './dom-mutation';
import getSelector from './get-selector';
import createElems from './create-elems';
import { addScrollIndicator } from './selected-highlight';
import { tagName, hylytModeClassName } from './constants';
import type { Hylyt } from './constants';

export function toggleSelectionBackground(toggle?: bool, elem: HTMLElement = document.body) {
  elem.classList.toggle(hylytModeClassName, toggle);
}

function getRangeHtml(range) {
  const container = (range.commonAncestorContainer.parentElement ||
    document.body).cloneNode(false);
  container.appendChild(range.cloneContents());
  return container.innerHTML;
}

export function isValidRange(range: Range) {
  const { startContainer, endContainer } = range;
  return (
    startContainer instanceof Text &&
    endContainer instanceof Text &&
    startContainer.parentElement &&
    startContainer.parentElement.localName !== tagName &&
    endContainer.parentElement &&
    endContainer.parentElement.localName !== tagName
  );
}

export function highlightRange(id: number, range: Range, onClick?: Function): ?Hylyt {
  if (!isValidRange(range)) return null;
  const { startContainer, endContainer } = range;
  const startLocation = getLocation(startContainer);
  const endLocation = getLocation(endContainer);
  const hylyt = {
    id,
    html: getRangeHtml(range),
    startSelector: getSelector(startContainer),
    startNodeIndex: startLocation.index,
    startOffset: range.startOffset + startLocation.offset,
    endSelector: getSelector(endContainer),
    endNodeIndex: endLocation.index,
    endOffset: range.endOffset + endLocation.offset,
    deleted: false,
    elems: createElems(range, (evt: MouseEvent) => onClick && onClick(hylyt, evt))
  };
  return hylyt;
}

function highlightSelection(selection, id: number, onClick?: Function) {
  let i = 0;
  const range = selection.getRangeAt(0);
  const { startOffset, startContainer, endContainer } = range;
  if (range.collapsed || !isValidRange(range) ||
      (startContainer === endContainer &&
      range.endOffset - startOffset < 3)) {
    return null;
  }
  range.commonAncestorContainer.normalize();
  for (let len = selection.rangeCount - 1;
      i < len && range.endContainer.nodeType !== Node.TEXT_NODE;
      i++) {
    const currentRange = selection.getRangeAt(i);
    range.setEnd(currentRange.endContainer, currentRange.endOffset);
  }
  const re = /[^\w']/g;
  //if doing unicode regions:
  // [\w\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01BF\u01C4-\u02b8]
  let lastIndex = 0;
  while (re.lastIndex <= startOffset) {
    lastIndex = re.lastIndex;
    if (!re.exec(range.startContainer.textContent)) break;
  }
  range.setStart(range.startContainer, lastIndex);
  re.lastIndex = 0;
  const postEndString = range.endContainer.textContent.substr(range.endOffset);
  lastIndex = postEndString.search(re);
  if (lastIndex === -1) lastIndex = postEndString.length;
  range.setEnd(range.endContainer, range.endOffset + lastIndex);

  const hylyt = highlightRange(id, range, onClick);
  if (!hylyt) return null;
  addScrollIndicator(hylyt, onClick);
  if (onClick) onClick(hylyt);
  return hylyt;
}

export function highlight(id: number, onClick?: Function) {
  // Highlight if text selected
  const selection = getSelection();
  if (selection && !selection.isCollapsed) {
    return highlightSelection(selection, id, onClick);
  }
  return null;
}
