// @flow
import { splitText } from './dom-mutation';
import { tagName, rangeNotTextNodeError, nodeWithoutParent } from './constants';

export function isValidRange(startContainer: Node, endContainer: Node) {
  return (
    startContainer.nodeType === Node.TEXT_NODE &&
    endContainer.nodeType === Node.TEXT_NODE &&
    startContainer.parentElement &&
    startContainer.parentElement.localName !== tagName &&
    endContainer.parentElement &&
    endContainer.parentElement.localName !== tagName
  );
}

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

/*function getNextNode(node) {
  outer: while (node) {
    let sibling = node.nextSibling;
//       console.log(TAG+'sibling: '+sibling);
    if (!sibling) {
      node = node.parentNode;
//         console.log(TAG+'no sibling. node = '+node);
      continue;
    }
    while (sibling) {
      if (sibling.nodeType!==Node.TEXT_NODE &&
          getComputedStyle(sibling).MozUserSelect==='none') {
        node = sibling;
        continue outer;
      }
      node = sibling;
      sibling = sibling.firstChild;
    }
    return node;
  }
  console.error('did not encounter last node while finding next sibling');
  return null;
}

function oldAddSpans(range: Range) {
  const spans = [];
  let textNode = range.startContainer;
  textNode = splitText(textNode, range.startOffset);
  let last;
  do {
    last = textNode === range.endContainer;
    if (last) {
      splitText(textNode, range.endOffset);
    }
    if (!isEmpty(textNode)) {
      textNode = replace(textNode);
      spans.push(textNode);
    }
    if (last) return spans;
    textNode = getNextNode(textNode);
  } while (!last);
  console.error('did not encounter last node while finding next sibling');
}*/

export function addSpans(range: Range) {
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
  return hylytElems.map((elem) => replace(elem));
}
