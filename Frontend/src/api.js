// Get API URL from environment variable or use default
const getApiUrl = () => {
  // For production (Render), use the environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For local development
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  
  // Fallback - this should not happen in production
  console.warn('API_URL not configured! Using localhost as fallback.');
  return 'http://localhost:5000';
};

export const API_URL = getApiUrl();

console.log('API URL configured as:', API_URL);
