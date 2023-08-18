import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GetSupplierDetails } from "../../../../services";
import { ExportToExcel } from "../../../../common/ExportToExcel";

export default class Allshop extends Component {
  constructor(props) {
    super(props);
    this.state = { getdata: [] };
  }

  handleBack() {
    this.props.history.goBack();
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  async getSellarList() {
    let list = await GetSupplierDetails.getAllSellerList();
    this.setState({ getdata: list.data });
  }
  async componentDidMount() {
    this.getSellarList();
  }
  render() {
    const { getdata } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6"></div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Seller</li>
        </ol>
        <div className="row justify-content-between">
          <div class="col-md-6">
            <h4>All Seller</h4>
          </div>
          <div class="col-md-4 text-md-right">
            <a href="/admin/user/create" class="btn btn-circle btn-info">
              <span>Add New Seller</span>
            </a>
          </div>
          <div class="col-md-2 text-md-right">
            <ExportToExcel apiData={getdata} fileName={"AllSeller"} />
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>
                          <input type="checkbox" className="check-all" />
                        </th>
                        <th style={{ width: 60 }}>S.N.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Approval</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getdata.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              className="check-item"
                              name="ids[]"
                              defaultValue={5}
                            />
                          </td>
                          <td>{row.id}</td>
                          <td>{row.firstName + " " + row.lastName}</td>
                          <td>{row.phone}</td>
                          <td>{row.email}</td>
                          <td>
                            {row.verify ? (
                              <span className="badge-item badge-status-success">
                                approved
                              </span>
                            ) : (
                              <span className="badge-item badge-status">
                                pending
                              </span>
                            )}
                          </td>
                          <td>{row.role}</td>
                          <td className="action-btns">
                            <Link
                              to={{
                                pathname: `/admin/shop/view/${row.id}`,
                                state: { row },
                              }}
                            >
                              <Typography className="view-shop-btn">
                                <i className="fas fa-eye" />
                              </Typography>
                            </Link>
                          </td>
                        </tr>
                      ))}
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
