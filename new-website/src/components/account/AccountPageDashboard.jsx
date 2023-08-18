// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// data stubs
import theme from "../../data/theme";

function AccountPageDashboard(props) {
  // Extracting the user data from props
  const { userData } = props;

  // Creating a list of addresses, if available
  const AddressList =
    userData.user.code === 200 ? userData.user.data.Addresses : [];
   // Rendering the component
  return (
    <div className="dashboard">
        {/* Setting page metadata */}
      <Helmet>
        <title>{`My Account — ${theme.name}`}</title>
      </Helmet>
      
      {/* Displaying the user profile */}
      <div className="dashboard__profile card profile-card">
        <div className="card-body profile-card__body">
          <div className="profile-card__avatar">
            <img src="images/avatars/avatar-3.jpg" alt="" />
            <input type="file" id="file" />
            <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
          </div>
           {/* Displaying the user name */}
          <div className="profile-card__name">
            {userData && userData.user && userData.user.data
              ? userData.user.data.firstName + " " + userData.user.data.lastName
              : null}
          </div>
          {/* Displaying the user email */}
          <div className="profile-card__email">
            {userData && userData.user && userData.user.data
              ? userData.user.data.email
              : null}
          </div>
           {/* Link for editing the user profile */}
          <div className="profile-card__edit">
            <Link to="profile" className="btn btn-secondary btn-sm">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
        {/* Displaying the list of addresses */}
      {AddressList?.map((address, index) => (
        <div
          className="dashboard__address card address-card address-card--featured"
          key={index}
        >
          {/* Displaying a badge for default address, if applicable */}
          {/* {address.default && <div className="address-card__badge">Default Address</div>} */}
          {/* Displaying the address information */}
          <div className="address-card__body">
            <div className="address-card__name">{`${address.fullname}`}</div>
            <div className="address-card__row">
              {address.shipping}
              <br />
              {address.city}
              {/* ,
                                {address.city}
                                <br />
                                {address.address} */}
            </div>
            <div className="address-card__row">
              <div className="address-card__row-title">Phone Number</div>
              <div className="address-card__row-content">{address.phone}</div>
            </div>
            <div className="address-card__row">
              <div className="address-card__row-title">Email Address</div>
              <div className="address-card__row-content">
                {userData.user.data.email}
              </div>
               {/* Link for editing the address */}
            </div>
            <div className="address-card__footer">
              <Link to="/account/addresses/5">Edit Address</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.user,
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageDashboard);
