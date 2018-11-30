import React from 'react';

const Form = ({
  handleSubmit, handleValidation, handleInput, url,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="row">
      <label htmlFor="staticToken" className="col-sm-2 col-form-label">
        Store url
      </label>
      <div className="col-sm-10 col-lg-6">
        <input
          type="text"
          className={`form-control ${handleValidation()}`}
          id="staticToken"
          placeholder="https://www.example.com"
          value={url}
          onChange={handleInput}
        />
        <small id="emailHelp" className="form-text text-muted">
          Check the Docks to learn more about oAuth Tokens
        </small>
      </div>
    </div>
    <button type="submit" className="btn btn-dark-green green-button d-block mx-auto">
      Submit
    </button>
  </form>
);

export default Form;
