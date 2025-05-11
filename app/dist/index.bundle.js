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

/***/ "./src/css/index.scss":
/*!****************************!*\
  !*** ./src/css/index.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://clearcare/./src/css/index.scss?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.scss */ \"./src/css/index.scss\");\n\nlet speechSynthesis = window.speechSynthesis;\nlet currentUtterance = null;\n\n// Update glossary to include more variations of terms\nconst glossary = {\n  'hypertensive': 'relating to high blood pressure',\n  'hypertension': 'high blood pressure - when blood pushes too hard against blood vessel walls',\n  'hypotensive': 'relating to low blood pressure',\n  'hypo': 'low or under',\n  'hyper': 'high or over',\n  'myocardial infarction': 'heart attack - when blood flow to part of the heart is blocked',\n  'dyspnea': 'difficulty breathing or shortness of breath',\n  'tachycardia': 'unusually fast heart rate',\n  'bradycardia': 'unusually slow heart rate',\n  'edema': 'swelling caused by excess fluid in body tissues',\n  'arrhythmia': 'irregular heartbeat',\n  'hyperlipidemia': 'high levels of fat particles in the blood',\n  'thrombosis': 'blood clot formation inside a blood vessel',\n  'angina': 'chest pain due to reduced blood flow to the heart'\n};\ndocument.addEventListener('DOMContentLoaded', () => {\n  // Navigation setup\n  document.querySelectorAll('nav a').forEach(link => {\n    link.addEventListener('click', e => {\n      e.preventDefault();\n      const page = e.target.getAttribute('href');\n      window.api.navigate(page);\n    });\n  });\n\n  // Populate glossary\n  const glossaryDiv = document.getElementById('glossary');\n  Object.entries(glossary).forEach(([term, definition]) => {\n    const item = document.createElement('div');\n    item.className = 'glossary-item';\n    item.innerHTML = `\n      <span class=\"term\">${term}</span>\n      <span class=\"definition\">${definition}</span>\n    `;\n    glossaryDiv.appendChild(item);\n  });\n\n  // Update the text simplification event listener\n  document.getElementById('simplifyBtn').addEventListener('click', async () => {\n    const inputText = document.getElementById('medicalInput').value;\n    const result = await window.api.simplifyText(inputText);\n    if (result.success) {\n      let text = result.simplified;\n\n      // Improved term matching and tooltip creation\n      Object.entries(glossary).forEach(([term, definition]) => {\n        // Case insensitive global match\n        const regex = new RegExp(`\\\\b${term}\\\\b`, 'gi');\n        text = text.replace(regex, match => `<span class=\"tooltip\" title=\"${definition}\">${match}</span>`);\n      });\n      document.getElementById('output').innerHTML = text;\n    } else {\n      document.getElementById('output').textContent = 'Error simplifying text.';\n    }\n  });\n\n  // Speech synthesis\n  document.getElementById('speakBtn').addEventListener('click', () => {\n    const text = document.getElementById('output').textContent;\n    if (currentUtterance) {\n      speechSynthesis.cancel();\n    }\n    currentUtterance = new SpeechSynthesisUtterance(text);\n    speechSynthesis.speak(currentUtterance);\n  });\n  document.getElementById('stopSpeakBtn').addEventListener('click', () => {\n    if (speechSynthesis.speaking) {\n      speechSynthesis.cancel();\n    }\n  });\n});\n\n// Clean up speech synthesis when leaving the page\nwindow.addEventListener('beforeunload', () => {\n  if (speechSynthesis.speaking) {\n    speechSynthesis.cancel();\n  }\n});\n\n//# sourceURL=webpack://clearcare/./src/scripts/index.js?");

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
/******/ 	__webpack_require__("./src/scripts/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/css/index.scss");
/******/ 	
/******/ })()
;