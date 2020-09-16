import { createStore, compose } from "redux";
import { KStore, IPageStack, IPageStackItem } from "./type";
export interface IReduxState {
  stack: IPageStack;
}

export const IS_CLIENT = typeof window !== "undefined";

const INITIAL_STATE: IReduxState = {
  stack: [],
};
export const initStore = (initialState = INITIAL_STATE): KStore => {
  if (IS_CLIENT && kStore) {
    return kStore;
  }
  const composeEnhancers =
    (IS_CLIENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  kStore = createStore(reducer, initialState, composeEnhancers());
  return kStore;
};

let kStore: KStore;

const ActionType = {
  AddPageStack: "AddPageStack",
  ChangePageStack: "ChangePageStack",
  RemovePageStack: "RemovePageStack",
};

export const actions = {
  addPageStack: (item: IPageStackItem) => ({
    type: ActionType.AddPageStack,
    payload: { item },
  }),
  changePageStack: (item: IPageStackItem) => ({
    type: ActionType.ChangePageStack,
    payload: { item },
  }),
  removePageStack: () => ({
    type: ActionType.RemovePageStack,
  }),
};

interface ITypedAction<T extends string, P> {
  type: T;
  payload: P;
}

function reducer(
  state: IReduxState = INITIAL_STATE,
  action: ITypedAction<string, any> // TODO: type
) {
  switch (action.type) {
    case ActionType.AddPageStack:
      return {
        stack: [...state.stack, action.payload.item],
      };
    case ActionType.ChangePageStack:
      if (state.stack.length > 0) {
        const newStack = [...state.stack];
        newStack.pop();
        return {
          stack: [...newStack, action.payload.item],
        };
      }
      return state;
    case ActionType.RemovePageStack:
      if (state.stack.length > 0) {
        const newStack = [...state.stack];
        newStack.pop();
        return {
          stack: newStack,
        };
      }
    default:
      return state;
  }
}
