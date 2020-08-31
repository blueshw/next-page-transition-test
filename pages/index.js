import { useRouter } from "next/router";
import { dispatchRouteEvent } from "../src/function";

Index.initialPageProps = {
  page: "/",
};

Index.getInitialProps = function () {
  return { title: "page1" };
};

export default function Index(props) {
  const router = useRouter();
  return (
    <div className="layout" style={{ background: "red" }}>
      여기는 page1입니다.
      <br />
      <button
        onClick={() => {
          dispatchRouteEvent({ action: "PUSH", url: "/page2" });
          router.push("/page2");
        }}
      >
        go page2
      </button>
    </div>
  );
}
