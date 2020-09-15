import { useEffect } from "react";

export default function usePageExited(
  callback: () => void,
  props: { exited: boolean },
) {
  useEffect(() => {
    if (props.exited) {
      callback();
    }
  }, [props.exited]);
}
