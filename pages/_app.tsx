import App from "next/app";
import "../src/style.css";
import PageStack from "../src/PageStack";
import { processBeforePopState } from "../src/Router";
import { IPageAppContext, KStore } from "../src/type";
import { Provider } from "react-redux";
import { initStore } from "../src/store";
import withRedux from "next-redux-wrapper";

interface IProps {
  contextValue: IPageAppContext;
  pageProps: object;
  lang: string;
  store: KStore;
}

class CustomApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }) {
    const props = {
      pageProps: {},
    };
    const contextValue = Component.initialPageProps;
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx);
      props.pageProps = pageProps;
    }

    return { ...props, store: ctx.store, contextValue };
  }

  componentDidMount() {
    const { router } = this.props;
    router.beforePopState(processBeforePopState);
  }

  render() {
    const { Component, pageProps, router, contextValue, store } = this.props;
    return (
      <Provider store={store}>
        <PageStack
          router={router}
          component={Component}
          componentProps={pageProps}
          contextValue={contextValue}
        />
      </Provider>
    );
  }
}

export default withRedux(initStore)(CustomApp);
