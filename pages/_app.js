import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../src/store";
import "../src/style.css";
import PageStack from "../src/PageStack";
import { processBeforePopState } from "../src/Router";

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    console.log("Component", Component);
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
