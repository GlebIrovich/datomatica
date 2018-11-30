import React from 'react';

const ActiveStore = ({ storeUrl, handleReset }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-sm-3 col-lg-4 font-weight-bold">
Connected Store:
      </div>
      <span className="col-sm-10 col-lg-6 align-middle">
        {storeUrl}
      </span>
    </div>
    <button
      onClick={handleReset}
      type="button"
      className="mt-2 btn btn-dark-green green-button d-block mx-auto"
    >
      Reset
    </button>
  </React.Fragment>
);

export default ActiveStore;
