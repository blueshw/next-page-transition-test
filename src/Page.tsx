import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  Ref,
} from "react";
import useTypedSelector from "./hook/useTypedSelector";
import { IPageHandlerItem, NextComponent } from "./type";

interface IProps {
  pageComponent: NextComponent;
  componentProps: any; // TODO: type
  route: string;
  pageIndex: number;
}

function Page(
  { pageComponent, componentProps, route, pageIndex }: IProps,
  ref: Ref<IPageHandlerItem>
) {
  const maskRef = useRef<HTMLDivElement>(null);
  const [activePosition, removePosition] = useTypedSelector(state => [
    state.activePosition,
    state.removePosition,
  ]);
  const componentEnter = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem && elem.classList.add("off");
    }
  };
  const componentHide = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem && elem.classList.add("on");
    }
  };
  const componentDidEnter = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem && elem.classList.remove("off");
    }
  };
  const componentDidHide = (isPrevious: boolean) => {
    if (isPrevious) {
      const elem = maskRef.current;
      elem && elem.classList.remove("on");
    }
  };
  const getPageName = () => {
    return componentProps.title;
  };

  useImperativeHandle(ref, () => ({
    componentEnter,
    componentHide,
    componentDidEnter,
    componentDidHide,
    getPageName,
    pageIndex,
  }));

  if (pageIndex !== activePosition && pageIndex !== removePosition) {
    return null;
  }

  const maskClass = pageIndex < removePosition ? "mask-back" : "mask";

  const Component = pageComponent;
  return (
    <>
      <Component {...componentProps} key={route} />
      <div className={maskClass} ref={maskRef} />
    </>
  );
}

export default forwardRef(Page);
