import '../css/index.scss';
import medicalTerms from '../data/medicalTerms.json';

let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let glossaryTerms = medicalTerms.terms;

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
        <span class="term">${item.term}</span>
        <span class="definition">${item.definition}</span>
      `;
      glossaryDiv.appendChild(termDiv);
    });
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

  // Text simplification with tooltip highlighting
  document.getElementById('simplifyBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('medicalInput').value;
    const result = await window.api.simplifyText(inputText);

    if (result.success) {
      let text = result.simplified;

      // Add tooltips for medical terms
      glossaryTerms.forEach(({ term, definition }) => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        text = text.replace(
          regex,
          (match) =>
            `<span class="tooltip" title="${definition}">${match}</span>`
        );
      });

      document.getElementById('output').innerHTML = text;
    } else {
      document.getElementById('output').textContent = 'Error simplifying text.';
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
