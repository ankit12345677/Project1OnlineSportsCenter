import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Moment from "react-moment";
import Changestatus from "../change-status";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      status: this.props.location.state.status,
      deliverydate: "",
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    let self = this.props.location.state;
    return (
      <div>
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Orders</h2>
              </div>
              <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                <Button variant="contained" onClick={(e) => this.handleBack()}>
                  <i class="fas fa-arrow-left" /> Back
                </Button>
              </div>
            </div>
            <ol className="breadcrumb mb-30">
              <li className="breadcrumb-item">
                <a href="/">Dashboard</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/">Orders</a>
              </li>
              <li className="breadcrumb-item active">Order Edit</li>
            </ol>
            <div className="row">
              {self ? (
                <div className="col-xl-12 col-md-12">
                  <div className="card card-static-2 mb-30">
                    <div className="card-title-2">
                      <h2 className="title1458">Invoice</h2>
                      <span className="order-id">Order : {self.OrderNo}</span>
                    </div>
                    <div className="invoice-content">
                      <div className="row">
                        <div className="col-lg-9 col-sm-9">
                          <div className="ordr-date">
                            <b>Order Details :</b>
                            <br />
                            Customer Name : {self.CustomerName}
                            <br />
                            Customer Email : {self.email}
                            <br />
                            Customer Phone : {self.phone}
                            <br />
                            Address : {self.StreetAddress}
                            <br />
                            Shipping Address: {self.shipping}
                            <br />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-3  right-text">
                          <div className="ordr-date">
                            <b>Order Date :</b>{" "}
                            <Moment format="MMMM Do YYYY">
                              {self.createdAt}
                            </Moment>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="card card-static-2 mb-30 mt-30">
                            <div className="card-title-2">
                              <h4>Recent Orders</h4>
                            </div>
                            <div className="card-body-table">
                              <div className="table-responsive">
                                <table className="table ucp-table table-hover">
                                  <thead>
                                    <tr>
                                      <th style={{ width: 50 }}>#</th>
                                      {/* <th style={{ width: 130 }}>Code</th> */}
                                      <th>Image</th>
                                      <th>Item</th>
                                      <th
                                        style={{ width: 150 }}
                                        className="text-center"
                                      >
                                        Price
                                      </th>
                                      <th
                                        style={{ width: 50 }}
                                        className="text-center"
                                      >
                                        Qty
                                      </th>
                                      <th
                                        style={{ width: 150 }}
                                        className="text-center"
                                      >
                                        Discount
                                      </th>
                                      <th>Status</th>
                                      <th>Delivery Date</th>
                                      <th
                                        style={{ width: 100 }}
                                        className="text-center"
                                      >
                                        Total
                                      </th>

                                      <th
                                        style={{ width: 100 }}
                                        className="text-center"
                                      >
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {self && self.Items && self.Items.length
                                      ? self.Items.map((p, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              {p.varient ? (
                                                <img
                                                  src={p.varient.thumbnail}
                                                  alt="cartimage"
                                                  style={{ height: "50px" }}
                                                />
                                              ) : null}
                                            </td>
                                            <td>
                                              {p.varient
                                                ? p.varient.productName
                                                : null}
                                            </td>
                                            <td className="text-center">
                                              &#8377;
                                              {p.varient &&
                                              p.varient.distributorPrice
                                                ? p.varient.distributorPrice
                                                : null}
                                            </td>
                                            <td className="text-center">
                                              {p.qty}
                                            </td>
                                            <td className="text-center">
                                              Rs.
                                              {Math.round(
                                                p.varient && p.varient.discount
                                                  ? p.varient.discount
                                                  : null
                                              )}
                                            </td>

                                            <td>
                                              {" "}
                                              {p.status === "processing" ? (
                                                <span className="badge-item badge-primary">
                                                  {p.status}
                                                </span>
                                              ) : p.status === "shipping" ? (
                                                <span className="badge-item badge-info">
                                                  {p.status}
                                                </span>
                                              ) : p.status === "delieverd" ? (
                                                <span className="badge-item badge-success">
                                                  {p.status}
                                                </span>
                                              ) : (
                                                <span className="badge-item badge-danger">
                                                  {p.status}
                                                </span>
                                              )}
                                            </td>
                                            <td>
                                              {p.deliveryDate ? (
                                                <span className="delivery-time">
                                                  <Moment format="MMMM Do YYYY">
                                                    {p.deliveryDate}
                                                  </Moment>
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </td>
                                            <td className="text-center">
                                              &#8377;
                                              {p.varient
                                                ? p.qty * p.varient.netPrice
                                                : null}
                                            </td>
                                            <td className="text-center">
                                              <Changestatus state={p} />
                                            </td>
                                          </tr>
                                        ))
                                      : ""}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7" />
                        <div className="col-lg-5">
                          <div className="order-total-dt">
                            <div className="order-total-left-text">
                              Sub Total
                            </div>
                            <div className="order-total-right-text">
                              {self.Items.reduce(function (acc, obj) {
                                return acc + obj.varient.netPrice;
                              }, 0)}{" "}
                            </div>
                          </div>
                          <div className="order-total-dt">
                            <div className="order-total-left-text fsz-18">
                              Discount Price
                            </div>
                            <div className="order-total-right-text fsz-18">
                              &#8377;
                              {self.Items.reduce(function (acc, obj) {
                                return acc + obj.varient.discount;
                              }, 0)}{" "}
                              <span className="text-success">save</span>
                            </div>
                          </div>
                          <div className="order-total-dt">
                            <div className="order-total-left-text">
                              Delivery Fees
                            </div>
                            <div className="order-total-right-text">
                              &#8377;25
                            </div>
                          </div>
                          <div className="order-total-dt">
                            <div className="order-total-left-text fsz-18">
                              Total Amount
                            </div>
                            <div className="order-total-right-text fsz-18">
                              &#8377;
                              {self.Items.reduce(function (acc, obj) {
                                return acc + obj.varient.netPrice;
                              }, 0)}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                "Loading"
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}
