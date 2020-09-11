import router from "next/router";

let currentHistoryPosition = 0;

export function routeTo(url, direction) {
  const pos = ++currentHistoryPosition;
  router.push(url, url, { pos });
  dispatchRouteEvent({ action: "PUSH", url, direction });
}

export function replaceTo(url) {
  router.replace(url, url, { pos: currentHistoryPosition });
  dispatchRouteEvent({ action: "REPLACE", url, direction: "" });
}

export function routeBack() {
  --currentHistoryPosition;
  router.back();
}

export function processBeforePopState({ url, options }) {
  const pos = options.pos || 0;
  if (currentHistoryPosition > pos) {
    // back
    --currentHistoryPosition;
    dispatchRouteEvent({ action: "POP" });
  } else if (currentHistoryPosition < pos) {
    // forward
    ++currentHistoryPosition;
    // index만 변경하는 action
    dispatchRouteEvent({ action: "FORWARD" });
  }
  return true;
}

function dispatchRouteEvent(detail) {
  if (window === undefined) {
    return;
  }
  window.dispatchEvent(new CustomEvent("onHistoryChange", { detail }));
}
