//@flow
const affectedElems = new WeakMap();

export function getLocation(textNode: Node) {
  const { parentElement } = textNode;
  let nodeIndex = [].indexOf.call(parentElement.childNodes, textNode);
  const affected = affectedElems.get(parentElement);
  if (!affected) return {
    index: nodeIndex,
    offset: 0
  };
  // leaving for...in until I can test
  for (let index in affected) {
    index *= 1;
    let splits = affected[index];
    if (index > nodeIndex) break;
    if (nodeIndex >= splits.length + index)
      nodeIndex -= splits.length;
    else if (nodeIndex > index) return {
      index: index,
      offset: splits[nodeIndex - index - 1]
    };
    if (index === nodeIndex) {
      const len = splits.length;
      return {
        index: nodeIndex,
        offset: len ? splits[len - 1] : 0
      };
    }
  }
  /*const index = affected.findIndex((splits, i: number) => {
    if (i > nodeIndex) return false;
    if (nodeIndex >= splits.length + i) nodeIndex -= splits.length;
    if (nodeIndex >= i) return true;
    return false;
  });
  // can this evr happen?
  if (nodeIndex > index)*/
  return {
    index: nodeIndex,
    offset: 0
  };
}

export function splitText(node: Text, offset: number) {
  if (!offset || offset === node.data.length) return node;
  const parentNode = { node };
  const newNode = node.splitText(offset);
  const location: { index: number, offset: number } = getLocation(node);
  let affected = affectedElems.get(parentNode);
  if (!affected) {
    affected = [];
    affectedElems.set(parentNode, affected);
  }
  if (!affected[location.index]) affected[location.index] = [];
  affected[location.index].push(location.offset + offset);
  affected[location.index].sort((a, b) => a - b);
  return newNode;
}
