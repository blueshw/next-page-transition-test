import { routeTo } from "../src/Router";
import usePageEntered from "../src/hook/usePageEntered";
import usePageExited from "../src/hook/usePageExited";
import { IComponentInOut } from "../src/type";

interface IProps extends IComponentInOut {}

Page2.initialPageProps = {
  page: "/page2",
};

Page2.getInitialProps = function () {
  return { title: "page2" };
};

export default function Page2(props: IProps) {
  usePageEntered(() => {
    console.log("====== entered page 2 ======");
  }, props);
  usePageExited(() => {
    console.log("====== exited page 2 ======");
  }, props);
  return (
    <div
      className="layout"
      style={{
        background: "yellowgreen",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ overflow: "auto", width: "100%" }}>
        <div style={{ fontSize: "100px", textAlign: "center" }}>2</div>
        <br />
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
          <li>1234</li>
        </ul>
        <button
          onClick={() => routeTo("/page3", "vertical")}
          style={{ margin: "20px" }}
        >
          <div style={{ margin: "20px" }}>go page3</div>
        </button>
      </div>
    </div>
  );
}
