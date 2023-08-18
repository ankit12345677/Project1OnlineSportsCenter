import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Moment from "react-moment";

export default class View extends Component {
  handleBack() {
    this.props.history.goBack();
  }
  render() {
    let self = this.props.location.state;
    return (
      <div id="layoutSidenav_content">
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
              <div className="col-xl-12 col-md-12">
                <div className="card card-static-2 mb-30">
                  <div className="card-title-2">
                    <h2 className="title1458">Invoice</h2>
                    <span className="order-id">OrderNo: {self.ORDERNO}</span>
                  </div>
                  <div className="invoice-content">
                    <div className="row">
                      <div className="col-lg-9 col-sm-9">
                        {self ? (
                          <div className="ordr-date">
                            <b>Order Details :</b>
                            <br />
                            Customer Name :{" "}
                            {self.FIRSTNAME + "" + self.LASTNAME}
                            <br />
                            Customer Email : {self.EMAIL}
                            <br />
                            Customer Phone : {self.PHONENO}
                            <br />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-lg-3 col-sm-3  right-text">
                        <div className="ordr-date">
                          <b>Booking Date :</b>{" "}
                          <Moment format="MMMM Do YYYY">
                            {self.APPOINTMENTDATE}
                          </Moment>{" "}
                          ,{" "}
                          <Moment format="h:mm:ss a">
                            {self.APPOINTMENTDATE}
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
                                    <th
                                      style={{ width: 200 }}
                                      className="text-center"
                                    >
                                      Parlour Name
                                    </th>
                                    <th
                                      style={{ width: 150 }}
                                      className="text-center"
                                    >
                                      Service Name
                                    </th>
                                    <th
                                      style={{ width: 150 }}
                                      className="text-center"
                                    >
                                      Discount
                                    </th>
                                    <th
                                      style={{ width: 150 }}
                                      className="text-center"
                                    >
                                      Price
                                    </th>
                                    <th
                                      style={{ width: 100 }}
                                      className="text-center"
                                    >
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {self.ch_salon_order_service_lists
                                    ? self.ch_salon_order_service_lists.map(
                                        (row, index) => (
                                          <tr key={index}>
                                            <td className="text-center">
                                              {row.PARLOURNAME}
                                            </td>
                                            <td className="text-center">
                                              {row.SERVICENAME}
                                            </td>
                                            <td className="text-center">
                                              {row.DISCOUNTPRICE}
                                            </td>
                                            <td className="text-center">
                                              {row.PRICE}
                                            </td>
                                            <td className="text-center">
                                              {row.GRANDTOTAL}
                                            </td>
                                          </tr>
                                        )
                                      )
                                    : "Loading..."}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7" />
                      <div className="col-lg-5">
                        <div className="order-total-dt">
                          <div className="order-total-left-text">Sub Total</div>
                          <div className="order-total-right-text">
                            &#8377;{self.GRANDTOTAL}
                          </div>
                        </div>
                        <div className="order-total-dt">
                          <div className="order-total-left-text fsz-18">
                            Total Amount
                          </div>
                          <div className="order-total-right-text fsz-18">
                            &#8377;{self.GRANDTOTAL}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
