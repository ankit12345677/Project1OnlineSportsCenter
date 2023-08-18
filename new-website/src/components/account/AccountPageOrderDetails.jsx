// react
import React, { useState, useEffect } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Paper, Grid } from "@material-ui/core";
import { GetAccountDetail } from "../../services";
// data stubs
import theme from "../../data/theme";
export default function AccountPageOrderDetails() {
  const [OrderProduct, setOrderProduct] = useState([]);
  const { orderId } = useParams();
  const data = { orderId: orderId };
  useEffect(async () => {
    let canceled = false;
    const list = await GetAccountDetail.getCustomerOrderedProduct(data);
    if (list.code) {
      setOrderProduct(list.data);
      return () => {
        canceled = true;
      };
    }
  }, [orderId]);
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Order Details — ${theme.name}`}</title>
      </Helmet>

      <div className="card">
        <div className="order-header">
          <div className="order-header__actions">
            <Link to="/account/orders" className="btn btn-xs btn-secondary">
              Back to list
            </Link>
          </div>
          <h5 className="order-header__title">showing All Orders</h5>
        </div>
        <div className="card-divider" />
        <div className="card-table">
          <div className="row">
            <div className="col-md-12">
              <div className="main-title-tab">
                <h4>
                  <i className="uil uil-box" />
                </h4>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-md-12">
              <div class="order-list-tabel-main table-responsive p-2">
                {OrderProduct?.map((row, index) => (
                  <Paper className="order-list-bk" key={index}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                          <Link
                            to={{
                              pathname: `/account/orders/details/${row.id}`,
                            }}
                          >
                            <Grid item xs={2} sm={2} md={3} lg={3}>
                              <div className="CXW8mj">
                                <img
                                  className="_396cs4 _3exPp9"
                                  alt=""
                                  src={row.thumbnail}
                                />
                              </div>
                            </Grid>
                          </Link>
                          <Grid item xs={3} sm={3} md={5} lg={5}>
                            <div className="item-name pl-2">
                              <h5>
                                <Link
                                  to={{
                                    pathname: `/account/orders/details/${orderId}/${row.id}`,
                                  }}
                                >
                                  <b>{row.name}</b>
                                </Link>
                              </h5>
                              <h6>Brand: {row.brand}</h6>
                              <h6>Size: {row.size}</h6>
                              <h6>QTY: {row.qty}</h6>
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={2}
                            className="text-center"
                          >
                            <b>₹{Math.round(row.total)}</b>
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3}>
                            <div className="cancel">
                              <div className="dot-icon"></div>
                              {row.status === "processing" ? (
                                <span className="Text-Text">
                                  <b>{row.status}</b>
                                </span>
                              ) : row.status === "shipping" ? (
                                <span>
                                  <b>{row.status}</b>
                                </span>
                              ) : row.status === "delivered" ? (
                                <span className="text-success">
                                  <b>{row.status}</b>
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <b>{row.status}</b>
                                </span>
                              )}
                              <div class="_30gI7w">
                                As per your request, your item has been{" "}
                                {row.status}
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
