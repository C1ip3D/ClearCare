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

/***/ "./src/data/medicalTerms.json":
/*!************************************!*\
  !*** ./src/data/medicalTerms.json ***!
  \************************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"terms\":[{\"term\":\"abdominal\",\"definition\":\"Relating to the abdomen (belly), the part of the body containing the digestive organs\"},{\"term\":\"anemia\",\"definition\":\"A condition where you don\\'t have enough healthy red blood cells to carry adequate oxygen to your body\\'s tissues\"},{\"term\":\"angina\",\"definition\":\"Chest pain caused by reduced blood flow to the heart\"},{\"term\":\"arrhythmia\",\"definition\":\"A problem with the rate or rhythm of your heartbeat\"},{\"term\":\"arthritis\",\"definition\":\"Inflammation of one or more joints causing pain and stiffness\"},{\"term\":\"asthma\",\"definition\":\"A condition that affects your airways and can make breathing difficult\"},{\"term\":\"benign\",\"definition\":\"Not harmful in effect; in particular, (of a tumor) not cancerous\"},{\"term\":\"biopsy\",\"definition\":\"An examination of tissue removed from a living body to discover the presence or cause of disease\"},{\"term\":\"bronchitis\",\"definition\":\"Inflammation of the bronchi (airways) in the lungs\"},{\"term\":\"carcinoma\",\"definition\":\"A type of cancer that starts in cells that make up the skin or the tissue lining organs\"},{\"term\":\"cardiac\",\"definition\":\"Related to the heart\"},{\"term\":\"chronic\",\"definition\":\"Persisting for a long time or constantly recurring\"},{\"term\":\"diabetes\",\"definition\":\"A disease in which the body\\'s ability to produce or respond to insulin is impaired\"},{\"term\":\"diagnosis\",\"definition\":\"The identification of an illness or condition by examining symptoms\"},{\"term\":\"edema\",\"definition\":\"Swelling caused by excess fluid trapped in body tissues\"},{\"term\":\"fracture\",\"definition\":\"A break in a bone\"},{\"term\":\"hemorrhage\",\"definition\":\"An escape of blood from a ruptured blood vessel\"},{\"term\":\"hypertension\",\"definition\":\"High blood pressure\"},{\"term\":\"hypertensive\",\"definition\":\"Having abnormally high blood pressure\"},{\"term\":\"hypotension\",\"definition\":\"Abnormally low blood pressure\"},{\"term\":\"inflammation\",\"definition\":\"A localized physical condition where part of the body becomes reddened, swollen, and painful\"},{\"term\":\"lesion\",\"definition\":\"A region of tissue that has suffered damage through injury or disease\"},{\"term\":\"malignant\",\"definition\":\"A severe and progressively worsening disease, typically cancerous\"},{\"term\":\"nausea\",\"definition\":\"A feeling of sickness with an inclination to vomit\"},{\"term\":\"necrosis\",\"definition\":\"The death of body tissue due to disease or injury\"},{\"term\":\"osteoporosis\",\"definition\":\"A medical condition in which the bones become brittle and fragile\"},{\"term\":\"pneumonia\",\"definition\":\"Inflammation of the lungs caused by infection\"},{\"term\":\"prognosis\",\"definition\":\"The likely course of a medical condition\"},{\"term\":\"syndrome\",\"definition\":\"A group of symptoms that consistently occur together\"},{\"term\":\"systolic\",\"definition\":\"Relating to the contraction of the heart\"}],\"lastUpdated\":\"2023-11-11\",\"version\":\"1.1\",\"source\":\"Medical Dictionary and Clinical Terms Database\"}');\n\n//# sourceURL=webpack://clearcare/./src/data/medicalTerms.json?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.scss */ \"./src/css/index.scss\");\n/* harmony import */ var _data_medicalTerms_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/medicalTerms.json */ \"./src/data/medicalTerms.json\");\n\n\nlet speechSynthesis = window.speechSynthesis;\nlet currentUtterance = null;\nlet glossaryTerms = _data_medicalTerms_json__WEBPACK_IMPORTED_MODULE_1__.terms;\nfunction updateGlossaryUI(searchTerm = '') {\n  const glossaryDiv = document.getElementById('glossary');\n  glossaryDiv.innerHTML = '';\n  glossaryTerms.filter(item => item.term.toLowerCase().includes(searchTerm.toLowerCase()) || item.definition.toLowerCase().includes(searchTerm.toLowerCase())).forEach(item => {\n    const termDiv = document.createElement('div');\n    termDiv.className = 'glossary-item';\n    termDiv.innerHTML = `\n        <span class=\"term\">${item.term}</span>\n        <span class=\"definition\">${item.definition}</span>\n      `;\n    glossaryDiv.appendChild(termDiv);\n  });\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  // Initialize glossary\n  updateGlossaryUI();\n\n  // Glossary collapse/expand\n  const toggleBtn = document.getElementById('toggleGlossary');\n  const glossaryContent = document.getElementById('glossaryContent');\n  toggleBtn.addEventListener('click', () => {\n    toggleBtn.classList.toggle('collapsed');\n    glossaryContent.classList.toggle('collapsed');\n    toggleBtn.textContent = toggleBtn.classList.contains('collapsed') ? '▶' : '▼';\n  });\n\n  // Glossary search\n  const searchInput = document.getElementById('glossarySearch');\n  searchInput.addEventListener('input', e => {\n    updateGlossaryUI(e.target.value);\n  });\n\n  // Text simplification with tooltip highlighting\n  document.getElementById('simplifyBtn').addEventListener('click', async () => {\n    const inputText = document.getElementById('medicalInput').value;\n    const result = await window.api.simplifyText(inputText);\n    if (result.success) {\n      let text = result.simplified;\n\n      // Add tooltips for medical terms\n      glossaryTerms.forEach(({\n        term,\n        definition\n      }) => {\n        const regex = new RegExp(`\\\\b${term}\\\\b`, 'gi');\n        text = text.replace(regex, match => `<span class=\"tooltip\" title=\"${definition}\">${match}</span>`);\n      });\n      document.getElementById('output').innerHTML = text;\n    } else {\n      document.getElementById('output').textContent = 'Error simplifying text.';\n    }\n  });\n\n  // Speech synthesis\n  document.getElementById('speakBtn').addEventListener('click', () => {\n    const text = document.getElementById('output').textContent;\n    if (currentUtterance) {\n      speechSynthesis.cancel();\n    }\n    currentUtterance = new SpeechSynthesisUtterance(text);\n    speechSynthesis.speak(currentUtterance);\n  });\n  document.getElementById('stopSpeakBtn').addEventListener('click', () => {\n    if (speechSynthesis.speaking) {\n      speechSynthesis.cancel();\n    }\n  });\n});\n\n// Clean up speech synthesis when leaving the page\nwindow.addEventListener('beforeunload', () => {\n  if (speechSynthesis.speaking) {\n    speechSynthesis.cancel();\n  }\n});\n\n//# sourceURL=webpack://clearcare/./src/scripts/index.js?");

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