/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Controller.js":
/*!***********************!*\
  !*** ./Controller.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_Objects_Target_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Objects/Target.js */ \"./src/Objects/Target.js\");\n/* harmony import */ var _src_View_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/View.js */ \"./src/View.js\");\n\r\n\r\n\r\n\r\n__webpack_require__(/*! file-loader?name=[name].[ext]!../../../index.html */ \"./node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html\");\r\n\r\nconst d = document\r\nconst w = window\r\nconst body = d.querySelector('body')\r\n\r\n// Lets declare all of the draggable objects in the game.\r\n// In the proper envirement we would not have this declaration, and instead push\r\n// new game objects straight up to the game view, or to other proper container.\r\nlet draggables = [\r\n    d.querySelector('#objectA'),\r\n    d.querySelector('#objectB')\r\n]\r\n\r\n// --------------------------------------     STATE VARIABLES      -------------------------------------\r\nlet selectedTarget = null\r\nlet draggedFromX = 0\r\nlet draggedFromY = 0\r\n\r\n// ----------------------------------------     INITIATION      ----------------------------------------\r\nconst gameObjects = draggables.map(object => new _src_Objects_Target_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](object))\r\n\r\n\r\n// ----------------------------------------     MOUSE MOVE      ----------------------------------------\r\nbody.addEventListener('mousemove', (event) => {\r\n    // Cursor position\r\n    const cursorX = event.clientX - draggedFromX\r\n    const cursorY = event.clientY - draggedFromY\r\n\r\n    if (selectedTarget) selectedTarget.dragTo(cursorX, cursorY)\r\n\r\n    // Developer Console\r\n    _src_View_js__WEBPACK_IMPORTED_MODULE_1__.devTool.cursorPosition(cursorX, cursorY)\r\n})\r\n\r\n\r\n// ----------------------------------------     MOUSE DOWN      ----------------------------------------\r\nbody.addEventListener('mousedown', (event) => {\r\n    // State management\r\n    draggedFromX = event.clientX\r\n    draggedFromY = event.clientY\r\n    // \r\n    selectedTarget = gameObjects.find(target => target.name === event.target.id)\r\n\r\n    // Developer Console\r\n    _src_View_js__WEBPACK_IMPORTED_MODULE_1__.devTool.cursorState('Pressed')\r\n    if (selectedTarget) _src_View_js__WEBPACK_IMPORTED_MODULE_1__.devTool.targetName(selectedTarget.name)\r\n})\r\n\r\n\r\n// -----------------------------------------     MOUSE UP      -----------------------------------------\r\nbody.addEventListener('mouseup', (event) => {\r\n    // State management\r\n    if (selectedTarget) selectedTarget.updateState()\r\n\r\n    selectedTarget = null\r\n    draggedFromX = 0\r\n    draggedFromY = 0\r\n\r\n    // Developer Console\r\n    _src_View_js__WEBPACK_IMPORTED_MODULE_1__.devTool.cursorState('Idle')\r\n    _src_View_js__WEBPACK_IMPORTED_MODULE_1__.devTool.targetName('Empty')\r\n})\r\n\r\n\r\n// ----------------------------------------     MOUSE LEAVE      ---------------------------------------\r\nbody.addEventListener('mouseleave', (event) => {\r\n\r\n    // Developer Console\r\n    _src_View_js__WEBPACK_IMPORTED_MODULE_1__.devTool.cursorState('Away')\r\n})\r\n\r\n\r\n// --------------------------------------     VIEWPORT RESIZE      -------------------------------------\r\nw.addEventListener('resize', (event) => {\r\n    gameObjects.forEach(object => object.updateState())\r\n})\r\n\n\n//# sourceURL=webpack://dragger/./Controller.js?");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"index.html\");\n\n//# sourceURL=webpack://dragger/./index.html?./node_modules/file-loader/dist/cjs.js?name=%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./src/Objects/Target.js":
/*!*******************************!*\
  !*** ./src/Objects/Target.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Target)\n/* harmony export */ });\nclass Target {\r\n    constructor (element) {\r\n        this.element = element\r\n        this.name = element.id\r\n\r\n        // Storing the position of the object. This needs to know what coordinates we\r\n        // are moving from. There might be a better solution to this.\r\n        this.positionX = this.element.offsetLeft\r\n        this.positionY = this.element.offsetTop\r\n\r\n        this.gameViewWidth = this.element.parentElement.offsetWidth\r\n        this.gameViewHeight = this.element.parentElement.offsetHeight\r\n    }\r\n\r\n    dragTo = (x, y) => {\r\n        // Simple logic - the furthest position of the top left point is always width\r\n        // of the parent minus width of the element. If either parent of element change the\r\n        // size then the logic working accordingly.\r\n        const maxX = this.gameViewWidth - this.element.offsetWidth\r\n        const maxY = this.gameViewHeight - this.element.offsetHeight\r\n\r\n        // New position equal to the original position of the object plus the amount of the\r\n        // distance of the cursor from its own original position.\r\n        const poisitionX = this.positionX + x\r\n        const poisitionY = this.positionY + y\r\n\r\n        // Super duper cool ternary way of finding edges of the viewport\r\n        this.element.style.left = poisitionX < 0 ? '0px'\r\n            : poisitionX > maxX ? maxX + 'px'\r\n                : poisitionX + 'px'\r\n\r\n        this.element.style.top = poisitionY < 0 ? '0px'\r\n            : poisitionY > maxY ? maxY + 'px'\r\n                : poisitionY + 'px'\r\n\r\n        // We want this object to be on top of other objects when clicking on it\r\n        if (this.element.style.zIndex !== 1000) this.element.style.zIndex = 1000\r\n    }\r\n\r\n    updateState() {\r\n        // In case viewport has changed the size\r\n        const tooWide = this.element.offsetLeft + this.element.offsetWidth > this.gameViewWidth\r\n        const tooTall = this.element.offsetTop + this.element.offsetHeight > this.gameViewHeight\r\n        if (tooWide) this.element.style.left = this.gameViewWidth - this.element.offsetWidth + 'px'\r\n        if (tooTall) this.element.style.top = this.gameViewHeight - this.element.offsetHeight + 'px'\r\n\r\n        this.positionX = this.element.offsetLeft\r\n        this.positionY = this.element.offsetTop\r\n\r\n        this.gameViewWidth = this.element.parentElement.offsetWidth\r\n        this.gameViewHeight = this.element.parentElement.offsetHeight\r\n    }\r\n}\n\n//# sourceURL=webpack://dragger/./src/Objects/Target.js?");

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"devTool\": () => (/* binding */ devTool)\n/* harmony export */ });\nconst d = document\r\nconst w = window\r\nconst body = d.querySelector('body')\r\n\r\n// Lets fill up our Dev Console and have its State stored.\r\nconst devToolElement = d.querySelector('#dev-console')\r\ndevToolElement.classList.add('hidden')\r\n// Cursor position part of the Dev Console.\r\nconst devToolCursor = d.createElement('div')\r\ndevToolCursor.id = 'dev-console_cursor'\r\n//devToolCursor.className = 'hidden'\r\n// Both X and Y position is displayed with H4 tag that holds the wording and span tag for the value\r\nconst devToolCursorX = d.createElement('h4')\r\nconst devToolCursorY = d.createElement('h4')\r\ndevToolCursorX.innerHTML = `horisontal:<span>Initiated</span>`\r\ndevToolCursorY.innerHTML = `vertical:<span>Initiated</span>` // so as this one\r\n// And so we can reference span elements in the future\r\nconst devToolCursorValueX = devToolCursorX.querySelector('span')\r\nconst devToolCursorValueY = devToolCursorY.querySelector('span')\r\n// Adding position representative elements to the parent\r\ndevToolCursor.append(devToolCursorX, devToolCursorY)\r\n\r\n\r\n// Mouse click detection\r\nconst detToolClick = d.createElement('div')\r\ndetToolClick.id = 'dev-console_click'\r\n//\r\nconst detToolClickState = d.createElement('h4')\r\ndetToolClickState.innerHTML = `mouse state: <span>Idle</span>`\r\n//\r\nconst detToolClickStateValue = detToolClickState.querySelector('span')\r\n// Adding to Click detector\r\ndetToolClick.append(detToolClickState)\r\n\r\n\r\n// Click target detection\r\nconst detToolClickTarget = d.createElement('div')\r\ndetToolClickTarget.id = 'dev-console_target'\r\n//\r\nconst detToolClickTargetState = d.createElement('h4')\r\ndetToolClickTargetState.innerHTML = `click target: <span>Empty</span>`\r\n//\r\nconst detToolClickTargetValue = detToolClickTargetState.querySelector('span')\r\n// Adding to Click detector\r\ndetToolClick.append(detToolClickTargetState)\r\n\r\n\r\n// Toggle button\r\nconst devToolToggle = d.createElement('button')\r\ndevToolToggle.id = 'dev-console_toggle'\r\ndevToolToggle.innerText = 'Toggle Console'\r\ndevToolToggle.addEventListener('click', () => devToolElement.classList.toggle('hidden'))\r\n\r\n// Adding everything to the console. This should be the very last line of dev console logic\r\ndevToolElement.append(devToolToggle, devToolCursor, detToolClick)\r\n\r\n// Functions to update dev console values\r\n// Done in a Class style but with a simple object\r\nconst devTool = {\r\n    cursorPosition: (x, y) => {\r\n        // Only updating the inner text of span elements\r\n        devToolCursorValueX.innerText = x\r\n        devToolCursorValueY.innerText = y\r\n    },\r\n    cursorState: (state) => detToolClickStateValue.innerText = state,\r\n    targetName: (state) => detToolClickTargetValue.innerText = state ? state : null\r\n}\r\n\r\n\n\n//# sourceURL=webpack://dragger/./src/View.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Controller.js");
/******/ 	
/******/ })()
;