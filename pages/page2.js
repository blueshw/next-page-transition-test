import { useRouter } from "next/router";
import { routeTo } from "../src/Router";

Page2.initialPageProps = {
  page: "/page2",
};

Page2.getInitialProps = function () {
  return { title: "page2" };
};

export default function Page2() {
  const router = useRouter();

  return (
    <div
      className="layout"
      style={{
        background: "yellowgreen",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: "100px", textAlign: "center" }}>2</div>
      <br />
      <button
        onClick={() => routeTo("/page3", "vertical")}
        style={{ margin: "20px" }}
      >
        <div style={{ margin: "20px" }}>go page3</div>
      </button>
    </div>
  );
}
