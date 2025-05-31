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

if(getOperatingSystem() === 'MacOS') {
  downloadButton.attributes.href.value = 'https://drive.google.com/file/d/1Cbp8QWNRf8851IE20I9wU1xqIebnFoZZ/view?usp=drive_link'
} 
else if (getOperatingSystem() === 'Windows') {
  downloadButton.attributes.href.value = 'https://drive.google.com/file/d/1HrKXKfB4i1Z5ZxkKM8SWCRUMLF_eoujr/view?usp=drive_link'
} else {
  alert('Unsupported operating system. Please use MacOS or Windows to download the installer.');
}

// Example usage

