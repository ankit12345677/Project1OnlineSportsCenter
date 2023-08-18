import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { GetSupplierDetails, GetProductDetails } from "../../../../services";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../../../../loader";
import { ExportToExcel } from "../../../../common/ExportToExcel";

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      isLoaded: true,
      searchValue: "",
      limit: 10,
      page: 1,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async getProductListByVendor(data) {
    this.setState({ isLoaded: true });
    let list = await GetSupplierDetails.getProductByVendor(data);
    if (list) {
      if (list.code === 200) {
        this.setState({
          getList: list.data.items,
          isLoaded: false,
          pages: list.data.pages,
        });
      } else {
        this.setState({ isLoaded: false });
      }
    }
  }
  componentDidMount() {
    let lastSegment = window.location.pathname.split("/").pop();
    let data = {
      SellerId: lastSegment,
      limit: this.state.limit,
      page: this.state.page,
    };
    this.getProductListByVendor(data);
  }
  handleBack() {
    this.props.history.goBack();
  }
  handlePageClick = (e) => {
    let lastSegment = window.location.pathname.split("/").pop();
    let data = {
      SellerId: lastSegment,
      limi: this.state.limit,
      page: e.selected + 1,
    };
    this.getProductListByVendor(data);
  };
  async UpdateStatus(e, value) {
    let lastSegment = window.location.pathname.split("/").pop();
    const data = { PubilshStatus: e.target.value, productId: value };
    let data1 = {
      SellerId: lastSegment,
      limit: this.state.limit,
      page: this.state.page,
    };

    let list = await GetProductDetails.getStatusUpdated(data);
    if (list) {
      this.getProductListByVendor(data1);
    }
  }
  SearchAllProductList = (event) => {
    event.preventDefault();
    const data = {
      limit: this.state.limit,
      page: this.state.page,
      searchString: this.state.searchValue,
    };
    this.getProductList(data);
  };
  async getProductList(data) {
    this.setState({ isLoaded: true });
    let list = await GetSupplierDetails.getAllSellerProductList(data);
    if (list.code === 200) {
      this.setState({
        getList: list.data.items,
        isLoaded: false,
        pages: list.data.pages,
      });
    } else {
      this.setState({ isLoaded: false });
    }
  }
  async handlDeleteById(id) {
    let data = { id: id };
    swal({
      title: "Are you sure?",
      text: "You want to delete product from Your List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetSupplierDetails.deleteProductByVendorList(data);
        if (value) {
          // this.getProductListByVendor();
          window.location.reload();
        }
      }
    });
  }
  render() {
    let self = this.props.location.state;
    const { getList, pages, isLoaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Shops</h2>
          </div>
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
          <li className="breadcrumb-item">
            <a href="/">Shops</a>
          </li>
          <li className="breadcrumb-item active">Shop view</li>
        </ol>
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="card card-static-2 mb-30">
              <div className="card-body-table">
                <div className="shop-content-left pd-20">
                  <div className="shop_img">
                    <img src="/images/shop.svg" alt="shop-name" />
                  </div>
                  <div className="shop-dt-left">
                    <h4>
                      {self.row.ch_seller_shopdetails.length
                        ? self.row.ch_seller_shopdetails[0].SHOPNAME
                        : null}
                    </h4>
                    <span>
                      {self.row.ch_seller_shopdetails.length
                        ? self.row.ch_seller_shopdetails[0].ADDRESS
                        : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="card card-static-2 mb-30">
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Pickup Address</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {self.row.ch_seller_shopdetails
                        ? self.row.ch_seller_shopdetails.map((row, index) => (
                            <tr key={index}>
                              <td>{row.SHOPNAME}</td>
                              <td>{row.PHONE}</td>
                              <td>{row.CITY}</td>
                              <td>{row.ADDRESS}</td>
                              <td>{row.PICKUPADDRESS}</td>
                              <td>{row.DESCRIPTION}</td>
                            </tr>
                          ))
                        : "Loading..."}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>All Products</h4>
              </div>

              <div className="col-lg-12">
                {isLoaded ? <Loader /> : ""}
                <div className="row">
                  <div className="col-lg-6 col-md-6">
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
                  <div className="col-lg-1 col-md-1">
                    <button
                      className="save-btn hover-btn"
                      type="submit"
                      onClick={this.SearchAllProductList}
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-3 mt-3 text-right">
                    <Button
                      variant="contained"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </Button>
                  </div>
                  <div className="col-lg-2 col-md-2 mt-3 text-right">
                    <ExportToExcel apiData={getList} fileName={"Products"} />
                  </div>
                </div>
              </div>
              <br />

              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>ID</th>
                        <th style={{ width: 100 }}>Thumbnail</th>
                        <th style={{ width: 200 }}>Name</th>
                        <th>Category</th>
                        <th>SubCat</th>
                        <th>Brand</th>
                        <th>DiscountPer</th>
                        <th>DiscountPrice</th>
                        <th>NetPrice</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getList && getList.length
                        ? getList.map((row, index) =>
                            row.name !== null ? (
                              <tr key={index}>
                                <td>{row.id}</td>
                                <td>
                                  <img
                                    src={row.thumbnail}
                                    height="40px"
                                    alt={row.name}
                                  />
                                </td>
                                <td>{row.name}</td>
                                <td>{row.maincat}</td>
                                <td>{row.subcat}</td>
                                <td>
                                  {row.BrandName ? row.BrandName.name : null}
                                </td>
                                <td>{row.discountPer + "%"}</td>
                                <td>Rs.{row.discount}</td>
                                <td>Rs.{row.netPrice}</td>
                                <td style={{ width: "220px" }}>
                                  <select
                                    className="form-control"
                                    value={row.PubilshStatus}
                                    onChange={(e) =>
                                      this.UpdateStatus(e, row.productId)
                                    }
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                      Processing
                                    </option>
                                    <option value="Unpublished">
                                      Unpublished
                                    </option>
                                    <option value="Published">Published</option>
                                  </select>
                                </td>
                                <td className="action-btns">
                                  <Link
                                    to={{
                                      pathname: `/admin/shop/Seller/Product/${self.row.email}/${row.id}`,
                                      state: { row },
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          )
                        : "No data found"}
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
