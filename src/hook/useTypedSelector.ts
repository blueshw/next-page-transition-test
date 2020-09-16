import { useSelector, shallowEqual } from "react-redux";
import { useDebugValue } from "react";
import { IReduxState } from "../store";

export default function useTypedSelector<R>(
  selector: (state: IReduxState) => R
): R {
  const result = useSelector(selector, shallowEqual);
  useDebugValue(result);
  return result;
}
