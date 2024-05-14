const SubLoader = () => {
  return (
    <div>
      <div
        className="spinner-border text-secondary"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          left: "40%",
          top: "50%",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SubLoader;
