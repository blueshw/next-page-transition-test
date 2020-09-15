import App from "next/app";
import "../src/style.css";
import PageStack from "../src/PageStack";
import { processBeforePopState } from "../src/Router";
import { IPageAppContext } from "../src/type";

interface IProps {
  contextValue: IPageAppContext;
  pageProps: object;
  lang: string;
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
    const { Component, pageProps, router, contextValue } = this.props;
    return (
      <PageStack
        router={router}
        component={Component}
        componentProps={pageProps}
        contextValue={contextValue}
      />
    );
  }
}

export default CustomApp;
