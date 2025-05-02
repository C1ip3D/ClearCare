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

// Example usage

