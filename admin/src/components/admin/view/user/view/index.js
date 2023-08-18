import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      isLoaded: false,
      limit: 20,
      pageNumber: 1,
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = {
      limit: this.state.limit,
      page: params ? params.page : this.state.pageNumber,
    };
    if (Object.keys(params).length !== 0) {
      this.getCustomer(data);
    } else {
      this.getCustomer({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }
  async getCustomer(data) {
    this.setState({ isLoaded: true });
    let list = await GetUserLogin.getAllUserList(data);
    if (list) {
      this.setState({
        getList: list.data.items,
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
        isloaded: false,
      });
    } else {
      this.setState({ isLoaded: false });
    }
  }
  async handlDeleteById(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete User from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetUserLogin.getDeleteUserList(id);
        if (value) {
          NotificationManager.success(value.msg, "Status");
          setTimeout(async function () {
            window.location.reload();
          }, 1000);
        }
      }
    });
  }
  handlEditRow(row) {
    this.props.history.push({
      pathname: `/admin/user/edit/${row.id}`,
      state: row,
    });
  }
  handleAddNewUser() {
    this.props.history.push({ pathname: `/admin/user/create` });
  }
  handlePageClick = (e) => {
    let data = { limit: this.state.limit, page: e.selected + 1 };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getCustomer(data);
  };
  render() {
    const { getList, pages, pageNumber, isLoaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">User Management</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item active">User</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-3 col-md-4">
            <div className="bulk-section mt-30">
              <div className="input-group">
                <select id="action" name="action" className="form-control">
                  <option selected>Bulk Actions</option>
                  <option value={1}>Active</option>
                  <option value={2}>Inactive</option>
                  <option value={3}>Delete</option>
                </select>
                <div className="input-group-append">
                  <button className="status-btn hover-btn" type="submit">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button
              variant="contained"
              className="status-btn hover-btn"
              onClick={(e) => this.handleAddNewUser()}
            >
              Add New User
            </Button>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All User</h4>
              </div>
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>
                          <input type="checkbox" className="check-all" />
                        </th>
                        <th style={{ width: 60 }}>ID</th>
                        <th>First Name</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoaded && getList && getList.length
                        ? getList.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="check-item"
                                  name="ids[]"
                                  defaultValue={7}
                                />
                              </td>
                              <td>{++index}</td>
                              <td>{row.firstName}</td>
                              <td>{row.lastName}</td>
                              <td>{row.email}</td>
                              <td>{row.role}</td>
                              <td>
                                {row.verify ? (
                                  <span className="text-success">Verified</span>
                                ) : (
                                  <span className="text-danger">Pending</span>
                                )}
                              </td>
                              <td className="action-btns">
                                <a onClick={(e) => this.handlEditRow(row)}>
                                  <i className="fas fas fa-edit" />
                                </a>
                                <Typography
                                  className="delete-btn"
                                  onClick={(e) => this.handlDeleteById(row.id)}
                                >
                                  <i className="fas fa-trash-alt" />
                                </Typography>
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  pageCount={pages ? pages : ""}
                  forcePage={pageNumber - 1}
                  onPageChange={this.handlePageClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
