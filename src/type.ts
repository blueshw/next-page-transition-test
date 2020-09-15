import { AppContext } from "next/app";

export type NextComponent = AppContext["Component"];

export interface IPageAppContext {
  title: string;
}

export interface IComponentInOut {
  entered: boolean;
  exited: boolean;
}
