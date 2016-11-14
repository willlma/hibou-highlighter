// @flow
import { getLocation } from './dom-mutation';
import getSelector from './get-selector';
import { addSpans, isValidRange } from './add-spans';
import { showScrollIndicator } from './selected-highlight';
import type { Hylyt } from './constants';

let defaultId = 1;

function getRangeHtml(range) {
  const container = (range.commonAncestorContainer.parentElement ||
    document.body).cloneNode(false);
  container.appendChild(range.cloneContents());
  return container.innerHTML;
}

type Options = {
  id?: number,
  range: Range,
  hylyt?: Hylyt,
  onClick?: Function
}
export function highlightRange({ id, range, hylyt, onClick }: Options): ?Hylyt {
  const { startContainer, endContainer } = range;
  if (!isValidRange(startContainer, endContainer)) return null;
  if (!hylyt) {
    const startLocation = getLocation(startContainer);
    const endLocation = getLocation(endContainer);
    hylyt = {
      id: id || ++defaultId,
      html: getRangeHtml(range),
      startSelector: getSelector(startContainer),
      startNodeIndex: startLocation.index,
      startOffset: range.startOffset + startLocation.offset,
      endSelector: getSelector(endContainer),
      endNodeIndex: endLocation.index,
      endOffset: range.endOffset + endLocation.offset,
      deleted: false,
      elems: []
    };
  } else if (hylyt.html !== (getRangeHtml(range))) {
    console.warn(`hylyt restored incorrectly
      Saved HTML: ${hylyt.html}
      Restored HTML: ${getRangeHtml(range)}
      hylyt.id: ${hylyt.id}`
    );
  }
  hylyt.elems = addSpans(range);
  hylyt.elems.forEach((elem) => {
    elem.addEventListener('click', onClick && onClick.bind(null, hylyt));
  });
  return hylyt;
}

function highlightSelection(selection, id?: number, onClick?: Function) {
  let i = 0;
  const range = selection.getRangeAt(0);
  if (range.collapsed ||
      (range.startContainer === range.endContainer &&
      range.endOffset - range.startOffset < 3)) {
    return false;
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
  while (re.lastIndex <= range.startOffset) {
    lastIndex = re.lastIndex;
    if (!re.exec(range.startContainer.textContent)) break;
  }
  range.setStart(range.startContainer, lastIndex);
  re.lastIndex = 0;
  const postEndString = range.endContainer.textContent.substr(range.endOffset);
  lastIndex = postEndString.search(re);
  if (lastIndex === -1) lastIndex = postEndString.length;
  range.setEnd(range.endContainer, range.endOffset + lastIndex);

  const hylyt = highlightRange({ id, range, onClick });
  if (!hylyt) return false;
  showScrollIndicator(hylyt, onClick);
  if (onClick) onClick(hylyt);
  return hylyt;
}

export function highlight(onClick?: Function, id?: number) {
  // Highlight if text selected
  const selection = getSelection();
  if (selection && !selection.isCollapsed) {
    return highlightSelection(selection, id, onClick);
  }
  return false;
}
