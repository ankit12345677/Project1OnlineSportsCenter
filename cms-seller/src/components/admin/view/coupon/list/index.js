import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import Moment from "react-moment";
import swal from "sweetalert";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBack() {
    this.props.history.goBack();
  }
  async getCouponList() {
    const list = await GetProductDetails.getCouponList();
    this.setState({ list: list.data });
  }
  async componentDidMount() {
    this.getCouponList();
  }
  async handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete coupon",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getDeleteCoupon(id);
        if (value) {
          NotificationManager.success(value.message, "Sucess");
          this.getCouponList();
        }
      }
    });
  }
  render() {
    const { list } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Coupon</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-6 col-md-6">
            <div className="bulk-section mt-30">
              <a href="/admin/coupon/create" className="add-btn hover-btn">
                Create
              </a>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All Coupon</h4>
              </div>
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th className="text-center">Product Name</th>
                        <th>Coupon Code</th>
                        <th>Price</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.length ? (
                        list.map((row, index) => (
                          <tr key={index}>
                            <td>{++index}</td>
                            <td>
                              {row.product ? row.product.productName : ""}
                            </td>
                            <td>{row.Code}</td>
                            <td>
                              {row.Type === 1 ? (
                                <p>Rs.{row.Value}</p>
                              ) : (
                                <p>{row.Value}%</p>
                              )}
                            </td>
                            <td>
                              <span className="delivery-time">
                                <Moment format="MMMM Do YYYY">
                                  {row.StartDate}
                                </Moment>
                              </span>
                            </td>
                            <td>
                              <span className="delivery-time">
                                <Moment format="MMMM Do YYYY">
                                  {row.EndDate}
                                </Moment>
                              </span>
                            </td>
                            <td className="action-btns">
                              <span
                                className="delete-btn"
                                onClick={(e) => this.handleDelete(row.id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <p className="p-1">No data found</p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
