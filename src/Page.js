import React, { forwardRef, useImperativeHandle, useRef } from "react";

function Page(props, ref) {
  const maskRef = useRef();
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
  };
  const componentDidHide = () => {};

  useImperativeHandle(ref, () => ({
    componentEnter,
    componentHide,
    componentDidEnter,
    componentDidHide,
  }));
  return (
    <>
      {React.createElement(props.pageComponent, props.componentProps)}
      <div className="mask" ref={maskRef} />
    </>
  );
}

export default forwardRef(Page);
