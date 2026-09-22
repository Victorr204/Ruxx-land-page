export const ADSENSE_CLIENT = "ca-pub-9942550938838021";
export const ADSENSE_SLOT = "6517153876";

export const AD_CONSENT_EVENT = "ruxx-consent";

export function hasAdConsent() {
  return typeof window !== "undefined" && window.localStorage.getItem("ruxx-cookie-consent") === "accepted";
}