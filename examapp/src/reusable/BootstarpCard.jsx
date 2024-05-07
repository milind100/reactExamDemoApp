const BootstarpCard = ({ children }) => {
  return (
    <div>
      <div className="container  mx-auto ">
        <div className="col-12 col-sm-12 col-xl-7 mx-auto">
          <div className="card shadow-2-strong card-registration shadow-lg p-2 mb-5 bg-body rounded">
            <div className="card-body p-2 p-md-5">{children}</div>
            {/* //Childrens are here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstarpCard;
