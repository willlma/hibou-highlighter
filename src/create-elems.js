// @flow

import { splitText } from './dom-mutation';
import { tagName, rangeNotTextNodeError, nodeWithoutParent } from './constants';

function replace(node) {
  const span = document.createElement(tagName);
  span.textContent = node.textContent;
  const { parentNode } = node;
  if (!parentNode) throw new Error(nodeWithoutParent);
  parentNode.replaceChild(span, node);
  return span;
}

function isEmpty(node) {
  return !/\S/.test(node.textContent);
}

export default function (range: Range, onClick: Function): Array<HTMLElement> {
  const { startOffset, startContainer, endContainer, endOffset } = range;
  if (!(startContainer instanceof Text && endContainer instanceof Text)) {
    throw new Error(rangeNotTextNodeError);
  }
  splitText(endContainer, endOffset);
  range.setStart(splitText(startContainer, startOffset), 0);

  const nodeIterator = document.createNodeIterator(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
    (node) => range.intersectsNode(node) && !isEmpty(node) ?
      NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
  );
  const hylytElems = [];
  for (let currentNode, i = 1000; i-- && (currentNode = nodeIterator.nextNode());) {
    hylytElems.push(currentNode);
  }
  return hylytElems.map((elem) => {
    const hylytElem = replace(elem);
    hylytElem.addEventListener('click', onClick);
    return hylytElem;
  });
}
