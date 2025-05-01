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

/***/ "./src/css/forgot-password.scss":
/*!**************************************!*\
  !*** ./src/css/forgot-password.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://clearcare/./src/css/forgot-password.scss?");

/***/ }),

/***/ "./src/scripts/forgot-password.js":
/*!****************************************!*\
  !*** ./src/scripts/forgot-password.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_forgot_password_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/forgot-password.scss */ \"./src/css/forgot-password.scss\");\n\nconst form = document.querySelector('.forgot-form');\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.querySelectorAll('nav a').forEach(link => {\n    link.addEventListener('click', e => {\n      e.preventDefault();\n      const page = e.target.getAttribute('href');\n      window.api.navigate(page);\n    });\n  });\n});\nform.onsubmit = async e => {\n  e.preventDefault();\n  const formData = new FormData(form);\n  const email = formData.get('email');\n  try {\n    const response = await window.api.forgotPassword(email);\n    if (response.success) {\n      alert('Password reset link sent to your email.');\n      window.api.navigate('login');\n    } else {\n      alert(response.message || 'Failed to send password reset link. Please try again.');\n    }\n  } catch (error) {\n    console.error('Forgot password error:', error);\n    alert('An error occurred while processing your request. Please try again later.');\n  }\n};\n\n//# sourceURL=webpack://clearcare/./src/scripts/forgot-password.js?");

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
/******/ 	__webpack_require__("./src/scripts/forgot-password.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/css/forgot-password.scss");
/******/ 	
/******/ })()
;