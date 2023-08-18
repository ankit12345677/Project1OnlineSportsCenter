import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { GetSupplierDetails, GetProductDetails } from "../../../../services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../../../../loader";
import { ExportToExcel } from "../../../../common/ExportToExcel";
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      getAllProduct: [],
      searchValue: "",
      limit: 20,
      pageNumber: 1,
      page: 1,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async UpdateStatus(e, value) {
    const data = { PubilshStatus: e.target.value, productId: value };
    let list = await GetProductDetails.getStatusUpdated(data);
    if (list) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      let data = { page: params ? params.page : "", limit: this.state.limit };
      if (Object.keys(params).length !== 0) {
        this.getProductList(data);
      } else {
        this.getProductList({
          limit: this.state.limit,
          page: this.state.pageNumber,
        });
      }
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  async getProductList(data) {
    this.setState({ isLoaded: true });
    let list = await GetSupplierDetails.getAllSellerProductList(data);
    if (list.code === 200) {
      this.setState({
        getAllProduct: list.data.items,
        isLoaded: false,
        pageNumber: list.data.page,
        pages: list.data.pages,
      });
    } else {
      this.setState({ isLoaded: false });
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
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = { page: params ? params.page : "", limit: this.state.limit };
    if (Object.keys(params).length !== 0) {
      this.getProductList(data);
    } else {
      this.getProductList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }
  handlePageClick = (e) => {
    let data = { limit: this.state.limit, page: e.selected + 1 };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getProductList(data);
  };

  render() {
    const { pages, pageNumber, isLoaded, getAllProduct } = this.state;
    const fileName = "productlist";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Seller All Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12 m-1">
            <div className="card card-static-2 mt-30 mb-30">
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
                    <ExportToExcel
                      apiData={getAllProduct}
                      fileName={fileName}
                    />
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
                        <th>ChildCat</th>
                        <th>Brand</th>
                        <th>DiscountPer</th>
                        <th>DiscountPrice</th>
                        <th>NetPrice</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllProduct && getAllProduct.length
                        ? getAllProduct.map((row, index) =>
                            row.name !== null ? (
                              <tr key={index}>
                                <td>{row.id}</td>
                                <td>
                                  <img src={row.thumbnail} height="40px" />
                                </td>
                                <td>{row.name}</td>
                                <td>{row.maincat}</td>
                                <td>{row.subcat}</td>
                                <td>{row.childcat}</td>
                                <td>
                                  {row.BrandName ? row.BrandName.name : ""}
                                </td>
                                <td>{row.discountPer + "%"}</td>
                                <td>Rs.{row.discount}</td>
                                <td>Rs.{row.netPrice}</td>
                                <td style={{ width: "200px" }}>
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
                                      pathname: `/admin/shop/seller/edit-product/${row.id}`,
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
