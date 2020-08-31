import React, { useRef, useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import Page from "./Page";

export default function PageStack(props) {
  const { component, componentProps } = props;
  // 각 Page의 페이지 전환 핸들러(ex. componentDidHide)를 담아두기 위한 변수
  const pageHandlerStackRef = useRef([]);
  // 실제 컴포넌트를 쌓아두는 stack 변수
  const [pageStack, setPageStack] = useState([]);
  const router = useRouter();
  // 페이지 전환 정보 (action, url, direction)
  const pageTransition = useRef();
  // 현재 추가하려는 페이지 정보
  const currentPageRef = useRef();

  // 최초 page 추가
  useEffect(() => {
    setPageStack([getPage(router.route, component)]);
  }, []);

  useEffect(() => {
    const handleHistoryChange = e => {
      // POP을 여기서 하는 이유는 history.back이 호출되었을 때, component는 바뀌지 않기 때문에 기다릴 필요가 없다.
      if (e.detail.action === "POP") {
        const newPageStack = [...pageStack];
        newPageStack.pop();
        setPageStack(newPageStack);
      } else {
        pageTransition.current = e.detail;
      }
    };
    window.addEventListener("onHistoryChange", handleHistoryChange);
    return () => {
      window.removeEventListener("onHistoryChange", handleHistoryChange);
    };
  }, [pageStack]);

  useEffect(() => {
    if (pageTransition.current) {
      const { action, url, direction } = pageTransition.current;
      const newPageStack = [...pageStack];
      switch (action) {
        case "PUSH":
          newPageStack.push(getPage(url, component, direction));
          break;
        // TODO: POP이 나눠져 있는게 이상하다.
        // case "POP":
        //   newPageStack.pop();
        //   break;
        case "REPLACE":
          // TODO: page3에서 index 페이지로 replace 요청하는데, page2로 이동한다. 이유를 찾아보자.
          // replace에도 페이지 전환 애니메이션이 필요한지 모르겠다.
          // 만약 필요하다면, push하고 페이지 전환이 완료된 후 이전 페이지를 제거해야한다.
          newPageStack.pop();
          newPageStack.push(getPage(url, component, direction));
          break;
        default:
          break;
      }
      setPageStack(newPageStack);
      pageTransition.current = null;
    }
  }, [component]);

  const getPage = (route, pageComponent, direction = "horizontal") => {
    direction = pageStack.length === 0 ? "" : direction;
    const page = () => (
      <Page
        ref={currentPageRef}
        pageComponent={pageComponent}
        componentProps={componentProps}
      />
    );
    return (
      <CSSTransition
        key={route}
        classNames={direction}
        timeout={1000}
        onEntered={onEntered}
        onExited={() => onExited(component)}
        onEnter={onEnter}
        onExit={onExit}
      >
        {page}
      </CSSTransition>
    );
  };

  const onEnter = () => {
    const pageHandlerStack = pageHandlerStackRef.current;
    const prevPage = pageHandlerStack[pageHandlerStack.length - 1];
    if (prevPage && prevPage.componentHide) {
      prevPage.componentHide(true);
    }
  };
  const onExit = () => {
    const pageHandlerStack = pageHandlerStackRef.current;
    const prevPage = pageHandlerStack[pageHandlerStack.length - 2];
    if (prevPage && prevPage.componentEnter) {
      prevPage.componentEnter(true);
    }
  };

  const onEntered = () => {
    const pageHandlerStack = pageHandlerStackRef.current;
    pageHandlerStack.push(currentPageRef.current);
    currentPageRef.current = null;
    const prevPage = pageHandlerStack[pageHandlerStack.length - 2];
    if (prevPage && prevPage.componentDidHide) {
      prevPage.componentDidHide(true);
    }
  };

  const onExited = component => {
    const pageHandlerStack = pageHandlerStackRef.current;
    pageHandlerStack.splice(pageHandlerStack.indexOf(component), 1);
    const topComponent = pageHandlerStack[pageHandlerStack.length - 1];
    if (topComponent && topComponent.componentDidEnter) {
      topComponent.componentDidEnter(true);
    }
  };

  return <TransitionGroup>{pageStack}</TransitionGroup>;
}
