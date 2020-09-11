import { useRouter } from "next/router";
import { routeTo } from "../src/Router";

Index.initialPageProps = {
  page: "/",
};

Index.getInitialProps = function () {
  return { title: "page1" };
};

export default function Index(props) {
  const router = useRouter();
  return (
    <div
      className="layout"
      style={{ background: "red", display: "flex", flexDirection: "column" }}
    >
      <div style={{ fontSize: "100px", textAlign: "center" }}>1</div>
      <br />
      <button onClick={() => routeTo("/page2")} style={{ margin: "20px" }}>
        <div style={{ margin: "20px" }}>go page2</div>
      </button>
    </div>
  );
}
