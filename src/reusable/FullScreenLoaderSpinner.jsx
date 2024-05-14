import { forwardRef } from "react";

const FullScreenLoaderSpinner = (props, ref) => {
  return (
    <div
      className="loader-div"
      ref={ref}
      style={{
        display: "block",
        position: "fixed",
        margin: "0px",
        padding: "0px",
        right: "0px",
        top: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        zIndex: 30001,
        opacity: 0.8,
      }}
    >
      <div
        className="spinner-border"
        role="status"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default forwardRef(FullScreenLoaderSpinner);
