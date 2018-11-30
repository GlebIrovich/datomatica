import React from 'react';
import FontAwesome from 'react-fontawesome';
import './UploadForm.css';

const UploadForm = () => (
  <form>
    <div id="drop-zone" className="text-center pt-2 pb-2 pl-2 pr-2 mb-3">
      <FontAwesome name="box-open" className="text-muted" />
      <p className="text-muted">
Just Drug and Drop you .CSV files
      </p>
    </div>

    <button type="submit" className="btn btn-dark-green green-button d-block mx-auto">
      Upload
    </button>
  </form>
);

export default UploadForm;
