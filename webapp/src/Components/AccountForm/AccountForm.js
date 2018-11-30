import React from 'react';
import PropTypes from 'prop-types';

const AccountForm = ({ user }) => (
  <form>
    <div className="form-group row">
      <label htmlFor="inputUsername" className="col-sm-3 col-lg-2 col-form-label">
        Username
      </label>
      <div className="col-sm-9 col-md-6 col-lg-4">
        <input type="text" className="form-control" id="inputUsername" value={user.username} />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="inputName" className="col-sm-3 col-lg-2 col-form-label">
        Name
      </label>
      <div className="col-sm-9 col-md-6 col-lg-4">
        <input type="text" className="form-control" id="inputName" value={user.name} />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="inputLastName" className="col-sm-3 col-lg-2 col-form-label">
        Last Name
      </label>
      <div className="col-sm-9 col-md-6 col-lg-4">
        <input type="text" className="form-control" id="inputLastName" value={user.lastName} />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="inputEmail" className="col-sm-3 col-lg-2 col-form-label">
        Email
      </label>
      <div className="col-sm-9 col-md-6 col-lg-4">
        <input type="email" className="form-control" id="inputEmail" value={user.email} />
        <small id="emailHelp" className="form-text text-muted">
          We&apos;ll never share your email with anyone else.
        </small>
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

AccountForm.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool,
  }).isRequired,
};

export default AccountForm;
