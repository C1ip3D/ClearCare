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

/***/ "./src/scripts/login.js":
/*!******************************!*\
  !*** ./src/scripts/login.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '../css/login.scss'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nconst form = document.querySelector('.login-form');\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.querySelectorAll('nav a').forEach(link => {\n    link.addEventListener('click', e => {\n      e.preventDefault();\n      const page = e.target.getAttribute('href');\n      console.log(page);\n      window.api.navigate(page);\n    });\n  });\n});\nform.onsubmit = async e => {\n  e.preventDefault();\n  const formData = new FormData(form);\n  const credentials = {\n    email: formData.get('email'),\n    password: formData.get('password')\n  };\n  try {\n    const serializedCredentials = await window.api.serializer(credentials);\n    const response = await window.api.login(serializedCredentials);\n    if (response.success) {\n      window.api.navigate('index');\n    } else {\n      alert('Login failed. Please check your credentials and try again.');\n    }\n  } catch (error) {\n    console.error('Login error:', error.message || error);\n    alert('An error occurred during login. Please try again later.');\n  }\n};\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.querySelectorAll('a').forEach(link => {\n    link.addEventListener('click', e => {\n      e.preventDefault();\n      const page = e.target.getAttribute('href');\n      window.api.navigate(page);\n    });\n  });\n});\n\n//# sourceURL=webpack://clearcare/./src/scripts/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/login.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;