import { replaceTo } from "../src/Router";
import { IComponentInOut } from "../src/type";

interface IProps extends IComponentInOut {}

Page3.initialPageProps = {
  page: "/page3",
};

Page3.getInitialProps = function () {
  return { title: "page3" };
};

export default function Page3(props: IProps) {
  return (
    <div
      className="layout"
      style={{ background: "purple", display: "flex", flexDirection: "column" }}
    >
      <div style={{ fontSize: "100px", textAlign: "center" }}>3</div>
      <br />
      <button onClick={() => replaceTo("/")} style={{ margin: "20px" }}>
        <div style={{ margin: "20px" }}>go page1 (replace)</div>
      </button>
    </div>
  );
}
