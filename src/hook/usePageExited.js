import { useEffect } from "react";

export default function usePageExited(callback, props) {
  useEffect(() => {
    if (props.exited) {
      callback();
    }
  }, [props.exited]);
}
