import React, { useRef, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Router } from "next/router";
import Page from "./Page";
import { NextComponent, IPageAppContext, IPageHandlerItem } from "./type";
import { IRouterInfo, RouteAction } from "./Router";
import useTypedSelector from "./hook/useTypedSelector";
import { useDispatch } from "react-redux";
import { actions } from "./store";

interface IProps {
  component: NextComponent;
  componentProps: any;
  router: Router;
  contextValue: IPageAppContext; // type.ts로 이도
}

export default function PageStack({
  router,
  component: pageComponent,
  componentProps,
}: IProps) {
  const dispatch = useDispatch();
  // 실제 컴포넌트를 쌓아두는 stack 변수
  const [
    pageStack,
    pageHandlerStack,
    activePosition,
  ] = useTypedSelector(state => [
    state.stack,
    state.handlerStack,
    state.activePosition,
  ]);

  // 각 Page의 페이지 전환 핸들러(ex. componentDidHide)를 담아두기 위한 변수
  // const pageHandlerStackRef = useRef<IPageHanderRef[]>([]);
  // 페이지 전환 정보 (action, url, direction)
  const pageTransition = useRef<IRouterInfo>();
  // 현재 추가하려는 페이지 handler
  const pageHandler = useRef<IPageHandlerItem>(null);

  // 최초 page 추가
  useEffect(() => {
    if (pageStack.length === 0) {
      const page = getPage({ route: router.route, pageComponent });
      dispatch(actions.addPage({ page }));
    }
  }, []);

  useEffect(() => {
    const handleHistoryChange = (e: any) => {
      // TODO: type
      // POP을 여기서 하는 이유는 history.back이 호출되었을 때, component는 바뀌지 않기 때문에 기다릴 필요가 없다.
      if (e.detail.action === RouteAction.Back) {
        dispatch(actions.changeActivePosition({ isForward: false }));
      } else if (e.detail.action === RouteAction.BrowserForward) {
        dispatch(actions.changeActivePosition({ isForward: true }));
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
      switch (action) {
        case "PUSH":
          if (url) {
            const page = getPage({
              route: url,
              pageComponent,
              direction,
            });
            dispatch(actions.addPage({ page }));
          }
          break;
        case "REPLACE":
          // replace에도 페이지 전환 애니메이션이 필요한지 모르겠다.
          // 만약 필요하다면, push하고 페이지 전환이 완료된 후 이전 페이지를 제거해야한다.
          if (url) {
            const page = getPage({
              route: url,
              pageComponent,
              isReplace: true,
            });
            dispatch(actions.changePage({ page }));
          }
          break;
        default:
          break;
      }
      pageTransition.current = undefined;
    }
  }, [pageComponent]);

  const getPage = ({
    route,
    pageComponent,
    direction = "horizontal",
    isReplace = false,
  }: {
    route: string;
    pageComponent: NextComponent;
    direction?: string;
    isReplace?: boolean;
  }) => {
    direction = pageStack.length === 0 ? "" : direction;
    const index = activePosition + 1;
    return (
      <CSSTransition
        key={`${index}_${route}`}
        classNames={direction}
        timeout={400}
        onEntered={() => onEntered()}
        onExited={() => onExited()}
        onEnter={onEnter}
        onExit={onExit}
      >
        <Page
          ref={pageHandler}
          pageComponent={pageComponent}
          componentProps={componentProps}
          route={route}
          pageIndex={index}
        />
      </CSSTransition>
    );
  };

  const onEnter = () => {
    const prevPageHandler = pageHandlerStack[activePosition];
    if (prevPageHandler && prevPageHandler.componentHide) {
      prevPageHandler.componentHide(true);
    }
  };
  const onExit = () => {
    const prevPage = pageHandlerStack[activePosition];
    if (prevPage && prevPage.componentEnter) {
      prevPage.componentEnter(true);
    }
  };

  const onEntered = () => {
    pageHandler.current &&
      dispatch(actions.addPageHandler(pageHandler.current));
    const prevPage = pageHandlerStack[activePosition - 1];
    if (prevPage) {
      prevPage.componentDidHide(true);
    }
    const currentPage = pageHandlerStack[activePosition];
    if (currentPage) {
      currentPage.componentDidEnter(false);
    }
  };
  const onExited = () => {
    const currentPage = pageHandlerStack[activePosition + 1];
    if (currentPage) {
      currentPage.componentDidHide(false);
    }
    const prevPage = pageHandlerStack[activePosition];
    if (prevPage) {
      prevPage.componentDidEnter(true);
      dispatch(actions.changeRemovePosition({ position: activePosition }));
    }
  };

  // TODO: 렌더링할때마다 계산하지 않도록 처리하자
  const pages = pageStack
    .filter((_, index) => index <= activePosition)
    .map(item => item.page);

  return <TransitionGroup>{pages}</TransitionGroup>;
}
