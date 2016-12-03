// @flow
export function getIndicatorClassName(hylytId: number) {
  return `hi-scroll-indicator hi-${hylytId}`;
}

export function getIndicatorSelector(hylytId: number) {
  return `.hi-scroll-indicator.hi-${hylytId}`;
}

export const tagName = 'hylyt';
export const hylytModeClassName = 'hylyt-mode';
export const rangeNotTextNodeError = 'Range start or end is not a text node.';
export const nodeWithoutParent = "Can't replace node. Doesn't have a parent";

export type Hylyt = {
  id: number,
  html: string,
  startSelector: string,
  startNodeIndex: number,
  startOffset: number,
  endSelector: string,
  endNodeIndex: number,
  endOffset: number,
  deleted: bool,
  elems: Array<Object>
}
