(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("highlighter", [], factory);
	else if(typeof exports === 'object')
		exports["highlighter"] = factory();
	else
		root["highlighter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _selectedHighlight = __webpack_require__(1);
	
	Object.defineProperty(exports, 'changeSelectedHighlight', {
	  enumerable: true,
	  get: function get() {
	    return _selectedHighlight.changeSelectedHighlight;
	  }
	});
	Object.defineProperty(exports, 'showScrollIndicator', {
	  enumerable: true,
	  get: function get() {
	    return _selectedHighlight.showScrollIndicator;
	  }
	});
	Object.defineProperty(exports, 'scrollToHighlight', {
	  enumerable: true,
	  get: function get() {
	    return _selectedHighlight.scrollToHighlight;
	  }
	});
	
	var _highlight = __webpack_require__(3);
	
	Object.defineProperty(exports, 'highlight', {
	  enumerable: true,
	  get: function get() {
	    return _highlight.highlight;
	  }
	});
	Object.defineProperty(exports, 'highlightRange', {
	  enumerable: true,
	  get: function get() {
	    return _highlight.highlightRange;
	  }
	});
	
	var _remove = __webpack_require__(7);
	
	Object.defineProperty(exports, 'removeHylytElems', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_remove).default;
	  }
	});
	
	var _restore = __webpack_require__(8);
	
	Object.defineProperty(exports, 'restore', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_restore).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changeSelectedHighlight = changeSelectedHighlight;
	exports.placeScrollIndicator = placeScrollIndicator;
	exports.addScrollIndicator = addScrollIndicator;
	exports.scrollToHighlight = scrollToHighlight;
	
	var _constants = __webpack_require__(2);
	
	function toggleSelectedClass(elems) {
	  for (var i = elems.length; i--;) {
	    elems[i].classList.toggle('hi-selected');
	  }
	}
	
	
	var selectHl = function selectHl(hylyt) {
	  return setTimeout(function () {
	    if (!(hylyt && hylyt.elems && hylyt.elems.length)) return;
	    var selection = document.getSelection();
	    if (!selection) return;
	    selection.removeAllRanges();
	    var range = document.createRange();
	    range.setStartBefore(hylyt.elems[0]);
	    range.setEndAfter(hylyt.elems[hylyt.elems.length - 1]);
	    selection.addRange(range);
	  });
	};
	
	function deactivateScrollIndicator() {
	  var activeScrollIndicator = document.querySelector('.hi-scroll-indicator.active');
	  if (activeScrollIndicator) activeScrollIndicator.classList.remove('active');
	}
	
	function getScrollIndicator(hylyt) {
	  return document.querySelector((0, _constants.getIndicatorSelector)(hylyt.id));
	}
	
	function changeSelectedHighlight(lastHylyt, hylyt) {
	  if (lastHylyt) toggleSelectedClass(lastHylyt.elems);
	  deactivateScrollIndicator();
	  if (hylyt) {
	    selectHl(hylyt);
	    if (lastHylyt !== hylyt) toggleSelectedClass(hylyt.elems);
	    getScrollIndicator(hylyt).classList.add('active');
	  }
	}
	
	function getTop(elems) {
	  return (elems[0].getBoundingClientRect().top + elems[elems.length - 1].getBoundingClientRect().bottom) / 2 + window.scrollY;
	}
	
	function createScrollIndicator(hylyt, onClick) {
	  var indicator = document.createElement('div');
	  indicator.className = (0, _constants.getIndicatorClassName)(hylyt.id);
	  // indicator.href = '#hi-' + hylyt.id;
	  document.body.appendChild(indicator);
	  indicator.addEventListener('click', function (evt) {
	    window.scrollTo(0, (getTop(hylyt.elems) - window.innerHeight) / 2);
	    if (onClick) onClick(hylyt, evt);
	  });
	  return indicator;
	}
	
	function placeScrollIndicator(hylyt, indicator) {
	  var top = getTop(hylyt.elems);
	  var fixedTop = top / document.documentElement.scrollHeight * window.innerHeight;
	  if (!indicator) indicator = getScrollIndicator(hylyt);
	  indicator.style.top = fixedTop - 10 + 'px';
	}
	
	function addScrollIndicator(hylyt, onClick) {
	  var scrollIndicator = createScrollIndicator(hylyt, onClick);
	  placeScrollIndicator(hylyt, scrollIndicator);
	}
	
	function scrollToHighlight(hylyt) {
	  var top = getTop(hylyt.elems);
	  window.scrollTo((top - window.innerHeight) / 2);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIndicatorClassName = getIndicatorClassName;
	exports.getIndicatorSelector = getIndicatorSelector;
	function getIndicatorClassName(hylytId) {
	  return 'hi-scroll-indicator hi-' + hylytId;
	}
	
	function getIndicatorSelector(hylytId) {
	  return '.hi-scroll-indicator.hi-' + hylytId;
	}
	
	var tagName = exports.tagName = 'hylyt';
	var rangeNotTextNodeError = exports.rangeNotTextNodeError = 'Range start or end is not a text node.';
	var nodeWithoutParent = exports.nodeWithoutParent = "Can't replace node. Doesn't have a parent";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isValidRange = isValidRange;
	exports.highlightRange = highlightRange;
	exports.highlight = highlight;
	
	var _domMutation = __webpack_require__(4);
	
	var _getSelector = __webpack_require__(5);
	
	var _getSelector2 = _interopRequireDefault(_getSelector);
	
	var _createElems = __webpack_require__(6);
	
	var _createElems2 = _interopRequireDefault(_createElems);
	
	var _selectedHighlight = __webpack_require__(1);
	
	var _constants = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getRangeHtml(range) {
	  var container = (range.commonAncestorContainer.parentElement || document.body).cloneNode(false);
	  container.appendChild(range.cloneContents());
	  return container.innerHTML;
	}
	function isValidRange(range) {
	  var startContainer = range.startContainer,
	      endContainer = range.endContainer;
	
	  return startContainer instanceof Text && endContainer instanceof Text && startContainer.parentElement && startContainer.parentElement.localName !== _constants.tagName && endContainer.parentElement && endContainer.parentElement.localName !== _constants.tagName;
	}
	
	function highlightRange(id, range, onClick) {
	  if (!isValidRange(range)) return null;
	  var startContainer = range.startContainer,
	      endContainer = range.endContainer;
	
	  var startLocation = (0, _domMutation.getLocation)(startContainer);
	  var endLocation = (0, _domMutation.getLocation)(endContainer);
	  var hylyt = {
	    id: id,
	    html: getRangeHtml(range),
	    startSelector: (0, _getSelector2.default)(startContainer),
	    startNodeIndex: startLocation.index,
	    startOffset: range.startOffset + startLocation.offset,
	    endSelector: (0, _getSelector2.default)(endContainer),
	    endNodeIndex: endLocation.index,
	    endOffset: range.endOffset + endLocation.offset,
	    deleted: false,
	    elems: (0, _createElems2.default)(range, function (evt) {
	      return onClick && onClick(hylyt, evt);
	    })
	  };
	  return hylyt;
	}
	
	function highlightSelection(selection, id, onClick) {
	  var i = 0;
	  var range = selection.getRangeAt(0);
	  var startOffset = range.startOffset,
	      startContainer = range.startContainer,
	      endContainer = range.endContainer;
	
	  if (range.collapsed || !isValidRange(range) || startContainer === endContainer && range.endOffset - startOffset < 3) {
	    return null;
	  }
	  range.commonAncestorContainer.normalize();
	  for (var len = selection.rangeCount - 1; i < len && range.endContainer.nodeType !== Node.TEXT_NODE; i++) {
	    var currentRange = selection.getRangeAt(i);
	    range.setEnd(currentRange.endContainer, currentRange.endOffset);
	  }
	  var re = /[^\w']/g;
	  //if doing unicode regions:
	  // [\w\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01BF\u01C4-\u02b8]
	  var lastIndex = 0;
	  while (re.lastIndex <= startOffset) {
	    lastIndex = re.lastIndex;
	    if (!re.exec(range.startContainer.textContent)) break;
	  }
	  range.setStart(range.startContainer, lastIndex);
	  re.lastIndex = 0;
	  var postEndString = range.endContainer.textContent.substr(range.endOffset);
	  lastIndex = postEndString.search(re);
	  if (lastIndex === -1) lastIndex = postEndString.length;
	  range.setEnd(range.endContainer, range.endOffset + lastIndex);
	
	  var hylyt = highlightRange(id, range, onClick);
	  if (!hylyt) return null;
	  (0, _selectedHighlight.addScrollIndicator)(hylyt, onClick);
	  if (onClick) onClick(hylyt);
	  return hylyt;
	}
	
	function highlight(id, onClick) {
	  // Highlight if text selected
	  var selection = getSelection();
	  if (selection && !selection.isCollapsed) {
	    return highlightSelection(selection, id, onClick);
	  }
	  return null;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getLocation = getLocation;
	exports.splitText = splitText;
	var affectedElems = new WeakMap();
	
	function getLocation(textNode) {
	  var parent = textNode.parentNode || document.body;
	  var nodeIndex = [].indexOf.call(parent.childNodes, textNode);
	  var affected = affectedElems.get(parent);
	  if (!affected) return {
	    index: nodeIndex,
	    offset: 0
	  };
	  // leaving for...in until I can test
	  for (var _index in affected) {
	    _index *= 1;
	    var splits = affected[_index];
	    if (_index > nodeIndex) break;
	    if (nodeIndex >= splits.length + _index) nodeIndex -= splits.length;else if (nodeIndex > _index) return {
	      index: _index,
	      offset: splits[nodeIndex - _index - 1]
	    };
	    if (_index === nodeIndex) {
	      var len = splits.length;
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
	
	function splitText(node, offset) {
	  if (!offset || offset === node.data.length) return node;
	  var parentNode = { node: node };
	  var newNode = node.splitText(offset);
	  var location = getLocation(node);
	  var affected = affectedElems.get(parentNode);
	  if (!affected) {
	    affected = [];
	    affectedElems.set(parentNode, affected);
	  }
	  if (!affected[location.index]) affected[location.index] = [];
	  affected[location.index].push(location.offset + offset);
	  affected[location.index].sort(function (a, b) {
	    return a - b;
	  });
	  return newNode;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getSelector;
	/**
	 * Find a unique CSS selector for a given element
	 * @returns a string such that ele.ownerDocument.querySelector(reply) === ele
	 * and ele.ownerDocument.querySelectorAll(reply).length === 1
	 */
	
	var getNthOfType = function getNthOfType(elem) {
	  var siblings = [].slice.call(elem.parentNode.children);
	  for (var i = siblings.length; i--;) {
	    if (siblings[i].localName !== elem.localName) [].splice.call(siblings, i, 1);
	  }
	  var index = [].indexOf.call(siblings, elem) + 1;
	  return ':nth-of-type(' + index + ')';
	};
	
	function getSelector(ele) {
	  if (ele.nodeType === Node.TEXT_NODE) ele = ele.parentNode;
	  var document = ele.ownerDocument;
	  if (ele.id && document.getElementById(ele.id) === ele) {
	    return '#' + ele.id;
	  }
	
	  // Inherently unique by tag name
	  var tagName = ele.tagName.toLowerCase();
	  if (tagName === 'html' || tagName === 'head' || tagName === 'body') return tagName;
	
	  if (!ele.parentNode) console.warn('danger: ' + tagName);
	
	  // We might be able to find a unique class name
	  var isUnique = function isUnique(selector) {
	    try {
	      if (document.querySelectorAll(selector).length === 1) return true;
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
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (range, onClick) {
	  var startOffset = range.startOffset,
	      startContainer = range.startContainer,
	      endContainer = range.endContainer,
	      endOffset = range.endOffset;
	
	  if (!(startContainer instanceof Text && endContainer instanceof Text)) {
	    throw new Error(_constants.rangeNotTextNodeError);
	  }
	  (0, _domMutation.splitText)(endContainer, endOffset);
	  range.setStart((0, _domMutation.splitText)(startContainer, startOffset), 0);
	
	  var nodeIterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, function (node) {
	    return range.intersectsNode(node) && !isEmpty(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
	  });
	  var hylytElems = [];
	  for (var currentNode, i = 1000; i-- && (currentNode = nodeIterator.nextNode());) {
	    hylytElems.push(currentNode);
	  }
	  return hylytElems.map(function (elem) {
	    var hylytElem = replace(elem);
	    hylytElem.addEventListener('click', onClick);
	    return hylytElem;
	  });
	};
	
	var _domMutation = __webpack_require__(4);
	
	var _constants = __webpack_require__(2);
	
	function replace(node) {
	  var span = document.createElement(_constants.tagName);
	  span.textContent = node.textContent;
	  var parentNode = node.parentNode;
	
	  if (!parentNode) throw new Error(_constants.nodeWithoutParent);
	  parentNode.replaceChild(span, node);
	  return span;
	}
	
	function isEmpty(node) {
	  return !/\S/.test(node.textContent);
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (hylyt) {
	  // this makes an assumption about the original state of the
	  // textnode. Perhaps we'll need to incorporate affectedElems
	  hylyt.elems.forEach(function (elem) {
	    var textNode = document.createTextNode(elem.textContent);
	    elem.parentNode.replaceChild(textNode, elem);
	  });
	  (0, _selectedHighlight.getScrollIndicator)(hylyt).remove();
	};
	
	var _selectedHighlight = __webpack_require__(1);
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (hylyts, onClick) {
	  if (!Array.isArray(hylyts)) hylyts = [hylyts];
	  hylyts.forEach(function (hylyt) {
	    var range = getHylytRange(hylyt);
	    if ((0, _highlight.isValidRange)(range)) {
	      hylyt.elems = (0, _createElems2.default)(range, function (evt) {
	        return onClick && onClick(hylyt, evt);
	      });
	    }
	  });
	  var hashStart = '#hi-';
	  hylyts.forEach(function (hl) {
	    return (0, _selectedHighlight.addScrollIndicator)(hl, onClick);
	  });
	  var hylytId = void 0;
	  if (!location.hash.indexOf(hashStart)) {
	    hylytId = parseInt(location.hash.substr(hashStart.length));
	    var hylyt = hylyts.find(function (hl) {
	      return hl.id === hylytId;
	    });
	    if (hylyt) (0, _selectedHighlight.scrollToHighlight)(hylyt);
	  }
	  // const intervalId = window.setInterval(() => placeIndicators(hylyts), 5000);
	  window.onload = function () {
	    placeIndicators(hylyts);
	    // window.clearInterval(intervalId);
	  };
	  return hylytId;
	};
	
	var _selectedHighlight = __webpack_require__(1);
	
	var _createElems = __webpack_require__(6);
	
	var _createElems2 = _interopRequireDefault(_createElems);
	
	var _highlight = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getTextNode(parentSelector, index) {
	  return document.querySelector(parentSelector).childNodes[index];
	}
	
	
	function getHylytRange(hylyt) {
	  var range = document.createRange();
	  var startNode = void 0;
	  var endNode = void 0;
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
	
	function placeIndicators(hylyts) {
	  hylyts.forEach(function (hl) {
	    return (0, _selectedHighlight.placeScrollIndicator)(hl);
	  });
	}
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1NDNkMGMxMjgwZDE0NDIyZWRjZiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdGVkLWhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvbS1tdXRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2V0LXNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jcmVhdGUtZWxlbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbW92ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzdG9yZS5qcyJdLCJuYW1lcyI6WyJjaGFuZ2VTZWxlY3RlZEhpZ2hsaWdodCIsInNob3dTY3JvbGxJbmRpY2F0b3IiLCJzY3JvbGxUb0hpZ2hsaWdodCIsImhpZ2hsaWdodCIsImhpZ2hsaWdodFJhbmdlIiwiZGVmYXVsdCIsInBsYWNlU2Nyb2xsSW5kaWNhdG9yIiwiYWRkU2Nyb2xsSW5kaWNhdG9yIiwidG9nZ2xlU2VsZWN0ZWRDbGFzcyIsImVsZW1zIiwiaSIsImxlbmd0aCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInNlbGVjdEhsIiwiaHlseXQiLCJzZXRUaW1lb3V0Iiwic2VsZWN0aW9uIiwiZG9jdW1lbnQiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2V0U3RhcnRCZWZvcmUiLCJzZXRFbmRBZnRlciIsImFkZFJhbmdlIiwiZGVhY3RpdmF0ZVNjcm9sbEluZGljYXRvciIsImFjdGl2ZVNjcm9sbEluZGljYXRvciIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJnZXRTY3JvbGxJbmRpY2F0b3IiLCJpZCIsImxhc3RIeWx5dCIsImFkZCIsImdldFRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvdHRvbSIsIndpbmRvdyIsInNjcm9sbFkiLCJjcmVhdGVTY3JvbGxJbmRpY2F0b3IiLCJvbkNsaWNrIiwiaW5kaWNhdG9yIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJzY3JvbGxUbyIsImlubmVySGVpZ2h0IiwiZml4ZWRUb3AiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxIZWlnaHQiLCJzdHlsZSIsInNjcm9sbEluZGljYXRvciIsImdldEluZGljYXRvckNsYXNzTmFtZSIsImdldEluZGljYXRvclNlbGVjdG9yIiwiaHlseXRJZCIsInRhZ05hbWUiLCJyYW5nZU5vdFRleHROb2RlRXJyb3IiLCJub2RlV2l0aG91dFBhcmVudCIsImlzVmFsaWRSYW5nZSIsImdldFJhbmdlSHRtbCIsImNvbnRhaW5lciIsImNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIiwicGFyZW50RWxlbWVudCIsImNsb25lTm9kZSIsImNsb25lQ29udGVudHMiLCJpbm5lckhUTUwiLCJzdGFydENvbnRhaW5lciIsImVuZENvbnRhaW5lciIsIlRleHQiLCJsb2NhbE5hbWUiLCJzdGFydExvY2F0aW9uIiwiZW5kTG9jYXRpb24iLCJodG1sIiwic3RhcnRTZWxlY3RvciIsInN0YXJ0Tm9kZUluZGV4IiwiaW5kZXgiLCJzdGFydE9mZnNldCIsIm9mZnNldCIsImVuZFNlbGVjdG9yIiwiZW5kTm9kZUluZGV4IiwiZW5kT2Zmc2V0IiwiZGVsZXRlZCIsImhpZ2hsaWdodFNlbGVjdGlvbiIsImdldFJhbmdlQXQiLCJjb2xsYXBzZWQiLCJub3JtYWxpemUiLCJsZW4iLCJyYW5nZUNvdW50Iiwibm9kZVR5cGUiLCJOb2RlIiwiVEVYVF9OT0RFIiwiY3VycmVudFJhbmdlIiwic2V0RW5kIiwicmUiLCJsYXN0SW5kZXgiLCJleGVjIiwidGV4dENvbnRlbnQiLCJzZXRTdGFydCIsInBvc3RFbmRTdHJpbmciLCJzdWJzdHIiLCJzZWFyY2giLCJpc0NvbGxhcHNlZCIsImdldExvY2F0aW9uIiwic3BsaXRUZXh0IiwiYWZmZWN0ZWRFbGVtcyIsIldlYWtNYXAiLCJ0ZXh0Tm9kZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJub2RlSW5kZXgiLCJpbmRleE9mIiwiY2FsbCIsImNoaWxkTm9kZXMiLCJhZmZlY3RlZCIsImdldCIsInNwbGl0cyIsIm5vZGUiLCJkYXRhIiwibmV3Tm9kZSIsImxvY2F0aW9uIiwic2V0IiwicHVzaCIsInNvcnQiLCJhIiwiYiIsImdldFNlbGVjdG9yIiwiZ2V0TnRoT2ZUeXBlIiwiZWxlbSIsInNpYmxpbmdzIiwic2xpY2UiLCJjaGlsZHJlbiIsInNwbGljZSIsImVsZSIsIm93bmVyRG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRvTG93ZXJDYXNlIiwiY29uc29sZSIsIndhcm4iLCJpc1VuaXF1ZSIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImUiLCJpdGVtIiwiRXJyb3IiLCJub2RlSXRlcmF0b3IiLCJjcmVhdGVOb2RlSXRlcmF0b3IiLCJOb2RlRmlsdGVyIiwiU0hPV19URVhUIiwiaW50ZXJzZWN0c05vZGUiLCJpc0VtcHR5IiwiRklMVEVSX0FDQ0VQVCIsIkZJTFRFUl9SRUpFQ1QiLCJoeWx5dEVsZW1zIiwiY3VycmVudE5vZGUiLCJuZXh0Tm9kZSIsIm1hcCIsImh5bHl0RWxlbSIsInJlcGxhY2UiLCJzcGFuIiwicmVwbGFjZUNoaWxkIiwidGVzdCIsImZvckVhY2giLCJjcmVhdGVUZXh0Tm9kZSIsImh5bHl0cyIsIkFycmF5IiwiaXNBcnJheSIsImdldEh5bHl0UmFuZ2UiLCJoYXNoU3RhcnQiLCJobCIsImhhc2giLCJwYXJzZUludCIsImZpbmQiLCJvbmxvYWQiLCJwbGFjZUluZGljYXRvcnMiLCJnZXRUZXh0Tm9kZSIsInBhcmVudFNlbGVjdG9yIiwic3RhcnROb2RlIiwiZW5kTm9kZSJdLCJtYXBw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QXZCLEVBQXVDL0QsVUFBdkMsQ0FBa0RyQyxLQUFsRCxDQUFQO0FBQ0Q7OztBQUVELFVBQVMyRixhQUFULENBQXVCM0osS0FBdkIsRUFBOEI7QUFDNUIsT0FBTU0sUUFBUUgsU0FBU0ksV0FBVCxFQUFkO0FBQ0EsT0FBSThKLGtCQUFKO0FBQ0EsT0FBSUMsZ0JBQUo7QUFDQSxPQUFJdEssTUFBTU4sS0FBVixFQUFpQjtBQUNmWSxXQUFNRSxjQUFOLENBQXFCUixNQUFNTixLQUFOLENBQVksQ0FBWixDQUFyQjtBQUNBWSxXQUFNRyxXQUFOLENBQWtCVCxNQUFNTixLQUFOLENBQVlNLE1BQU1OLEtBQU4sQ0FBWUUsTUFBWixHQUFxQixDQUFqQyxDQUFsQjtBQUNELElBSEQsTUFHTztBQUNMeUssaUJBQVlGLFlBQVluSyxNQUFNOEQsYUFBbEIsRUFBaUM5RCxNQUFNK0QsY0FBdkMsQ0FBWjtBQUNBdUcsZUFBVUgsWUFBWW5LLE1BQU1tRSxXQUFsQixFQUErQm5FLE1BQU1vRSxZQUFyQyxDQUFWO0FBQ0E5RCxXQUFNZ0YsUUFBTixDQUFlK0UsU0FBZixFQUEwQnJLLE1BQU1pRSxXQUFoQztBQUNBM0QsV0FBTTJFLE1BQU4sQ0FBYXFGLE9BQWIsRUFBc0J0SyxNQUFNcUUsU0FBNUI7QUFDRDtBQUNELFVBQU8vRCxLQUFQO0FBQ0Q7O0FBRUQsVUFBUzRKLGVBQVQsQ0FBeUJWLE1BQXpCLEVBQStDO0FBQzdDQSxVQUFPRixPQUFQLENBQWUsVUFBQ08sRUFBRDtBQUFBLFlBQVEsNkNBQXFCQSxFQUFyQixDQUFSO0FBQUEsSUFBZjtBQUNEIiwiZmlsZSI6ImhpYm91LWhpZ2hsaWdodGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJoaWdobGlnaHRlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJoaWdobGlnaHRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJoaWdobGlnaHRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1NDNkMGMxMjgwZDE0NDIyZWRjZiIsImV4cG9ydCB7IGNoYW5nZVNlbGVjdGVkSGlnaGxpZ2h0LCBzaG93U2Nyb2xsSW5kaWNhdG9yLCBzY3JvbGxUb0hpZ2hsaWdodCB9IGZyb20gJy4vc2VsZWN0ZWQtaGlnaGxpZ2h0JztcbmV4cG9ydCB7IGhpZ2hsaWdodCwgaGlnaGxpZ2h0UmFuZ2UgfSBmcm9tICcuL2hpZ2hsaWdodCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlbW92ZUh5bHl0RWxlbXMgfSBmcm9tICcuL3JlbW92ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3RvcmUgfSBmcm9tICcuL3Jlc3RvcmUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLy8gQGZsb3dcbmltcG9ydCB7IGdldEluZGljYXRvckNsYXNzTmFtZSwgZ2V0SW5kaWNhdG9yU2VsZWN0b3IgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEh5bHl0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5mdW5jdGlvbiB0b2dnbGVTZWxlY3RlZENsYXNzKGVsZW1zKSB7XG4gIGZvciAobGV0IGkgPSBlbGVtcy5sZW5ndGg7IGktLTspIGVsZW1zW2ldLmNsYXNzTGlzdC50b2dnbGUoJ2hpLXNlbGVjdGVkJyk7XG59XG5cbmNvbnN0IHNlbGVjdEhsID0gKGh5bHl0KSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgaWYgKCEoaHlseXQgJiYgaHlseXQuZWxlbXMgJiYgaHlseXQuZWxlbXMubGVuZ3RoKSkgcmV0dXJuO1xuICBjb25zdCBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgaWYgKCFzZWxlY3Rpb24pIHJldHVybjtcbiAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0QmVmb3JlKGh5bHl0LmVsZW1zWzBdKTtcbiAgcmFuZ2Uuc2V0RW5kQWZ0ZXIoaHlseXQuZWxlbXNbaHlseXQuZWxlbXMubGVuZ3RoIC0gMV0pO1xuICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xufSk7XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVTY3JvbGxJbmRpY2F0b3IoKSB7XG4gIGNvbnN0IGFjdGl2ZVNjcm9sbEluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaS1zY3JvbGwtaW5kaWNhdG9yLmFjdGl2ZScpO1xuICBpZiAoYWN0aXZlU2Nyb2xsSW5kaWNhdG9yKSBhY3RpdmVTY3JvbGxJbmRpY2F0b3IuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbEluZGljYXRvcihoeWx5dCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihnZXRJbmRpY2F0b3JTZWxlY3RvcihoeWx5dC5pZCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU2VsZWN0ZWRIaWdobGlnaHQobGFzdEh5bHl0OiBPYmplY3QsIGh5bHl0OiBPYmplY3QpIHtcbiAgaWYgKGxhc3RIeWx5dCkgdG9nZ2xlU2VsZWN0ZWRDbGFzcyhsYXN0SHlseXQuZWxlbXMpO1xuICBkZWFjdGl2YXRlU2Nyb2xsSW5kaWNhdG9yKCk7XG4gIGlmIChoeWx5dCkge1xuICAgIHNlbGVjdEhsKGh5bHl0KTtcbiAgICBpZiAobGFzdEh5bHl0ICE9PSBoeWx5dCkgdG9nZ2xlU2VsZWN0ZWRDbGFzcyhoeWx5dC5lbGVtcyk7XG4gICAgZ2V0U2Nyb2xsSW5kaWNhdG9yKGh5bHl0KS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUb3AoZWxlbXM6IEFycmF5PEhUTUxFbGVtZW50Pikge1xuICByZXR1cm4gKFxuICAgICgoZWxlbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICtcbiAgICBlbGVtc1tlbGVtcy5sZW5ndGggLSAxXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20pIC8gMilcbiAgICArIHdpbmRvdy5zY3JvbGxZXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNjcm9sbEluZGljYXRvcihoeWx5dDogSHlseXQsIG9uQ2xpY2s/OiBGdW5jdGlvbikge1xuICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW5kaWNhdG9yLmNsYXNzTmFtZSA9IGdldEluZGljYXRvckNsYXNzTmFtZShoeWx5dC5pZCk7XG4gIC8vIGluZGljYXRvci5ocmVmID0gJyNoaS0nICsgaHlseXQuaWQ7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5kaWNhdG9yKTtcbiAgaW5kaWNhdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAoZ2V0VG9wKGh5bHl0LmVsZW1zKSAtIHdpbmRvdy5pbm5lckhlaWdodCkgLyAyKTtcbiAgICBpZiAob25DbGljaykgb25DbGljayhoeWx5dCwgZXZ0KTtcbiAgfSk7XG4gIHJldHVybiBpbmRpY2F0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGFjZVNjcm9sbEluZGljYXRvcihoeWx5dDogSHlseXQsIGluZGljYXRvcj86IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IHRvcCA9IGdldFRvcChoeWx5dC5lbGVtcyk7XG4gIGNvbnN0IGZpeGVkVG9wID0gKHRvcCAvIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQpICogd2luZG93LmlubmVySGVpZ2h0O1xuICBpZiAoIWluZGljYXRvcikgaW5kaWNhdG9yID0gZ2V0U2Nyb2xsSW5kaWNhdG9yKGh5bHl0KTtcbiAgaW5kaWNhdG9yLnN0eWxlLnRvcCA9IGAke2ZpeGVkVG9wIC0gMTB9cHhgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsSW5kaWNhdG9yKGh5bHl0OiBIeWx5dCwgb25DbGljaz86IEZ1bmN0aW9uKSB7XG4gIGNvbnN0IHNjcm9sbEluZGljYXRvciA9IGNyZWF0ZVNjcm9sbEluZGljYXRvcihoeWx5dCwgb25DbGljayk7XG4gIHBsYWNlU2Nyb2xsSW5kaWNhdG9yKGh5bHl0LCBzY3JvbGxJbmRpY2F0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsVG9IaWdobGlnaHQoaHlseXQ6IEh5bHl0KSB7XG4gIGNvbnN0IHRvcCA9IGdldFRvcChoeWx5dC5lbGVtcyk7XG4gIHdpbmRvdy5zY3JvbGxUbygodG9wIC0gd2luZG93LmlubmVySGVpZ2h0KSAvIDIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlbGVjdGVkLWhpZ2hsaWdodC5qcyIsIi8vIEBmbG93XG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5kaWNhdG9yQ2xhc3NOYW1lKGh5bHl0SWQ6IG51bWJlcikge1xuICByZXR1cm4gYGhpLXNjcm9sbC1pbmRpY2F0b3IgaGktJHtoeWx5dElkfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmRpY2F0b3JTZWxlY3RvcihoeWx5dElkOiBudW1iZXIpIHtcbiAgcmV0dXJuIGAuaGktc2Nyb2xsLWluZGljYXRvci5oaS0ke2h5bHl0SWR9YDtcbn1cblxuZXhwb3J0IGNvbnN0IHRhZ05hbWUgPSAnaHlseXQnO1xuZXhwb3J0IGNvbnN0IHJhbmdlTm90VGV4dE5vZGVFcnJvciA9ICdSYW5nZSBzdGFydCBvciBlbmQgaXMgbm90IGEgdGV4dCBub2RlLic7XG5leHBvcnQgY29uc3Qgbm9kZVdpdGhvdXRQYXJlbnQgPSBcIkNhbid0IHJlcGxhY2Ugbm9kZS4gRG9lc24ndCBoYXZlIGEgcGFyZW50XCI7XG5cbmV4cG9ydCB0eXBlIEh5bHl0ID0ge1xuICBpZDogbnVtYmVyLFxuICBodG1sOiBzdHJpbmcsXG4gIHN0YXJ0U2VsZWN0b3I6IHN0cmluZyxcbiAgc3RhcnROb2RlSW5kZXg6IG51bWJlcixcbiAgc3RhcnRPZmZzZXQ6IG51bWJlcixcbiAgZW5kU2VsZWN0b3I6IHN0cmluZyxcbiAgZW5kTm9kZUluZGV4OiBudW1iZXIsXG4gIGVuZE9mZnNldDogbnVtYmVyLFxuICBkZWxldGVkOiBib29sLFxuICBlbGVtczogQXJyYXk8T2JqZWN0PlxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy5qcyIsIi8vIEBmbG93XG5pbXBvcnQgeyBnZXRMb2NhdGlvbiB9IGZyb20gJy4vZG9tLW11dGF0aW9uJztcbmltcG9ydCBnZXRTZWxlY3RvciBmcm9tICcuL2dldC1zZWxlY3Rvcic7XG5pbXBvcnQgY3JlYXRlRWxlbXMgZnJvbSAnLi9jcmVhdGUtZWxlbXMnO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW5kaWNhdG9yIH0gZnJvbSAnLi9zZWxlY3RlZC1oaWdobGlnaHQnO1xuaW1wb3J0IHsgdGFnTmFtZSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgSHlseXQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIGdldFJhbmdlSHRtbChyYW5nZSkge1xuICBjb25zdCBjb250YWluZXIgPSAocmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIucGFyZW50RWxlbWVudCB8fFxuICAgIGRvY3VtZW50LmJvZHkpLmNsb25lTm9kZShmYWxzZSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xuICByZXR1cm4gY29udGFpbmVyLmlubmVySFRNTDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRSYW5nZShyYW5nZTogUmFuZ2UpIHtcbiAgY29uc3QgeyBzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyIH0gPSByYW5nZTtcbiAgcmV0dXJuIChcbiAgICBzdGFydENvbnRhaW5lciBpbnN0YW5jZW9mIFRleHQgJiZcbiAgICBlbmRDb250YWluZXIgaW5zdGFuY2VvZiBUZXh0ICYmXG4gICAgc3RhcnRDb250YWluZXIucGFyZW50RWxlbWVudCAmJlxuICAgIHN0YXJ0Q29udGFpbmVyLnBhcmVudEVsZW1lbnQubG9jYWxOYW1lICE9PSB0YWdOYW1lICYmXG4gICAgZW5kQ29udGFpbmVyLnBhcmVudEVsZW1lbnQgJiZcbiAgICBlbmRDb250YWluZXIucGFyZW50RWxlbWVudC5sb2NhbE5hbWUgIT09IHRhZ05hbWVcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZ2hsaWdodFJhbmdlKGlkOiBudW1iZXIsIHJhbmdlOiBSYW5nZSwgb25DbGljaz86IEZ1bmN0aW9uKTogP0h5bHl0IHtcbiAgaWYgKCFpc1ZhbGlkUmFuZ2UocmFuZ2UpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgeyBzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyIH0gPSByYW5nZTtcbiAgY29uc3Qgc3RhcnRMb2NhdGlvbiA9IGdldExvY2F0aW9uKHN0YXJ0Q29udGFpbmVyKTtcbiAgY29uc3QgZW5kTG9jYXRpb24gPSBnZXRMb2NhdGlvbihlbmRDb250YWluZXIpO1xuICBjb25zdCBoeWx5dCA9IHtcbiAgICBpZCxcbiAgICBodG1sOiBnZXRSYW5nZUh0bWwocmFuZ2UpLFxuICAgIHN0YXJ0U2VsZWN0b3I6IGdldFNlbGVjdG9yKHN0YXJ0Q29udGFpbmVyKSxcbiAgICBzdGFydE5vZGVJbmRleDogc3RhcnRMb2NhdGlvbi5pbmRleCxcbiAgICBzdGFydE9mZnNldDogcmFuZ2Uuc3RhcnRPZmZzZXQgKyBzdGFydExvY2F0aW9uLm9mZnNldCxcbiAgICBlbmRTZWxlY3RvcjogZ2V0U2VsZWN0b3IoZW5kQ29udGFpbmVyKSxcbiAgICBlbmROb2RlSW5kZXg6IGVuZExvY2F0aW9uLmluZGV4LFxuICAgIGVuZE9mZnNldDogcmFuZ2UuZW5kT2Zmc2V0ICsgZW5kTG9jYXRpb24ub2Zmc2V0LFxuICAgIGRlbGV0ZWQ6IGZhbHNlLFxuICAgIGVsZW1zOiBjcmVhdGVFbGVtcyhyYW5nZSwgKGV2dDogTW91c2VFdmVudCkgPT4gb25DbGljayAmJiBvbkNsaWNrKGh5bHl0LCBldnQpKVxuICB9O1xuICByZXR1cm4gaHlseXQ7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFNlbGVjdGlvbihzZWxlY3Rpb24sIGlkOiBudW1iZXIsIG9uQ2xpY2s/OiBGdW5jdGlvbikge1xuICBsZXQgaSA9IDA7XG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHsgc3RhcnRPZmZzZXQsIHN0YXJ0Q29udGFpbmVyLCBlbmRDb250YWluZXIgfSA9IHJhbmdlO1xuICBpZiAocmFuZ2UuY29sbGFwc2VkIHx8ICFpc1ZhbGlkUmFuZ2UocmFuZ2UpIHx8XG4gICAgICAoc3RhcnRDb250YWluZXIgPT09IGVuZENvbnRhaW5lciAmJlxuICAgICAgcmFuZ2UuZW5kT2Zmc2V0IC0gc3RhcnRPZmZzZXQgPCAzKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLm5vcm1hbGl6ZSgpO1xuICBmb3IgKGxldCBsZW4gPSBzZWxlY3Rpb24ucmFuZ2VDb3VudCAtIDE7XG4gICAgICBpIDwgbGVuICYmIHJhbmdlLmVuZENvbnRhaW5lci5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREU7XG4gICAgICBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50UmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKTtcbiAgICByYW5nZS5zZXRFbmQoY3VycmVudFJhbmdlLmVuZENvbnRhaW5lciwgY3VycmVudFJhbmdlLmVuZE9mZnNldCk7XG4gIH1cbiAgY29uc3QgcmUgPSAvW15cXHcnXS9nO1xuICAvL2lmIGRvaW5nIHVuaWNvZGUgcmVnaW9uczpcbiAgLy8gW1xcd1xcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDFCRlxcdTAxQzQtXFx1MDJiOF1cbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIHdoaWxlIChyZS5sYXN0SW5kZXggPD0gc3RhcnRPZmZzZXQpIHtcbiAgICBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgaWYgKCFyZS5leGVjKHJhbmdlLnN0YXJ0Q29udGFpbmVyLnRleHRDb250ZW50KSkgYnJlYWs7XG4gIH1cbiAgcmFuZ2Uuc2V0U3RhcnQocmFuZ2Uuc3RhcnRDb250YWluZXIsIGxhc3RJbmRleCk7XG4gIHJlLmxhc3RJbmRleCA9IDA7XG4gIGNvbnN0IHBvc3RFbmRTdHJpbmcgPSByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnQuc3Vic3RyKHJhbmdlLmVuZE9mZnNldCk7XG4gIGxhc3RJbmRleCA9IHBvc3RFbmRTdHJpbmcuc2VhcmNoKHJlKTtcbiAgaWYgKGxhc3RJbmRleCA9PT0gLTEpIGxhc3RJbmRleCA9IHBvc3RFbmRTdHJpbmcubGVuZ3RoO1xuICByYW5nZS5zZXRFbmQocmFuZ2UuZW5kQ29udGFpbmVyLCByYW5nZS5lbmRPZmZzZXQgKyBsYXN0SW5kZXgpO1xuXG4gIGNvbnN0IGh5bHl0ID0gaGlnaGxpZ2h0UmFuZ2UoaWQsIHJhbmdlLCBvbkNsaWNrKTtcbiAgaWYgKCFoeWx5dCkgcmV0dXJuIG51bGw7XG4gIGFkZFNjcm9sbEluZGljYXRvcihoeWx5dCwgb25DbGljayk7XG4gIGlmIChvbkNsaWNrKSBvbkNsaWNrKGh5bHl0KTtcbiAgcmV0dXJuIGh5bHl0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0KGlkOiBudW1iZXIsIG9uQ2xpY2s/OiBGdW5jdGlvbikge1xuICAvLyBIaWdobGlnaHQgaWYgdGV4dCBzZWxlY3RlZFxuICBjb25zdCBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oKTtcbiAgaWYgKHNlbGVjdGlvbiAmJiAhc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG4gICAgcmV0dXJuIGhpZ2hsaWdodFNlbGVjdGlvbihzZWxlY3Rpb24sIGlkLCBvbkNsaWNrKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oaWdobGlnaHQuanMiLCIvL0BmbG93XG5jb25zdCBhZmZlY3RlZEVsZW1zID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2F0aW9uKHRleHROb2RlOiBUZXh0KSB7XG4gIGNvbnN0IHBhcmVudCA9IHRleHROb2RlLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbiAgbGV0IG5vZGVJbmRleCA9IFtdLmluZGV4T2YuY2FsbChwYXJlbnQuY2hpbGROb2RlcywgdGV4dE5vZGUpO1xuICBjb25zdCBhZmZlY3RlZCA9IGFmZmVjdGVkRWxlbXMuZ2V0KHBhcmVudCk7XG4gIGlmICghYWZmZWN0ZWQpIHJldHVybiB7XG4gICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICBvZmZzZXQ6IDBcbiAgfTtcbiAgLy8gbGVhdmluZyBmb3IuLi5pbiB1bnRpbCBJIGNhbiB0ZXN0XG4gIGZvciAobGV0IGluZGV4IGluIGFmZmVjdGVkKSB7XG4gICAgaW5kZXggKj0gMTtcbiAgICBsZXQgc3BsaXRzID0gYWZmZWN0ZWRbaW5kZXhdO1xuICAgIGlmIChpbmRleCA+IG5vZGVJbmRleCkgYnJlYWs7XG4gICAgaWYgKG5vZGVJbmRleCA+PSBzcGxpdHMubGVuZ3RoICsgaW5kZXgpXG4gICAgICBub2RlSW5kZXggLT0gc3BsaXRzLmxlbmd0aDtcbiAgICBlbHNlIGlmIChub2RlSW5kZXggPiBpbmRleCkgcmV0dXJuIHtcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIG9mZnNldDogc3BsaXRzW25vZGVJbmRleCAtIGluZGV4IC0gMV1cbiAgICB9O1xuICAgIGlmIChpbmRleCA9PT0gbm9kZUluZGV4KSB7XG4gICAgICBjb25zdCBsZW4gPSBzcGxpdHMubGVuZ3RoO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICAgICAgb2Zmc2V0OiBsZW4gPyBzcGxpdHNbbGVuIC0gMV0gOiAwXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICAvKmNvbnN0IGluZGV4ID0gYWZmZWN0ZWQuZmluZEluZGV4KChzcGxpdHMsIGk6IG51bWJlcikgPT4ge1xuICAgIGlmIChpID4gbm9kZUluZGV4KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG5vZGVJbmRleCA+PSBzcGxpdHMubGVuZ3RoICsgaSkgbm9kZUluZGV4IC09IHNwbGl0cy5sZW5ndGg7XG4gICAgaWYgKG5vZGVJbmRleCA+PSBpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICAvLyBjYW4gdGhpcyBldnIgaGFwcGVuP1xuICBpZiAobm9kZUluZGV4ID4gaW5kZXgpKi9cbiAgcmV0dXJuIHtcbiAgICBpbmRleDogbm9kZUluZGV4LFxuICAgIG9mZnNldDogMFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRUZXh0KG5vZGU6IFRleHQsIG9mZnNldDogbnVtYmVyKSB7XG4gIGlmICghb2Zmc2V0IHx8IG9mZnNldCA9PT0gbm9kZS5kYXRhLmxlbmd0aCkgcmV0dXJuIG5vZGU7XG4gIGNvbnN0IHBhcmVudE5vZGUgPSB7IG5vZGUgfTtcbiAgY29uc3QgbmV3Tm9kZSA9IG5vZGUuc3BsaXRUZXh0KG9mZnNldCk7XG4gIGNvbnN0IGxvY2F0aW9uOiB7IGluZGV4OiBudW1iZXIsIG9mZnNldDogbnVtYmVyIH0gPSBnZXRMb2NhdGlvbihub2RlKTtcbiAgbGV0IGFmZmVjdGVkID0gYWZmZWN0ZWRFbGVtcy5nZXQocGFyZW50Tm9kZSk7XG4gIGlmICghYWZmZWN0ZWQpIHtcbiAgICBhZmZlY3RlZCA9IFtdO1xuICAgIGFmZmVjdGVkRWxlbXMuc2V0KHBhcmVudE5vZGUsIGFmZmVjdGVkKTtcbiAgfVxuICBpZiAoIWFmZmVjdGVkW2xvY2F0aW9uLmluZGV4XSkgYWZmZWN0ZWRbbG9jYXRpb24uaW5kZXhdID0gW107XG4gIGFmZmVjdGVkW2xvY2F0aW9uLmluZGV4XS5wdXNoKGxvY2F0aW9uLm9mZnNldCArIG9mZnNldCk7XG4gIGFmZmVjdGVkW2xvY2F0aW9uLmluZGV4XS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RvbS1tdXRhdGlvbi5qcyIsIi8qKlxuICogRmluZCBhIHVuaXF1ZSBDU1Mgc2VsZWN0b3IgZm9yIGEgZ2l2ZW4gZWxlbWVudFxuICogQHJldHVybnMgYSBzdHJpbmcgc3VjaCB0aGF0IGVsZS5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmVwbHkpID09PSBlbGVcbiAqIGFuZCBlbGUub3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJlcGx5KS5sZW5ndGggPT09IDFcbiAqL1xuXG52YXIgZ2V0TnRoT2ZUeXBlID0gZnVuY3Rpb24oZWxlbSkge1xuICB2YXIgc2libGluZ3MgPSBbXS5zbGljZS5jYWxsKGVsZW0ucGFyZW50Tm9kZS5jaGlsZHJlbik7XG4gIGZvciAobGV0IGkgPSBzaWJsaW5ncy5sZW5ndGg7IGktLTspIHtcbiAgICBpZiAoc2libGluZ3NbaV0ubG9jYWxOYW1lICE9PSBlbGVtLmxvY2FsTmFtZSlcbiAgICAgIFtdLnNwbGljZS5jYWxsKHNpYmxpbmdzLCBpLCAxKTtcbiAgfVxuICB2YXIgaW5kZXggPSBbXS5pbmRleE9mLmNhbGwoc2libGluZ3MsIGVsZW0pICsgMTtcbiAgcmV0dXJuICc6bnRoLW9mLXR5cGUoJyArIGluZGV4ICsgJyknO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2VsZWN0b3IoZWxlKSB7XG4gIGlmIChlbGUubm9kZVR5cGU9PT1Ob2RlLlRFWFRfTk9ERSkgZWxlID0gZWxlLnBhcmVudE5vZGU7XG4gIHZhciBkb2N1bWVudCA9IGVsZS5vd25lckRvY3VtZW50O1xuICBpZiAoZWxlLmlkICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZS5pZCkgPT09IGVsZSkge1xuICAgIHJldHVybiAnIycgKyBlbGUuaWQ7XG4gIH1cblxuICAvLyBJbmhlcmVudGx5IHVuaXF1ZSBieSB0YWcgbmFtZVxuICB2YXIgdGFnTmFtZSA9IGVsZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGlmICh0YWdOYW1lPT09J2h0bWwnIHx8IHRhZ05hbWU9PT0naGVhZCcgfHwgdGFnTmFtZT09PSdib2R5JylcbiAgICByZXR1cm4gdGFnTmFtZTtcblxuICBpZiAoIWVsZS5wYXJlbnROb2RlKSBjb25zb2xlLndhcm4oJ2RhbmdlcjogJyArIHRhZ05hbWUpO1xuXG4gIC8vIFdlIG1pZ2h0IGJlIGFibGUgdG8gZmluZCBhIHVuaXF1ZSBjbGFzcyBuYW1lXG4gIHZhciBpc1VuaXF1ZSA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5sZW5ndGg9PT0xKSByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB2YXIgc2VsZWN0b3I7XG4gIGlmIChlbGUuY2xhc3NMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZS5jbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIElzIHRoaXMgY2xhc3NOYW1lIHVuaXF1ZSBieSBpdHNlbGY/XG4gICAgICBzZWxlY3RvciA9ICcuJyArIGVsZS5jbGFzc0xpc3QuaXRlbShpKTtcbiAgICAgIGlmIChpc1VuaXF1ZShzZWxlY3RvcikpIHJldHVybiBzZWxlY3RvcjtcbiAgICAgIC8vIE1heWJlIGl0J3MgdW5pcXVlIHdpdGggYSB0YWcgbmFtZT9cbiAgICAgIHNlbGVjdG9yID0gdGFnTmFtZSArIHNlbGVjdG9yO1xuICAgICAgaWYgKGlzVW5pcXVlKHNlbGVjdG9yKSkgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgLy8gTWF5YmUgaXQncyB1bmlxdWUgdXNpbmcgYSB0YWcgbmFtZSBhbmQgbnRoLWNoaWxkXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICsgZ2V0TnRoT2ZUeXBlKGVsZSk7XG4gICAgICBpZiAoaXNVbmlxdWUoc2VsZWN0b3IpKSByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuICB9XG5cbiAgLy8gU28gd2UgY2FuIGJlIHVuaXF1ZSB3LnIudC4gb3VyIHBhcmVudCwgYW5kIHVzZSByZWN1cnNpb25cbiAgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGUucGFyZW50Tm9kZSkgKyAnID4gJyArIHRhZ05hbWUgKyBnZXROdGhPZlR5cGUoZWxlKTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dldC1zZWxlY3Rvci5qcyIsIi8vIEBmbG93XG5cbmltcG9ydCB7IHNwbGl0VGV4dCB9IGZyb20gJy4vZG9tLW11dGF0aW9uJztcbmltcG9ydCB7IHRhZ05hbWUsIHJhbmdlTm90VGV4dE5vZGVFcnJvciwgbm9kZVdpdGhvdXRQYXJlbnQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIHJlcGxhY2Uobm9kZSkge1xuICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgc3Bhbi50ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnQ7XG4gIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gbm9kZTtcbiAgaWYgKCFwYXJlbnROb2RlKSB0aHJvdyBuZXcgRXJyb3Iobm9kZVdpdGhvdXRQYXJlbnQpO1xuICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzcGFuLCBub2RlKTtcbiAgcmV0dXJuIHNwYW47XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkobm9kZSkge1xuICByZXR1cm4gIS9cXFMvLnRlc3Qobm9kZS50ZXh0Q29udGVudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyYW5nZTogUmFuZ2UsIG9uQ2xpY2s6IEZ1bmN0aW9uKTogQXJyYXk8SFRNTEVsZW1lbnQ+IHtcbiAgY29uc3QgeyBzdGFydE9mZnNldCwgc3RhcnRDb250YWluZXIsIGVuZENvbnRhaW5lciwgZW5kT2Zmc2V0IH0gPSByYW5nZTtcbiAgaWYgKCEoc3RhcnRDb250YWluZXIgaW5zdGFuY2VvZiBUZXh0ICYmIGVuZENvbnRhaW5lciBpbnN0YW5jZW9mIFRleHQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHJhbmdlTm90VGV4dE5vZGVFcnJvcik7XG4gIH1cbiAgc3BsaXRUZXh0KGVuZENvbnRhaW5lciwgZW5kT2Zmc2V0KTtcbiAgcmFuZ2Uuc2V0U3RhcnQoc3BsaXRUZXh0KHN0YXJ0Q29udGFpbmVyLCBzdGFydE9mZnNldCksIDApO1xuXG4gIGNvbnN0IG5vZGVJdGVyYXRvciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihcbiAgICByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcixcbiAgICBOb2RlRmlsdGVyLlNIT1dfVEVYVCxcbiAgICAobm9kZSkgPT4gcmFuZ2UuaW50ZXJzZWN0c05vZGUobm9kZSkgJiYgIWlzRW1wdHkobm9kZSkgP1xuICAgICAgTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUXG4gICk7XG4gIGNvbnN0IGh5bHl0RWxlbXMgPSBbXTtcbiAgZm9yIChsZXQgY3VycmVudE5vZGUsIGkgPSAxMDAwOyBpLS0gJiYgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpOykge1xuICAgIGh5bHl0RWxlbXMucHVzaChjdXJyZW50Tm9kZSk7XG4gIH1cbiAgcmV0dXJuIGh5bHl0RWxlbXMubWFwKChlbGVtKSA9PiB7XG4gICAgY29uc3QgaHlseXRFbGVtID0gcmVwbGFjZShlbGVtKTtcbiAgICBoeWx5dEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcbiAgICByZXR1cm4gaHlseXRFbGVtO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jcmVhdGUtZWxlbXMuanMiLCIvLyBAZmxvd1xuaW1wb3J0IHsgZ2V0U2Nyb2xsSW5kaWNhdG9yIH0gZnJvbSAnLi9zZWxlY3RlZC1oaWdobGlnaHQnO1xuaW1wb3J0IHR5cGUgeyBIeWx5dCB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGh5bHl0OiBIeWx5dCkge1xuICAvLyB0aGlzIG1ha2VzIGFuIGFzc3VtcHRpb24gYWJvdXQgdGhlIG9yaWdpbmFsIHN0YXRlIG9mIHRoZVxuICAvLyB0ZXh0bm9kZS4gUGVyaGFwcyB3ZSdsbCBuZWVkIHRvIGluY29ycG9yYXRlIGFmZmVjdGVkRWxlbXNcbiAgaHlseXQuZWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWxlbS50ZXh0Q29udGVudCk7XG4gICAgZWxlbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgZWxlbSk7XG4gIH0pO1xuICBnZXRTY3JvbGxJbmRpY2F0b3IoaHlseXQpLnJlbW92ZSgpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlbW92ZS5qcyIsIi8vIEBmbG93XG5pbXBvcnQgeyBhZGRTY3JvbGxJbmRpY2F0b3IsIHBsYWNlU2Nyb2xsSW5kaWNhdG9yLCBzY3JvbGxUb0hpZ2hsaWdodCB9IGZyb20gJy4vc2VsZWN0ZWQtaGlnaGxpZ2h0JztcbmltcG9ydCBjcmVhdGVFbGVtcyBmcm9tICcuL2NyZWF0ZS1lbGVtcyc7XG5pbXBvcnQgeyBpc1ZhbGlkUmFuZ2UgfSBmcm9tICcuL2hpZ2hsaWdodCc7XG5pbXBvcnQgdHlwZSB7IEh5bHl0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5mdW5jdGlvbiBnZXRUZXh0Tm9kZShwYXJlbnRTZWxlY3RvciwgaW5kZXgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50U2VsZWN0b3IpLmNoaWxkTm9kZXNbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBnZXRIeWx5dFJhbmdlKGh5bHl0KSB7XG4gIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgbGV0IHN0YXJ0Tm9kZTtcbiAgbGV0IGVuZE5vZGU7XG4gIGlmIChoeWx5dC5lbGVtcykge1xuICAgIHJhbmdlLnNldFN0YXJ0QmVmb3JlKGh5bHl0LmVsZW1zWzBdKTtcbiAgICByYW5nZS5zZXRFbmRBZnRlcihoeWx5dC5lbGVtc1toeWx5dC5lbGVtcy5sZW5ndGggLSAxXSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhcnROb2RlID0gZ2V0VGV4dE5vZGUoaHlseXQuc3RhcnRTZWxlY3RvciwgaHlseXQuc3RhcnROb2RlSW5kZXgpO1xuICAgIGVuZE5vZGUgPSBnZXRUZXh0Tm9kZShoeWx5dC5lbmRTZWxlY3RvciwgaHlseXQuZW5kTm9kZUluZGV4KTtcbiAgICByYW5nZS5zZXRTdGFydChzdGFydE5vZGUsIGh5bHl0LnN0YXJ0T2Zmc2V0KTtcbiAgICByYW5nZS5zZXRFbmQoZW5kTm9kZSwgaHlseXQuZW5kT2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gcmFuZ2U7XG59XG5cbmZ1bmN0aW9uIHBsYWNlSW5kaWNhdG9ycyhoeWx5dHM6IEFycmF5PEh5bHl0Pikge1xuICBoeWx5dHMuZm9yRWFjaCgoaGwpID0+IHBsYWNlU2Nyb2xsSW5kaWNhdG9yKGhsKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChoeWx5dHM6IEFycmF5PEh5bHl0PiB8IEh5bHl0LCBvbkNsaWNrPzogRnVuY3Rpb24pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGh5bHl0cykpIGh5bHl0cyA9IFtoeWx5dHNdO1xuICBoeWx5dHMuZm9yRWFjaCgoaHlseXQ6IEh5bHl0KSA9PiB7XG4gICAgY29uc3QgcmFuZ2UgPSBnZXRIeWx5dFJhbmdlKGh5bHl0KTtcbiAgICBpZiAoaXNWYWxpZFJhbmdlKHJhbmdlKSkge1xuICAgICAgaHlseXQuZWxlbXMgPSBjcmVhdGVFbGVtcyhyYW5nZSwgKGV2dDogTW91c2VFdmVudCkgPT4gb25DbGljayAmJiBvbkNsaWNrKGh5bHl0LCBldnQpKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBoYXNoU3RhcnQgPSAnI2hpLSc7XG4gIGh5bHl0cy5mb3JFYWNoKChobCkgPT4gYWRkU2Nyb2xsSW5kaWNhdG9yKGhsLCBvbkNsaWNrKSk7XG4gIGxldCBoeWx5dElkO1xuICBpZiAoIWxvY2F0aW9uLmhhc2guaW5kZXhPZihoYXNoU3RhcnQpKSB7XG4gICAgaHlseXRJZCA9IHBhcnNlSW50KGxvY2F0aW9uLmhhc2guc3Vic3RyKGhhc2hTdGFydC5sZW5ndGgpKTtcbiAgICBjb25zdCBoeWx5dCA9IGh5bHl0cy5maW5kKChobCkgPT4gaGwuaWQgPT09IGh5bHl0SWQpO1xuICAgIGlmIChoeWx5dCkgc2Nyb2xsVG9IaWdobGlnaHQoaHlseXQpO1xuICB9XG4gIC8vIGNvbnN0IGludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gcGxhY2VJbmRpY2F0b3JzKGh5bHl0cyksIDUwMDApO1xuICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgIHBsYWNlSW5kaWNhdG9ycyhoeWx5dHMpO1xuICAgIC8vIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICB9O1xuICByZXR1cm4gaHlseXRJZDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZXN0b3JlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==