import { useEffect } from "react";

export default function usePageEntered(callback, props) {
  useEffect(() => {
    if (props.entered) {
      callback();
    }
  }, [props.entered]);
}
