import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

function Page(props, ref) {
  const maskRef = useRef();
  const [entered, setEntered] = useState(false);
  const [exited, setExited] = useState(false);
  const componentEnter = isPrevious => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem.classList.remove("on");
      elem.classList.add("off");
    } else {
    }
  };
  const componentHide = isPrevious => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem.classList.add("on");
    } else {
    }
  };
  const componentDidEnter = isPrevious => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem.classList.remove("off");
    } else {
    }
    setEntered(true);
    setExited(false);
  };
  const componentDidHide = isPrevious => {
    if (isPrevious) {
    } else {
    }
    setEntered(false);
    setExited(true);
  };
  const getPageName = () => {
    return props.componentProps.title;
  };

  useImperativeHandle(ref, () => ({
    componentEnter,
    componentHide,
    componentDidEnter,
    componentDidHide,
    getPageName,
  }));

  const componentProps = { ...props.componentProps, entered, exited };
  return (
    <>
      {React.createElement(props.pageComponent, componentProps)}
      <div className="mask" ref={maskRef} />
    </>
  );
}

export default forwardRef(Page);
