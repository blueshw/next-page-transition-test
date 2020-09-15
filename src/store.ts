// import { createStore } from "redux";

// export interface IReduxState: {}

export const IS_CLIENT = typeof window !== "undefined";

// const INITIAL_STATE = {
//   stack: [],
// };
// export const initStore = (initialState = INITIAL_STATE) => {
//   if (IS_CLIENT && pStore) {
//     return pStore;
//   }
//   pStore = createStore(reducer, initialState);
//   return pStore;
// };

// let pStore;

// const ActionType = {
//   AddPageStack: "AddPageStack",
//   ChangePageStack: "ChangePageStack",
//   RemovePageStack: "RemovePageStack",
// };

// export const actions = {
//   addPageStack: page => ({
//     type: ActionType.AddPageStack,
//     payload: { page },
//   }),
//   changePageStack: page => ({
//     type: ActionType.ChangePageStack,
//     payload: { page },
//   }),
//   removePageStack: () => ({
//     type: ActionType.RemovePageStack,
//   }),
// };

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case ActionType.AddPageStack:
//       return {
//         stack: [...state.stack, action.payload.page],
//       };
//     case ActionType.ChangePageStack:
//       if (state.stack.length > 0) {
//         const newStack = [...state.stack];
//         newStack.pop();
//         return {
//           stack: [...newStack, action.payload.page],
//         };
//       }
//       return state;
//     case ActionType.RemovePageStack:
//       if (state.stack.length > 0) {
//         const newStack = [...state.stack];
//         newStack.pop();
//         return {
//           stack: newStack,
//         };
//       }
//     default:
//       return state;
//   }
// }
