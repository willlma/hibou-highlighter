// @flow
/*function bar(elems: Array<HTMLElement>, onClick?: Function) {
  if (onClick) elems.forEach((elem) => elem.addEventListener('click', onClick));
}*/

function returnArray(): Array<String> {
  return [];
}

type Foo = { arr: Array<String> };
function returnFoo(): Foo {
  const foo: Object = {};
  foo.arr = returnArray();
  return foo;
}

function isValidRange(startContainer: Node, endContainer: Node) {
  return (
    startContainer instanceof Text &&
    endContainer instanceof Text
  );
}

function bar(node: Text) {
  return node;
}

function foo() {
  const selection = getSelection();
  if (!selection) return;
  const range = selection.getRangeAt(0);
  const { startContainer, endContainer } = range;
  if (!isValidRange(startContainer, endContainer)) return;
  bar(startContainer);
}

function acceptsArray(array: Array<String>) {
  return array;
}
function acceptsEither(either: Array<String>) {
  if (!(either instanceof Array)) either = [either];
  window.setTimer(() => acceptsArray(either), 200);
}
