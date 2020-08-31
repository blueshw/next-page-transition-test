export function dispatchRouteEvent(detail) {
  if (window === undefined) {
    return;
  }
  window.dispatchEvent(new CustomEvent("onHistoryChange", { detail }));
}
