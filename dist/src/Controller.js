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

/***/ "./src/Controller.js":
/*!***************************!*\
  !*** ./src/Controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ \"./src/View.js\");\n\r\n\r\n\r\nconst d = document\r\nconst w = window\r\n\r\n// Lets declare all of the draggable objects in the game.\r\n// In the proper envirement we would not have this declaration, and instead push\r\n// new game objects straight up to the game view, or to other proper container.\r\nlet draggables = [\r\n    d.querySelector('#objectA'),\r\n    d.querySelector('#objectB')\r\n]\r\n\r\n// Constants\r\nconst gameView = d.querySelector('#game-view')\r\n\r\n// State variables\r\nlet gameViewWidth = gameView.offsetWidth\r\nlet gameViewHeight = gameView.offsetHeight\r\n\r\n\r\n// Initiation of the application\r\ndraggables.forEach(object => {\r\n    // Object properties\r\n    const objectWidth = object.offsetWidth\r\n    const objectHeight = object.offsetHeight\r\n    // Simple logic - the furthest position of the top left point is always width of the parent minus\r\n    // width of the element. If either parent of element change the size then the logic working\r\n    // accordingly.\r\n    const maxX = gameViewWidth - objectWidth\r\n    const maxY = gameViewHeight - objectHeight\r\n\r\n    // The idea is to snap shot the position of cursor and object and then change the location of the\r\n    // object appropreately depending on the change in the cursor position.\r\n    // We also want to do it with multiple event listeners\r\n    object.addEventListener('mousedown', (event) => {\r\n        // Dev tools stuff\r\n        _View_js__WEBPACK_IMPORTED_MODULE_0__.devTool.targetName(event.target.id)\r\n        _View_js__WEBPACK_IMPORTED_MODULE_0__.devTool.cursorState('Mouse Hold')\r\n\r\n        // Initial cursor and game object position snapshots, from here on we use this as a reference of\r\n        // how much the new position is different.\r\n        const cursorOriginalX = event.clientX\r\n        const cursorOriginalY = event.clientY\r\n        const objectOriginalX = event.target.offsetLeft\r\n        const objectOriginalY = event.target.offsetTop\r\n\r\n        const dragTo = (event) => {\r\n            // Lets find out the difference of how much cursor has moved and add it to the original object\r\n            // position, so we have a new position of the object.\r\n            const cursorNewX = event.clientX - cursorOriginalX\r\n            const cursorNewY = event.clientY - cursorOriginalY\r\n            const dragToX = objectOriginalX + cursorNewX\r\n            const dragToY = objectOriginalY + cursorNewY\r\n\r\n            // Super duper cool ternary way of finding edges of the viewport and not letting the objet\r\n            // to go pass it.\r\n            object.style.left = dragToX < 0 ? '0px'\r\n                : dragToX > maxX ? maxX + 'px'\r\n                    : dragToX + 'px'\r\n\r\n            object.style.top = dragToY < 0 ? '0px'\r\n                : dragToY > maxY ? maxY + 'px'\r\n                    : dragToY + 'px'\r\n\r\n            _View_js__WEBPACK_IMPORTED_MODULE_0__.devTool.cursorPosition(cursorNewX, cursorNewY)\r\n        }\r\n        // Adding and removing functionality of the object to the document depending on the mouse click\r\n        // and release\r\n        d.addEventListener('mousemove', dragTo)\r\n        d.addEventListener('mouseup', () => {\r\n            // Dev tools stuff\r\n            _View_js__WEBPACK_IMPORTED_MODULE_0__.devTool.reset()\r\n            d.removeEventListener('mousemove', dragTo)\r\n        })\r\n    })\r\n\r\n    // Updating the position of the game object according to the window resizing\r\n    w.addEventListener('resize', () => {\r\n        // Updating the state\r\n        gameViewWidth = gameView.offsetWidth\r\n        gameViewHeight = gameView.offsetHeight\r\n        // Returning booleans for the conditionals below\r\n        const tooWide = object.offsetLeft + object.offsetWidth > gameViewWidth\r\n        const tooTall = object.offsetTop + object.offsetHeight > gameViewHeight\r\n        // Changing the position if needed\r\n        if (tooWide) object.style.left = gameViewWidth - objectWidth + 'px'\r\n        if (tooTall) object.style.top = gameViewHeight - objectHeight + 'px'\r\n    })\r\n})\r\n\r\n// Dev tools stuff\r\nd.addEventListener('mousemove', (event) => _View_js__WEBPACK_IMPORTED_MODULE_0__.devTool.cursorPosition(event.clientX, event.clientY))\n\n//# sourceURL=webpack://dragger/./src/Controller.js?");

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"devTool\": () => (/* binding */ devTool)\n/* harmony export */ });\nconst d = document\r\n\r\n// Lets fill up our Dev Console and have its State stored.\r\nconst devToolElement = d.querySelector('#dev-console')\r\ndevToolElement.classList.add('hidden')\r\n// Cursor position part of the Dev Console.\r\nconst devToolCursor = d.createElement('div')\r\ndevToolCursor.id = 'dev-console_cursor'\r\n//devToolCursor.className = 'hidden'\r\n// Both X and Y position is displayed with H4 tag that holds the wording and span tag for the value\r\nconst devToolCursorX = d.createElement('h4')\r\nconst devToolCursorY = d.createElement('h4')\r\ndevToolCursorX.innerHTML = `horisontal:<span>Initiated</span>`\r\ndevToolCursorY.innerHTML = `vertical:<span>Initiated</span>` // so as this one\r\n// And so we can reference span elements in the future\r\nconst devToolCursorValueX = devToolCursorX.querySelector('span')\r\nconst devToolCursorValueY = devToolCursorY.querySelector('span')\r\n// Adding position representative elements to the parent\r\ndevToolCursor.append(devToolCursorX, devToolCursorY)\r\n\r\n\r\n// Mouse click detection\r\nconst detToolClick = d.createElement('div')\r\ndetToolClick.id = 'dev-console_click'\r\n//\r\nconst detToolClickState = d.createElement('h4')\r\ndetToolClickState.innerHTML = `mouse state: <span>Idle</span>`\r\n//\r\nconst detToolClickStateValue = detToolClickState.querySelector('span')\r\n// Adding to Click detector\r\ndetToolClick.append(detToolClickState)\r\n\r\n\r\n// Click target detection\r\nconst detToolClickTarget = d.createElement('div')\r\ndetToolClickTarget.id = 'dev-console_target'\r\n//\r\nconst detToolClickTargetState = d.createElement('h4')\r\ndetToolClickTargetState.innerHTML = `click target: <span>Empty</span>`\r\n//\r\nconst detToolClickTargetValue = detToolClickTargetState.querySelector('span')\r\n// Adding to Click detector\r\ndetToolClick.append(detToolClickTargetState)\r\n\r\n\r\n// Toggle button\r\nconst devToolToggle = d.createElement('button')\r\ndevToolToggle.id = 'dev-console_toggle'\r\ndevToolToggle.innerText = 'Toggle Console'\r\ndevToolToggle.addEventListener('click', () => devToolElement.classList.toggle('hidden'))\r\n\r\n// Adding everything to the console. This should be the very last line of dev console logic\r\ndevToolElement.append(devToolToggle, devToolCursor, detToolClick)\r\n\r\n// Functions to update dev console values\r\n// Done in a Class style but with a simple object\r\nconst devTool = {\r\n    reset: () => {\r\n        detToolClickTargetValue.innerText = 'Empty'\r\n        detToolClickStateValue.innerText = 'Idle'\r\n    },\r\n    cursorPosition: (x, y) => {\r\n        // Only updating the inner text of span elements\r\n        devToolCursorValueX.innerText = x\r\n        devToolCursorValueY.innerText = y\r\n    },\r\n    cursorState: (state) => detToolClickStateValue.innerText = state,\r\n    targetName: (state) => detToolClickTargetValue.innerText = state ? state : null\r\n}\r\n\r\n\n\n//# sourceURL=webpack://dragger/./src/View.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Controller.js");
/******/ 	
/******/ })()
;