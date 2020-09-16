import { createStore, compose } from "redux";
import { KStore, IPageHandlerItem, IPageStackItem } from "./type";
export interface IReduxState {
  stack: IPageStackItem[];
  handlerStack: IPageHandlerItem[];
  removePosition: number;
  activePosition: number;
}

export const IS_CLIENT = typeof window !== "undefined";

const INITIAL_STATE: IReduxState = {
  stack: [],
  handlerStack: [],
  removePosition: -1,
  activePosition: -1,
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
  AddPage: "AddPage",
  ChangePage: "ChangePage",
  // RemovePage: "RemovePage",
  ChangeActivePosition: "ChangeActivePosition",
  ChangeRemovePosition: "ChangeRemovePosition",
  AddPageHandler: "AddPageHandler",
};

export const actions = {
  addPage: (item: IPageStackItem) => ({
    type: ActionType.AddPage,
    payload: { item },
  }),
  changePage: (item: IPageStackItem) => ({
    type: ActionType.ChangePage,
    payload: { item },
  }),
  // removePage: () => ({
  //   type: ActionType.RemovePage,
  // }),
  changeActivePosition: ({ isForward }: { isForward: boolean }) => ({
    type: ActionType.ChangeActivePosition,
    payload: { isForward },
  }),
  changeRemovePosition: ({ position }: { position: number }) => ({
    type: ActionType.ChangeRemovePosition,
    payload: { position },
  }),
  addPageHandler: (item: IPageHandlerItem) => ({
    type: ActionType.AddPageHandler,
    payload: { item },
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
    case ActionType.AddPage:
      // activeStack 이후의 page는 잘라낸다.
      const newStack = state.stack.slice(0, state.activePosition + 1);
      return {
        ...state,
        stack: [...newStack, action.payload.item],
        activePosition: state.activePosition + 1,
      };
    case ActionType.ChangePage:
      if (state.stack.length > 0) {
        const newStack = [...state.stack];
        newStack.pop();
        return {
          ...state,
          stack: [...newStack, action.payload.item],
        };
      }
      return state;
    case ActionType.ChangeActivePosition:
      const { isForward } = action.payload;
      const lastPosition = state.stack.length - 1;
      const currentActivePosition = state.activePosition;
      if (
        (isForward && currentActivePosition === lastPosition) ||
        (!isForward && lastPosition === 0)
      ) {
        return state;
      } else {
        return {
          ...state,
          activePosition: isForward
            ? currentActivePosition + 1
            : currentActivePosition - 1,
        };
      }
    case ActionType.ChangeRemovePosition:
      const { position } = action.payload;
      return {
        ...state,
        removePosition: position,
      };
    case ActionType.AddPageHandler:
      // activeStack 이후의 page는 잘라낸다.
      const newHandlerStack = state.handlerStack.slice(
        0,
        state.removePosition + 1
      );
      return {
        ...state,
        handlerStack: [...newHandlerStack, action.payload.item],
        removePosition: state.removePosition + 1,
      };
    default:
      return state;
  }
}
