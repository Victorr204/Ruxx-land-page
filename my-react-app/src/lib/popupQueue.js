/* ──────────────────────────────────────────────────────────────
   Modal-ad ordering for the site.

   Priority:
     1. Ruxx Prepaid fundraiser popup  (FundraiserPopup)
     2. regular advert popup           (AdPopup)

   AdPopup subscribes to FUNDRAISER_POPUP_DONE_EVENT and only arms
   its timers once the fundraiser popup has been closed, so the two
   never appear on screen at the same time.
   ────────────────────────────────────────────────────────────── */

export const FUNDRAISER_POPUP_KEY = "ruxx-fundraiser-popup-dismissed";
export const FUNDRAISER_POPUP_DONE_EVENT = "ruxx-fundraiser-popup-done";

/** Has the fundraiser popup already been closed in this session? */
export function isFundraiserPopupPending() {
  try {
    return sessionStorage.getItem(FUNDRAISER_POPUP_KEY) !== "1";
  } catch {
    // storage unavailable — don't hold the other popup hostage
    return false;
  }
}

/** Close-out hook: persist the dismissal and release the next popup. */
export function markFundraiserPopupDone() {
  try {
    sessionStorage.setItem(FUNDRAISER_POPUP_KEY, "1");
  } catch {
    // storage unavailable — still release the next popup
  }
  window.dispatchEvent(new CustomEvent(FUNDRAISER_POPUP_DONE_EVENT));
}
