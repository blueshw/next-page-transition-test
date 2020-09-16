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
  renderKey: string;
  page: React.ReactElement;
}

export type IPageStack = IPageStackItem[];
