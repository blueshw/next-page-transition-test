import { routeTo } from "../src/Router";
import { useEffect } from "react";
import usePageEntered from "../src/hook/usePageEntered";
import usePageExited from "../src/hook/usePageExited";

Index.initialPageProps = {
  page: "/",
};

Index.getInitialProps = function () {
  return { title: "page1" };
};

export default function Index(props) {
  useEffect(() => {
    console.log("mount index page");
    return () => {
      console.log("out index page");
    };
  }, []);
  usePageEntered(() => {
    console.log("entered!!!!!!!!!!!!!!!!!!!");
  }, props);
  usePageExited(() => {
    console.log("!!!!!!!!!!!!!!!!!!!exited");
  }, props);

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
