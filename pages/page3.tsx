import { replaceTo } from "../src/Router";
import usePageEntered from "../src/hook/usePageEntered";
import usePageExited from "../src/hook/usePageExited";
import { IComponentInOut } from "../src/type";

interface IProps extends IComponentInOut {}

Page3.initialPageProps = {
  page: "/page3",
};

export default function Page3(props: IProps) {
  usePageEntered(() => {
    console.log("====== entered page 3 ======");
  }, props);
  usePageExited(() => {
    console.log("====== exited page 3 ======");
  }, props);
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
