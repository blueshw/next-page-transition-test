import { routeTo } from "../src/Router";
import usePageEntered from "../src/hook/usePageEntered";
import usePageExited from "../src/hook/usePageExited";
import { IComponentInOut } from "../src/type";

interface IProps extends IComponentInOut {}

Index.initialPageProps = {
  page: "/",
};

Index.getInitialProps = function () {
  return { title: "page1" };
};

export default function Index(props: IProps) {
  // useEffect(() => {
  //   return () => {
  //     console.log("out index page");
  //   };
  // }, []);
  usePageEntered(() => {
    console.log("====== entered page 1 ======");
  }, props);
  usePageExited(() => {
    console.log("====== exited page 1 ======");
  }, props);

  return (
    <div
      className="layout"
      style={{ background: "red", display: "flex", flexDirection: "column" }}
    >
      <div style={{ overflow: "auto", width: "100%" }}>
        <div style={{ fontSize: "100px", textAlign: "center" }}>1</div>
        <br />
        <button onClick={() => routeTo("/page2")} style={{ margin: "20px" }}>
          <div style={{ margin: "20px" }}>go page2</div>
        </button>
      </div>
    </div>
  );
}
