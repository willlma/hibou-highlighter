// @flow
import { getScrollIndicator } from './selected-highlight';
import type { Hylyt } from './constants';

export default function (hylyt: Hylyt) {
  // this makes an assumption about the original state of the
  // textnode. Perhaps we'll need to incorporate affectedElems
  hylyt.elems.forEach((elem) => {
    const textNode = document.createTextNode(elem.textContent);
    elem.parentNode.replaceChild(textNode, elem);
  });
  getScrollIndicator(hylyt).remove();
}
