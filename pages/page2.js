import { useRouter } from "next/router";
import { dispatchRouteEvent } from "../src/function";

Page2.initialPageProps = {
  page: "/page2",
};

Page2.getInitialProps = function () {
  return { title: "page2" };
};

export default function Page2() {
  const router = useRouter();

  return (
    <div className="layout" style={{ background: "yellowgreen" }}>
      여기는 page1입니다.
      <br />
      <button
        onClick={() => {
          dispatchRouteEvent({
            action: "PUSH",
            url: "/page3",
            direction: "vertical",
          });
          router.push("/page3");
        }}
      >
        go page3
      </button>
    </div>
  );
}
