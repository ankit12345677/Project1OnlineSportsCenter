// react
import React, { useState, useEffect } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Moment from "react-moment";

// data stubs
import theme from "../../data/theme";
import CancelOrder from "./CancelOrder";
import { GetAccountDetail } from "../../services";

function AccountPageOrderProductDetails() {
  const [product, setOrderProduct] = useState([]);
  const { orderid, varientId } = useParams();
  const data = { orderId: orderid, varientId: varientId };
  useEffect(async () => {
    let canceled = false;
    const list = await GetAccountDetail.getCustomerProductDetail(data);
    if (list.code) {
      setOrderProduct(list.data);
      return () => {
        canceled = true;
      };
    }
  }, [orderid, varientId]);
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Order Details — ${theme.name}`}</title>
      </Helmet>

      <div className="card">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="dashboard-right">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-title-tab mt-2">
                      <h4>
                        <i className="uil uil-box" />
                        My Orders
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="pdpt-bg ItemDetails-itemDetailsView">
                      <div className="pdpt-title">
                        <h6>
                          Delivery Timing :{" "}
                          {product.deliveryDate ? (
                            <Moment format="MMMM Do YYYY hh:mm:ss">
                              <b>{product.deliveryDate}</b>
                            </Moment>
                          ) : (
                            ""
                          )}{" "}
                          as per your requested
                        </h6>
                      </div>
                      <Paper className="order-list-bk">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container>
                              <Grid item xs={3} sm={3} md={2} lg={2}>
                                <div className="CXW8mj">
                                  <img
                                    className="_396cs4 _3exPp9"
                                    alt=""
                                    src={product.thumbnail}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={4} sm={4} md={5} lg={5}>
                                <div className="item-name">
                                  <h5>
                                    <b>{product.name}</b>
                                  </h5>
                                  <h6>Brand: {product.brand}</h6>
                                  <h6>Size: {product.size}</h6>
                                  <h6>QTY: {product.qty}</h6>
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
                                <b>₹{Math.round(product.total)}</b>
                              </Grid>
                              <Grid item xs={3} sm={3} md={3} lg={3}>
                                <div className="cancel">
                                  <div className="dot-icon"></div>
                                  {product.status === "processing" ? (
                                    <span className="Text-Text">
                                      <b>{product.status}</b>
                                    </span>
                                  ) : product.status === "shipping" ? (
                                    <span>
                                      <b>{product.status}</b>
                                    </span>
                                  ) : product.status === "delivered" ? (
                                    <span className="text-success">
                                      <b>{product.status}</b>
                                    </span>
                                  ) : (
                                    <span className="text-danger">
                                      <b>{product.status}</b>
                                    </span>
                                  )}
                                  <div class="_30gI7w">
                                    As per your request, your item has been{" "}
                                    {product.status}
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                      <Paper className="order-list-bk">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="address">
                              <h5 title="t1">
                                <b>Shipping Address</b>
                              </h5>
                            </div>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div className="Address-nameNumber">
                              <h6>Name: {product.customerName}</h6>
                            </div>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div className="Address-nameNumber">
                              <span className="phone_email_vhs">
                                Phone: {product.phone}
                              </span>
                            </div>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div className="Address-nameNumber">
                              <span className="phone_email_vhs">
                                City: {product.city}
                              </span>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <span className="phone_email_vhs">
                              Shipping Address: {product.shipping}
                            </span>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Grid container>
                        <Grid className="mb-2" item lg={12}>
                          {product.status !== "cancelRequest" ? (
                            <CancelOrder />
                          ) : null}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="addressModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header border-bottom-0">
                <h5 class="modal-title">Cancel Order</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="cancellationReason-heading1">
                  Reason for cancellation
                </div>
                <div className="cancellationReason-reasonMessageOne">
                  Please tell us correct reason for cancellation. This
                  information is only used to improve our service
                </div>
                <div className="d-flex flex-column ">
                  <form noValidate>
                    <div className="login-wrap">
                      {/* Tab panes */}
                      <div className="row">
                        <div className="form-group col-sm-6 ">
                          <div className="RadioDropdown-reasonHeader">
                            <span>
                              SELECT REASON
                              <span class="RadioDropdown-required">*</span>
                            </span>
                          </div>
                          <select
                            className="form-control"
                            name="issue"
                            value={"1"}
                          >
                            <option selected>Select reason</option>
                            <option value="Delayed Delivery Cancellation">
                              Delayed Delivery Cancellation
                            </option>
                            <option value="B">Incorrect size ordered</option>
                            <option value="Incorrect size ordered">
                              Duplicate Order
                            </option>
                            <option value="Product not required anymore">
                              Product not required anymore
                            </option>
                            <option value="Cash Issue">Cash Issue</option>
                            <option value="Ordered by mistake">
                              Ordered by mistake
                            </option>
                            <option value="Wants to change style/color">
                              Wants to change style/color
                            </option>
                            <option value="Other reason">Other reason</option>
                          </select>
                        </div>
                        <div className="form-group col-sm-12">
                          <textarea
                            className="form-control"
                            placeholder="Enter comment"
                            rows="4"
                            name="comment"
                          ></textarea>
                        </div>
                      </div>
                      <div className="single-input-item">
                        <button
                          type="submit"
                          className="btn btn-sqr w-100 py-3"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  userData: state.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageOrderProductDetails);
