import router from "next/router";

let currentHistoryPosition = 0;

export function routeTo(url: string, direction: string = "horizontal") {
  const pos = ++currentHistoryPosition;
  router.push(url, url, { pos });
  dispatchRouteEvent({ action: RouteAction.Push, url, direction });
}

export function replaceTo(url: string) {
  router.replace(url, url, { pos: currentHistoryPosition });
  dispatchRouteEvent({ action: RouteAction.Replace, url, direction: "" });
}

export function routeBack() {
  --currentHistoryPosition;
  router.back();
}

export function processBeforePopState({
  options,
}: {
  options: { pos?: number };
}) {
  const pos = options.pos || 0;
  if (currentHistoryPosition > pos) {
    // back
    --currentHistoryPosition;
    dispatchRouteEvent({ action: RouteAction.Pop });
  } else if (currentHistoryPosition < pos) {
    // forward
    ++currentHistoryPosition;
    // index만 변경하는 action
    dispatchRouteEvent({ action: RouteAction.Forward });
  }
  return true;
}

function dispatchRouteEvent(detail: IRouterInfo) {
  if (window === undefined) {
    return;
  }
  window.dispatchEvent(new CustomEvent("onHistoryChange", { detail }));
}
export interface IRouterInfo {
  action: RouteAction;
  url?: string;
  direction?: string;
}

export enum RouteAction {
  Push = "PUSH",
  Replace = "REPLACE",
  Forward = "FORWARD",
  Pop = "POP",
}
