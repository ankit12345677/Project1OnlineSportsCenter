import React, { Component } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import Loader from "../../../../loader";
import CommonName from "./common-name";
import { NotificationManager } from "react-notifications";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      selectedProduct: "",
      isloaded: false,
      isLoaded: false,
      productList: [],
      catList: [],
      categoryId: "",
      status: "",
      files: "",
      limit: 20,
      pageNumber: 1,
      searchValue: "",
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      const data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
        searchString: e.target.value,
      };
      this.getProductList(data);
    } else {
      const data = {
        limit: this.state.limit,
        page: this.state.pageNumber,
      };
      this.getProductList(data);
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  async getProductList(data) {
    this.setState({ isloaded: true });
    let list = await GetProductDetails.getAllSellerProduct(data);
    if (list) {
      this.setState({
        productList: list.data.items,
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
        isloaded: false,
      });
    } else {
      this.setState({ isloaded: false });
    }
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = {
      limit: this.state.limit,
      page: params ? params.page : this.state.pageNumber,
    };
    if (Object.keys(params).length !== 0) {
      this.getProductList(data);
    } else {
      this.getProductList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }

  async handlProductVarient(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getDeleteProductVarient(id);
        if (value) {
          this.getProductList();
        }
      }
    });
  }
  async UpdateStatus(e, value) {
    const data = { PubilshStatus: e.target.value, productId: value };
    let list = await GetProductDetails.getStatusUpdated(data);
    if (list) {
      NotificationManager.success(list.message);
      this.getProductListByVendor();
    }
  }
  handlePageClick = (e) => {
    let data = { limit: this.state.limit, page: e.selected + 1 };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getProductList(data);
    window.location.reload();
  };

  render() {
    const { productList, pages, pageNumber, isLoaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="index.html">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Products</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="col-lg-12">
                {isLoaded ? <Loader /> : ""}
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    {/* <label className="form-label"><b>Select Product*</b></label> */}
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search product ... "
                      value={this.state.searchValue}
                      name="searchValue"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col-lg-5 col-md-5 mt-3 text-right">
                    <Button
                      variant="contained"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
              <br />
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th className="text-center">Category</th>
                        <th>Common Name</th>
                        <th>Product</th>
                        <th>PubilshStatus</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList && productList.length
                        ? productList.map((d, i) => (
                            <tr key={i}>
                              <td>{d.id}</td>
                              <td>
                                {d.maincat.name +
                                  ">" +
                                  d.SubCategory.sub_name +
                                  ">" +
                                  d.SubChildCategory.name}
                              </td>
                              <td>
                                {d.name}
                                <CommonName state={d} />
                              </td>
                              <td>
                                <Paper>
                                  <thead>
                                    <tr>
                                      <th>Thumbnail</th>
                                      <th>Product</th>
                                      <th>MRP Price</th>
                                      <th>Selling Price</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {d.ProductVariants.map((row, index) => (
                                      <tr key={index}>
                                        <td>
                                          {row.thumbnail ? (
                                            <img
                                              src={row.thumbnail}
                                              alt="thumnai"
                                              height="40"
                                            />
                                          ) : (
                                            <span className="text-danger">
                                              Please upload image
                                            </span>
                                          )}
                                        </td>
                                        <td>{row.productName}</td>
                                        <td>{row.distributorPrice}</td>
                                        <td>{row.buyerPrice}</td>
                                        <td>
                                          <td className="action-btns">
                                            <Typography
                                              className="delete-btn"
                                              onClick={(e) =>
                                                this.handlProductVarient(row.id)
                                              }
                                            >
                                              <i className="fas fa-trash-alt" />
                                            </Typography>
                                          </td>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Paper>
                              </td>
                              <td style={{ width: "220px" }}>
                                <select
                                  className="form-control"
                                  defaultValue={d.PubilshStatus}
                                  onChange={(e) => this.UpdateStatus(e, d.id)}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Unpublished">
                                    Unpublished
                                  </option>
                                  <option value="Published">Published</option>
                                </select>
                              </td>
                              <td>
                                <td className="action-btns">
                                  <Link
                                    to={{
                                      pathname: `/admin/seller/product-detail/edit/${d.id}`,
                                      state: d,
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                  {/* <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(d.id)} ><i className="fas fa-trash-alt" /></Typography> */}
                                </td>
                              </td>
                            </tr>
                          ))
                        : "Loading..."}
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
