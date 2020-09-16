import { AppContext } from "next/app";
import { Store } from "redux";
import { IReduxState } from "./store";

export type NextComponent = AppContext["Component"];

export interface IPageAppContext {
  title: string;
}

export interface IComponentInOut {
  entered: boolean;
  exited: boolean;
}

export interface KStore extends Store<IReduxState> {}

export interface IPageStackItem {
  page: React.ReactElement;
}
export interface IPageHandlerItem {
  componentEnter: (isPrevious: boolean) => void;
  componentHide: (isPrevious: boolean) => void;
  componentDidEnter: (isPrevious: boolean) => void;
  componentDidHide: (isPrevious: boolean) => void;
  getPageName: () => string;
  pageIndex: number;
}
