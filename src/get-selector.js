/**
 * Find a unique CSS selector for a given element
 * @returns a string such that ele.ownerDocument.querySelector(reply) === ele
 * and ele.ownerDocument.querySelectorAll(reply).length === 1
 */

var getNthOfType = function(elem) {
  var siblings = [].slice.call(elem.parentNode.children);
  for (let i = siblings.length; i--;) {
    if (siblings[i].localName !== elem.localName)
      [].splice.call(siblings, i, 1);
  }
  var index = [].indexOf.call(siblings, elem) + 1;
  return ':nth-of-type(' + index + ')';
};

export default function getSelector(ele) {
  if (ele.nodeType===Node.TEXT_NODE) ele = ele.parentNode;
  var document = ele.ownerDocument;
  if (ele.id && document.getElementById(ele.id) === ele) {
    return '#' + ele.id;
  }

  // Inherently unique by tag name
  var tagName = ele.tagName.toLowerCase();
  if (tagName==='html' || tagName==='head' || tagName==='body')
    return tagName;

  if (!ele.parentNode) console.warn('danger: ' + tagName);

  // We might be able to find a unique class name
  var isUnique = function(selector) {
    try {
      if (document.querySelectorAll(selector).length===1) return true;
    } catch (e) {}
    return false;
  };

  var selector;
  if (ele.classList.length > 0) {
    for (var i = 0; i < ele.classList.length; i++) {
      // Is this className unique by itself?
      selector = '.' + ele.classList.item(i);
      if (isUnique(selector)) return selector;
      // Maybe it's unique with a tag name?
      selector = tagName + selector;
      if (isUnique(selector)) return selector;
      // Maybe it's unique using a tag name and nth-child
      selector = selector + getNthOfType(ele);
      if (isUnique(selector)) return selector;
    }
  }

  // So we can be unique w.r.t. our parent, and use recursion
  selector = getSelector(ele.parentNode) + ' > ' + tagName + getNthOfType(ele);

  return selector;
};
