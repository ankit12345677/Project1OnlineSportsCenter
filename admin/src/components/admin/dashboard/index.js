import React, { Component } from "react";
import { GetOrderDetails, GetDashboardDetails } from "../../services";
import Moment from "react-moment";
import Loader from "../../loader";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      isloaded: false,
      status: null,
      statusList: null,
      page: 1,
      searchString: null,
    };
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const data = { page: selectedPage };
    this.getOrderList(data);
  };
  handleChange(e) {
    const data = { searchString: e.target.value };
    this.getOrderList(data);
  }
  async getOrderList(data) {
    this.setState({ isloaded: true });
    let list = await GetOrderDetails.getAllOrderList(data);
    if (list.code === 200) {
      this.setState({
        getList: list.data.items,
        pages: list.data.pages,
        isloaded: false,
      });
    } else {
      this.setState({ isloaded: false });
    }
  }
  async getStatusList() {
    this.setState({ isloaded: true });
    let list = await GetDashboardDetails.getAllStatusOrder();
    if (list) {
      this.setState({ statusList: list.data, isloaded: false });
    } else {
      this.setState({ isloaded: false });
    }
  }
  async handleChangeStatus(e) {
    let { value } = e.target;
    this.setState({ isloaded: true });
    const data = { status: value };
    this.getOrderList(data);
  }
  componentDidMount() {
    const data = { page: this.state.page };
    this.getOrderList(data);
    this.getStatusList();
  }
  async handlDeleteById(data) {
    this.setState({ isLoaded: true });
    let list = { id: data.id };
    swal({
      title: "Are you sure?",
      text: "You want to delete Order from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetOrderDetails.getDeleteOrder(list);
        if (value) {
          NotificationManager.success("successfully Deleted");
          window.location.reload();
          this.setState({ isLoaded: false });
        } else {
          this.setState({ isLoaded: false });
          NotificationManager.error("error");
        }
      } else {
        this.setState({ isLoaded: false });
      }
    });
  }
  render() {
    const { getList, isloaded, status, statusList } = this.state;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            {isloaded ? <Loader /> : ""}
            <h2 className="mt-30 page-title">Dashboard</h2>
            <ol className="breadcrumb mb-30">
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>

            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card purple">
                  <div className="card-content">
                    <span className="card-title">Order Shipping</span>
                    {statusList
                      ? statusList.map((row, index) => (
                          <span
                            className="card-count"
                            key={index}
                            style={
                              row.status === "shipping"
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {row.total}
                          </span>
                        ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="fab fa-rev" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card red">
                  <div className="card-content">
                    <span className="card-title">Order Cancel</span>
                    {statusList
                      ? statusList.map((row, index) => (
                          <span
                            className="card-count"
                            key={index}
                            style={
                              row.status === "cancel"
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {row.total}
                          </span>
                        ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="far fa-times-circle" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card info">
                  <div className="card-content">
                    <span className="card-title">Order Process</span>
                    {statusList
                      ? statusList.map((row, index) => (
                          <span
                            className="card-count"
                            key={index}
                            style={
                              row.status === "processing"
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {row.total}
                          </span>
                        ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="fas fa-sync-alt rpt_icon" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card success">
                  <div className="card-content">
                    <span className="card-title">Order Delivered</span>
                    {statusList
                      ? statusList.map((row, index) => (
                          <span
                            className="card-count"
                            key={index}
                            style={
                              row.status === "delivered"
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {row.total}
                          </span>
                        ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="fas fa-money-bill rpt_icon" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mb-30">
                  <div className="row p-2">
                    <div className="col-lg-7 col-md-7">
                      <select
                        className="form-control p-2"
                        id="categeory"
                        
                        name="status"
                        value={status}
                        onChange={(e) => this.handleChangeStatus(e)}
                      >
                        <option selected>Select Status</option>
                        <option value="processing">Processing</option>
                        <option value="shipping">Shipping</option>
                        <option value="delieverd">Delivered</option>
                        <option value="cancel">Cancel</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-4 text-right">
                      <div className="input-group">
                        <div className="input-group-append">
                          <input
                            type="text"
                            className="form-control w-100"
                            placeholder="Search order ... "
                            value={this.state.searchString}
                            name="searchValue"
                            onChange={(e) => this.handleChange(e)}
                          />
                          <button
                            className="status-btn hover-btn"
                            onClick={() => window.location.reload()}
                          >
                            Refresh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-title-2">
                    <h4>Recent Orders</h4>
                    <button className="view-btn hover-btn">View All</button>
                  </div>
                  <div className="card-body-table">
                    <div className="table-responsive">
                      <table className="table ucp-table table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: 50 }}>S.N</th>
                            <th style={{ width: 130 }}>Order ID</th>
                            <th style={{ width: 130 }}>Customer Name</th>
                            <th style={{ width: 130 }}>Payment Method</th>
                            <th style={{ width: 200 }}>Order Date</th>
                            <th style={{ width: 130 }}>Total</th>
                            <th style={{ width: 100 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getList === "undefined" ? (
                            <p>Loading</p>
                          ) : (
                            getList.map((row, index) => (
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{row.OrderNo}</td>
                                <td>{row.CustomerName}</td>
                                <td>{row.payment} </td>
                                <td>
                                  <span className="delivery-time">
                                    <Moment format="MMMM Do YYYY">
                                      {row.OrderDate}
                                    </Moment>
                                  </span>
                                  <span className="delivery-time">
                                    <Moment format=" h:mm:ss a">
                                      {row.OrderDate}
                                    </Moment>
                                  </span>
                                </td>
                                <td>
                                  Rs{row.Total} for {row.count} Items
                                </td>
                                <td className="action-btns">
                                  <Link
                                    className="views-btn"
                                    to={{
                                      pathname: `/admin/order/view/${row.id}`,
                                      state: row,
                                    }}
                                  >
                                    <i className="fas fa-eye" />
                                  </Link>
                                  <Link
                                    className="edit-btn"
                                    to={{
                                      pathname: `/admin/order/edit/${row.id}`,
                                      state: row,
                                    }}
                                  >
                                    <i className="fas fa-edit" />
                                  </Link>

                                  <span
                                    className="delete-btn"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => this.handlDeleteById(row)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="py-4 bg-footer mt-auto">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted-1">
             <b><a>SportsCenter</a></b> 
              </div>
              <div className="footer-links">
                <a href="/">Privacy Policy</a>
                <a href="/">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
