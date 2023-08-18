// react
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
// third-party
import { Helmet } from "react-helmet-async";
import Addaddress from "../shared/Addaddress";
import { getCookie } from "../../function";
// data stubs
import theme from "../../data/theme";
import swal from "sweetalert";
import { GetAccountDetail, GetUserLogin } from "../../services";

// Define a function component named AccountPageAddresses
function AccountPageAddresses() {
   // Declare and initialize state variables
  const [userData, setUser] = useState({});
  const token = getCookie("token");
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
// Add a listener for the window resize event
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
// Fetch user data when the component mounts or when the token changes
  useEffect(async () => {
    if (token) {
      let userDetail = await GetUserLogin.getCustomerDetail(token);
      if (userDetail && userDetail.code === 200) {
        setUser(userDetail.data);
      }
    }
  }, [token]);
  // Define a function to handle the deletion of an address by ID
  const handlDeleteById = async (id) => {
    let data = { id: id };
    swal({
      title: "Are you sure?",
      text: `You want to Address list : ${id}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetAccountDetail.getDeleteProduct(data);
        if (value) {
          window.location.reload();
        }
      }
    });
  };
   // Render the list of addresses
  const addresses =
    userData && userData.Addresses && userData.Addresses.length
      ? userData.Addresses.map((address, index) => {
          return (
            <React.Fragment key={index}>
              <div className="addresses-list__item card address-card">
                {address.default && (
                  <div className="address-card__badge">Default</div>
                )}
                <div className="address-card__body">
                  <div className="address-card__name">{`${address.fullname}`}</div>
                  <div className="address-card__row">
                    {address.shipping}
                    <br />
                    {address.city}
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Phone Number</div>
                    <div className="address-card__row-content">
                      {address.phone}
                    </div>
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Email Address</div>
                    <div className="address-card__row-content">
                      {userData?.email}
                    </div>
                  </div>
                  <div className="address-card__footer">
                    {/* <Link to="/account/addresses/5">Edit</Link>
            &nbsp;&nbsp; */}
                    {/* <button>Remove</Link> */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handlDeleteById(address.id)}
                    >
                      <i className="far fa-trash-alt m-1"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="addresses-list__divider" />
            </React.Fragment>
          );
        })
      : null;

  return (
    <div className="addresses-list">
      <Helmet>
        <title>{`Address List — ${theme.name}`}</title>
      </Helmet>

      <div className="addresses-list__item addresses-list__item--new">
        <div className="addresses-list__plus" />
        <Addaddress />
      </div>
      <div className="addresses-list__divider" />
      {windowWidth > 763 ? (
        addresses
      ) : (
        <Grid container>
          <Grid item xs={12}>
            {addresses}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default AccountPageAddresses;
