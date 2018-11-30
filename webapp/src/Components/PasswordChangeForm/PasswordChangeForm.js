import React from 'react';

const PasswordChangeForm = () => (
  <form>
    <div className="form-group row">
      <label htmlFor="inputOldPassword" className="col-sm-4 col-lg-2 col-form-label">
        Old Password
      </label>
      <div className="col-sm-8 col-md-6 col-lg-4">
        <input
          type="password"
          className="form-control"
          id="inputOldPassword"
          placeholder="Old Password"
        />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="inputNewPassword" className="col-sm-4 col-lg-2 col-form-label">
        New Password
      </label>
      <div className="col-sm-8 col-md-6 col-lg-4">
        <input
          type="password"
          className="form-control"
          id="inputNewPassword"
          placeholder="New Password"
        />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="inputRepeatPassword" className="col-sm-4 col-lg-2 col-form-label">
        Repeat Password
      </label>
      <div className="col-sm-8 col-md-6 col-lg-4">
        <input
          type="password"
          className="form-control"
          id="inputRepeatPassword"
          placeholder="New Password"
        />
      </div>
    </div>

    <div className="form-group row">
      <div className="col-sm-10">
        <button type="submit" className="btn btn-dark-green green-button">
          Save Changes
        </button>
      </div>
    </div>
  </form>
);

export default PasswordChangeForm;
