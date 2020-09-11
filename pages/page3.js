import { useRouter } from "next/router";
import { replaceTo } from "../src/Router";

Page3.initialPageProps = {
  page: "/page3",
};

export default function Page3() {
  const router = useRouter();
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
