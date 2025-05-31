const downloadButton = document.getElementById('download');

function getOperatingSystem() {
  // Try using newer userAgentData API first
  if (navigator.userAgentData) {
    const platform = navigator.userAgentData.platform.toLowerCase();
    if (platform.includes('mac')) return 'MacOS';
    if (platform.includes('win')) return 'Windows';
    if (platform.includes('linux')) return 'Linux';
  }

  // Fallback to userAgent string
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('mac os')) return 'MacOS';
  if (userAgent.includes('windows')) return 'Windows';
  if (userAgent.includes('linux')) return 'Linux';

  return 'Unknown';
}

function getMacArchitecture() {
  // Try userAgentData API (experimental, not widely supported)
  if (navigator.userAgentData && navigator.userAgentData.architecture) {
    const arch = navigator.userAgentData.architecture.toLowerCase();
    if (arch.includes('arm')) return 'ARM';
    if (arch.includes('x86')) return 'x64';
  }

  // Fallback to userAgent string
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('arm64') || ua.includes('aarch64')) return 'ARM';
  // Only return x64 if "intel" or "x86_64" is present and "arm" is NOT present
  if ((ua.includes('intel') || ua.includes('x86_64')) && !ua.includes('arm'))
    return 'x64';

  // If not detected, return unknown
  return 'Unknown';
}

function showMacButtons() {
  // Hide the original download button
  downloadButton.style.display = 'none';

  // Create container for Mac buttons if not already present
  let macBtnContainer = document.getElementById('mac-download-buttons');
  if (!macBtnContainer) {
    macBtnContainer = document.createElement('div');
    macBtnContainer.id = 'mac-download-buttons';
    macBtnContainer.style.textAlign = 'center';
    macBtnContainer.style.margin = '20px 0';
    downloadButton.parentNode.insertBefore(
      macBtnContainer,
      downloadButton.nextSibling
    );
  } else {
    macBtnContainer.innerHTML = '';
  }

  // Create a flex container for the buttons and their details
  const flexRow = document.createElement('div');
  flexRow.style.display = 'flex';
  flexRow.style.justifyContent = 'center';
  flexRow.style.alignItems = 'center';
  flexRow.style.gap = '32px';
  flexRow.style.marginBottom = '16px';
  macBtnContainer.appendChild(flexRow);

  // ARM button and detail
  const armCol = document.createElement('div');
  armCol.style.display = 'flex';
  armCol.style.flexDirection = 'column';
  armCol.style.alignItems = 'center';
  const armBtn = document.createElement('a');
  armBtn.href =
    'https://drive.google.com/file/d/1KaOqWRKWuE1WFBymBr3FxC_GQt3O0geD/view?usp=drive_link';
  armBtn.className = 'download-button';
  armBtn.textContent = 'Download for Mac ARM';
  armCol.appendChild(armBtn);
  const armDetail = document.createElement('div');
  armDetail.style.fontSize = '0.95em';
  armDetail.style.color = '#555';
  armDetail.textContent = 'For Apple Silicon (M-series: M1, M2, M3, etc.)';
  armCol.appendChild(armDetail);
  flexRow.appendChild(armCol);

  // x64 button and detail
  const x64Col = document.createElement('div');
  x64Col.style.display = 'flex';
  x64Col.style.flexDirection = 'column';
  x64Col.style.alignItems = 'center';
  const x64Btn = document.createElement('a');
  x64Btn.href =
    'https://drive.google.com/file/d/1kV1PIj-qKFjx3jVf-YbAIxVFDaZ7FbyN/view?usp=drive_link';
  x64Btn.className = 'download-button';
  x64Btn.textContent = 'Download for Mac x64';
  x64Col.appendChild(x64Btn);
  const x64Detail = document.createElement('div');
  x64Detail.style.fontSize = '0.95em';
  x64Detail.style.color = '#555';
  x64Detail.textContent = 'For Intel-based Macs';
  x64Col.appendChild(x64Detail);
  flexRow.appendChild(x64Col);
}

function showWindowsButton() {
  downloadButton.style.display = 'inline-block';
  downloadButton.href =
    'https://drive.google.com/file/d/1HrKXKfB4i1Z5ZxkKM8SWCRUMLF_eoujr/view?usp=drive_link';
  // Remove Mac buttons if present
  const macBtnContainer = document.getElementById('mac-download-buttons');
  if (macBtnContainer) macBtnContainer.remove();
}

// Main logic
const os = getOperatingSystem();
if (os === 'MacOS') {
  showMacButtons();
} else if (os === 'Windows') {
  showWindowsButton();
} else {
  downloadButton.style.display = 'none';
  const macBtnContainer = document.getElementById('mac-download-buttons');
  if (macBtnContainer) macBtnContainer.remove();
  alert(
    'Unsupported operating system. Please use MacOS or Windows to download the installer.'
  );
}

// Example usage
