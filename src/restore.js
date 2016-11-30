// @flow
import { addScrollIndicator, placeScrollIndicator, scrollToHighlight } from './selected-highlight';
import createElems from './create-elems';
import { isValidRange } from './highlight';
import type { Hylyt } from './constants';

function getTextNode(parentSelector, index) {
  return document.querySelector(parentSelector).childNodes[index];
}

function getHylytRange(hylyt) {
  const range = document.createRange();
  let startNode;
  let endNode;
  if (hylyt.elems) {
    range.setStartBefore(hylyt.elems[0]);
    range.setEndAfter(hylyt.elems[hylyt.elems.length - 1]);
  } else {
    startNode = getTextNode(hylyt.startSelector, hylyt.startNodeIndex);
    endNode = getTextNode(hylyt.endSelector, hylyt.endNodeIndex);
    range.setStart(startNode, hylyt.startOffset);
    range.setEnd(endNode, hylyt.endOffset);
  }
  return range;
}

function placeIndicators(hylyts: Array<Hylyt>) {
  hylyts.forEach((hl) => placeScrollIndicator(hl));
}

export default function (hylyts: Array<Hylyt> | Hylyt, onClick?: Function) {
  if (!Array.isArray(hylyts)) hylyts = [hylyts];
  hylyts.forEach((hylyt: Hylyt) => {
    const range = getHylytRange(hylyt);
    if (isValidRange(range)) {
      hylyt.elems = createElems(range, (evt: MouseEvent) => onClick && onClick(hylyt, evt));
    }
  });
  const hashStart = '#hi-';
  hylyts.forEach((hl) => addScrollIndicator(hl, onClick));
  let hylytId;
  if (!location.hash.indexOf(hashStart)) {
    hylytId = parseInt(location.hash.substr(hashStart.length));
    const hylyt = hylyts.find((hl) => hl.id === hylytId);
    if (hylyt) scrollToHighlight(hylyt);
  }
  // const intervalId = window.setInterval(() => placeIndicators(hylyts), 5000);
  window.onload = () => {
    placeIndicators(hylyts);
    // window.clearInterval(intervalId);
  };
  return hylytId;
}
