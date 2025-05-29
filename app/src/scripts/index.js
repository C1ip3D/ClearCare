import { doc } from 'firebase/firestore';
import '../css/index.scss';
import medicalTerms from '../data/medicalTerms.json';

let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let glossaryTerms = medicalTerms.terms;

let loadingInterval;

function updateGlossaryUI(searchTerm = '') {
  const glossaryDiv = document.getElementById('glossary');
  glossaryDiv.innerHTML = '';

  glossaryTerms
    .filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .forEach((item) => {
      const termDiv = document.createElement('div');
      termDiv.className = 'glossary-item';
      termDiv.innerHTML = `
        <span class="term">${item.term} </span>
        <span class="definition">     ${item.definition}</span>
      `;
      glossaryDiv.appendChild(termDiv);
    });
}

function animateLoading(element) {
  const loadingStates = ['Loading.', 'Loading..', 'Loading...'];
  let currentIndex = 0;
  
  clearInterval(loadingInterval);
  loadingInterval = setInterval(() => {
    element.innerHTML = loadingStates[currentIndex];
    currentIndex = (currentIndex + 1) % loadingStates.length;
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize glossary
  updateGlossaryUI();

  // Glossary collapse/expand
  const toggleBtn = document.getElementById('toggleGlossary');
  const glossaryContent = document.getElementById('glossaryContent');

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('collapsed');
    glossaryContent.classList.toggle('collapsed');
    toggleBtn.textContent = toggleBtn.classList.contains('collapsed')
      ? '▶'
      : '▼';
  });

  // Glossary search
  const searchInput = document.getElementById('glossarySearch');
  searchInput.addEventListener('input', (e) => {
    updateGlossaryUI(e.target.value);
  });

  // Text simplification
  document.getElementById('simplifyBtn').addEventListener('click', async () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = 'Loading.';
    animateLoading(outputDiv);
    
    const inputText = document.getElementById('medicalInput').value;
    const result = await window.api.simplifyText(inputText);

    clearInterval(loadingInterval);
    
    if (result.success) {
      const outputs = `${result.simplified}`
      let text = outputs;

      // Highlight medical terms
      glossaryTerms.forEach(({ term }) => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        text = text.replace(
          regex,
          (match) => `<span class="highlighted-term">${match}</span>`
        );
      });

      outputDiv.innerHTML = text;
    } else {
      outputDiv.textContent = 'Error simplifying text.';
    }
  });

  // Speech synthesis
  document.getElementById('speakBtn').addEventListener('click', () => {
    const text = document.getElementById('output').textContent;
    if (currentUtterance) {
      speechSynthesis.cancel();
    }
    currentUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(currentUtterance);
  });

  document.getElementById('stopSpeakBtn').addEventListener('click', () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  });
});

// Clean up speech synthesis when leaving the page
window.addEventListener('beforeunload', () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
});
