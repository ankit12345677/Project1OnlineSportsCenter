import React, { Component } from "react";
import { GetDashboardDetails } from "../../services";
import { Paper, Grid, Button } from "@material-ui/core";
import Loader from "../../loader";
import "./index.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isloaded: false,
    };
  }
  async getDashboardList() {
    this.setState({ isloaded: true });
    const p = await GetDashboardDetails.getDashProductList();
    if (p) {
      this.setState({ list: p.data, isloaded: false });
    } else {
      this.setState({ isloaded: true });
    }
  }

  componentDidMount() {
    this.getDashboardList();
  }

  render() {
    const { isloaded, list } = this.state;
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
                <div className="dashboard-report-card bg-grad-3 text-white rounded-lg mb-4 overflow-hidden">
                  <div className="card-content">
                    <span className="card-title">Product</span>
                    {/* {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "shipping" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        } */}
                  </div>
                  <div className="card-media">
                    <i className="fab fa-rev" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card bg-grad-1 text-white rounded-lg mb-4 overflow-hidden">
                  <div className="card-content">
                    <span className="card-title">Total Sale</span>
                    {/* {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "cancel" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        } */}
                  </div>
                  <div className="card-media">
                    <i className="far fa-times-circle" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card bg-grad-2 text-white rounded-lg mb-4 overflow-hidden">
                  <div className="card-content">
                    <span className="card-title">Total Earning</span>
                    {/* {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "processing" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        } */}
                  </div>
                  <div className="card-media">
                    <i className="fas fa-sync-alt rpt_icon" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card bg-grad-3 text-white rounded-lg mb-4 overflow-hidden">
                  <div className="card-content">
                    <span className="card-title">Successfull Orders</span>
                    {/* {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "delivered" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        } */}
                  </div>
                  <div className="card-media">
                    <i className="fas fa-money-bill rpt_icon" />
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-md-7">
                <Paper>
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0 h6">Orders</h5>
                    </div>
                    <div className="card-body">
                      <table
                        className="table aiz-table mb-0 footable footable-1 breakpoint-xl"
                        style={{}}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-first-visible"
                            >
                              Total orders:
                            </td>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-last-visible"
                            >
                              0
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-first-visible"
                            >
                              Pending orders:
                            </td>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-last-visible"
                            >
                              0
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-first-visible"
                            >
                              Cancelled orders:
                            </td>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-last-visible"
                            >
                              0
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-first-visible"
                            >
                              Successful orders:
                            </td>
                            <td
                              style={{ display: "table-cell" }}
                              className="footable-last-visible"
                            >
                              0
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Paper>
              </div>
              <div className="col-xl-5 col-md-5">
                <Paper>
                  <div className="card p-5 text-center">
                    <div className="mb-3">
                      <img
                        loading="lazy"
                        src="/images/verified.png"
                        alt=""
                        width={130}
                      />
                    </div>
                  </div>
                </Paper>
              </div>
              <Grid container className="mt-3">
                <div className="col-xl-7 col-md-7">
                  <Paper>
                    <div className="card">
                      <div className="card-header">
                        <h6 className="mb-0">Products</h6>
                      </div>
                      <div className="card-body">
                        <table
                          className="table aiz-table mb-0 footable footable-2 breakpoint-xl"
                          style={{}}
                        >
                          <thead>
                            <tr className="footable-header">
                              <th
                                style={{ display: "table-cell" }}
                                className="footable-first-visible"
                              >
                                Category
                              </th>
                              <th
                                style={{ display: "table-cell" }}
                                className="footable-last-visible"
                              >
                                Product
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {list
                              ? list.map((row, index) => (
                                  <tr key={index}>
                                    <td
                                      style={{ display: "table-cell" }}
                                      className="footable-first-visible"
                                    >
                                      {row.name}
                                    </td>
                                    <td
                                      style={{ display: "table-cell" }}
                                      className="footable-last-visible"
                                    >
                                      {row.productsCount}
                                    </td>
                                  </tr>
                                ))
                              : "Not found"}
                          </tbody>
                        </table>
                        <br />
                        <div className="text-center">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.props.history.push("/admin/product/create")
                            }
                          >
                            {" "}
                            Add new Proudct
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </div>
                <div className="col-xl-5 col-md-5">
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className="card mb-4 p-4 text-center">
                        <div class="h5 fw-600">Shop</div>
                        <p>Manage &amp; organize your shop</p>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            this.props.history.push("/admin/shop/list")
                          }
                        >
                          Go to setting
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className="card mb-4 p-4 text-center">
                        <div className="h5 fw-600">Payment</div>
                        <p>Configure your payment method</p>
                        <Button variant="contained" color="secondary">
                          Configure Now
                        </Button>
                        <div></div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </div>
          </div>
        </main>
        <footer className="py-4 bg-footer mt-auto">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted-1">© 2021 chitwashop pvt. ltd </div>
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
