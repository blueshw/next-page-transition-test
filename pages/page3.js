import { useRouter } from "next/router";
import { dispatchRouteEvent } from "../src/function";

Page3.initialPageProps = {
  page: "/page3",
};

export default function Page3() {
  const router = useRouter();
  return (
    <div className="layout" style={{ background: "purple" }}>
      여기는 page3입니다.
      <br />
      <button
        onClick={() => {
          dispatchRouteEvent({ action: "REPLACE", url: "/" });
          router.replace("/");
        }}
      >
        go page1 (replace)
      </button>
    </div>
  );
}
