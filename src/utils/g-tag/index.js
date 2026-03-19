export const trackEvent = (action, params = {}) => {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, params);
};
