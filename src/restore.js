// @flow
import { showScrollIndicator } from './selected-highlight';
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

function showIndicators(hylyts, hylytId) {
  hylyts.forEach((hylyt) => {
    if (hylyt.id === hylytId) this.scrollToHylyt(hylyt);
    else showScrollIndicator.call(this, hylyt);
  });
}

export default function (hylyts: Hylyt | Array<Hylyt>) {
  if (!Array.isArray(hylyts)) hylyts = [hylyts];
  const ranges = [];
  hylyts.forEach((hylyt: Hylyt) => {
    ranges.push(getHylytRange(hylyt));
  });
  for (let i = ranges.length; i--;) {
    this.hylyt(ranges[i], hylyts[i]);
  }
  const hashStart = '#hi-';
  let hylytId = null;
  if (!location.hash.indexOf(hashStart)) {
    hylytId = parseInt(location.hash.substr(hashStart.length));
  }
  const boundShowIndicators = showIndicators.bind(this, hylyts);
  boundShowIndicators(hylytId);
  const intervalId = window.setInterval(boundShowIndicators, 5000);
  window.onload = () => {
    boundShowIndicators();
    window.clearInterval(intervalId);
  };
  return hylytId;
}
