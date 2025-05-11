import '../css/index.scss';

let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Update glossary to include more variations of terms
const glossary = {
  'hypertensive': 'relating to high blood pressure',
  'hypertension': 'high blood pressure - when blood pushes too hard against blood vessel walls',
  'hypotensive': 'relating to low blood pressure',
  'hypo': 'low or under',
  'hyper': 'high or over',
  'myocardial infarction': 'heart attack - when blood flow to part of the heart is blocked',
  'dyspnea': 'difficulty breathing or shortness of breath',
  'tachycardia': 'unusually fast heart rate',
  'bradycardia': 'unusually slow heart rate',
  'edema': 'swelling caused by excess fluid in body tissues',
  'arrhythmia': 'irregular heartbeat',
  'hyperlipidemia': 'high levels of fat particles in the blood',
  'thrombosis': 'blood clot formation inside a blood vessel',
  'angina': 'chest pain due to reduced blood flow to the heart'
};

document.addEventListener('DOMContentLoaded', () => {
  // Navigation setup
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('href');
      window.api.navigate(page);
    });
  });

  // Populate glossary
  const glossaryDiv = document.getElementById('glossary');
  Object.entries(glossary).forEach(([term, definition]) => {
    const item = document.createElement('div');
    item.className = 'glossary-item';
    item.innerHTML = `
      <span class="term">${term}</span>
      <span class="definition">${definition}</span>
    `;
    glossaryDiv.appendChild(item);
  });

  // Update the text simplification event listener
  document.getElementById('simplifyBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('medicalInput').value;
    const result = await window.api.simplifyText(inputText);
    
    if (result.success) {
      let text = result.simplified;
      
      // Improved term matching and tooltip creation
      Object.entries(glossary).forEach(([term, definition]) => {
        // Case insensitive global match
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        text = text.replace(regex, (match) => 
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
