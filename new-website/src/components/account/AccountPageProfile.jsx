// react
import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";

// third-party
import { Helmet } from "react-helmet-async";
import { GetUserLogin } from "../../services";
import { getCookie } from "../../function";
// data stubs
import theme from "../../data/theme";

function AccountPageProfile() {
  const [user, setUser] = useState({});
  const token = getCookie("token");
  useEffect(async () => {
    if (token) {
      let userDetail = await GetUserLogin.getCustomerDetail(token);
      if (userDetail && userDetail.code === 200) {
        setUser(userDetail.data);
      }
    }
  }, [token]);
  return (
    <div className="card">
      <Helmet>
        <title>{`Profile — ${theme.name}`}</title>
      </Helmet>

      <div className="card-header">
        <h5>Edit Profile</h5>
      </div>
      <div className="card-divider" />
      <ProfileUpdate userData={user} />
    </div>
  );
}

function ProfileUpdate({ userData }) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
  });
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // display form data on success
    setLoading(true);
    const dataList = {
      firstName: inputValue?.firstName,
      lastName: inputValue?.lastName,
      phone: inputValue?.phone,
    };
    let userList = await GetUserLogin.getCustomerUpdate(dataList);
    if (userList.success) {
      NotificationManager.success(userList.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="card-body">
      <div className="row no-gutters">
        <div className="col-12 col-lg-7 col-xl-6">
          <div className="form-group">
            <label htmlFor="profile-first-name">First Name</label>
            <input
              id="profile-first-name"
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              defaultValue={userData?.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile-last-name">Last Name</label>
            <input
              id="profile-last-name"
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              defaultValue={userData?.lastName}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile-email">Email Address</label>
            <input
              id="profile-email"
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={userData?.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile-phone">Phone Number</label>
            <input
              id="profile-phone"
              type="text"
              className="form-control"
              placeholder="Phone Number"
              name="phone"
              defaultValue={userData?.phone}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm pl-2"></span>
              )}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountPageProfile;
