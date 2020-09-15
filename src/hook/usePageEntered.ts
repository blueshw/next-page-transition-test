import { useEffect } from "react";

export default function usePageEntered(
  callback: () => void,
  props: { entered: boolean },
) {
  useEffect(() => {
    if (props.entered) {
      callback();
    }
  }, [props.entered]);
}
