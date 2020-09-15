import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  Ref,
} from "react";
import { NextComponent } from "./type";

interface IProps {
  pageComponent: NextComponent;
  componentProps: any; // TODO: type
  route: string;
}

function Page(
  { pageComponent, componentProps, route }: IProps,
  ref: Ref<IPageHanderRef>,
) {
  const maskRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [exited, setExited] = useState(false);
  const componentEnter = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      if (elem) {
        elem.classList.remove("on");
        elem.classList.add("off");
      }
    } else {
    }
  };
  const componentHide = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem && elem.classList.add("on");
    } else {
    }
  };
  const componentDidEnter = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem && elem.classList.remove("off");
    }
    setEntered(true);
    setExited(false);
  };
  const componentDidHide = (isPrevious: boolean) => {
    if (isPrevious) {
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

  const Component = pageComponent;
  const props = { ...componentProps, entered, exited };
  return (
    <>
      <Component {...props} key={route} />
      <div className="mask" ref={maskRef} />
    </>
  );
}

export default forwardRef(Page);

export interface IPageHanderRef {
  componentEnter: (isPrevious: boolean) => void;
  componentHide: (isPrevious: boolean) => void;
  componentDidEnter: (isPrevious: boolean) => void;
  componentDidHide: (isPrevious: boolean) => void;
  getPageName: () => string;
}
