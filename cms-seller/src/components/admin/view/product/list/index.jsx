import React, { Component } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { GetProductDetails, GetCategoryDetails } from "../../../../services";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
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
      page: 1,
      searchString: "",
    };
  }
  async handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      let data = {
        limit: this.state.limit,
        page: e.selected + 1,
        searchString: e.target.value,
      };
      this.getProductList(data);
    } else {
      let data = {
        limit: this.state.limit,
        page: e.selected + 1,
      };
      this.getProductList(data);
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  fileSelectedHandler = (e) => {
    this.setState({ files: e.target.files });
  };
  async getCategory() {
    let list = await GetCategoryDetails.getCategoryList();
    this.setState({ catList: list.data });
  }
  async getProductList(data) {
    this.setState({ isloaded: true });
    let list = await GetProductDetails.getAllProductList(data);
    if (list) {
      this.setState({
        productList: list.data.items,
        isloaded: false,
        pageNumber: list.data.page,
        pages: list.data.pages,
      });
    } else {
      this.setState({ isloaded: false });
    }
  }
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
  async handlProductVarientDelete(id) {
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
          window.location.reload();
        }
      }
    });
  }
  async deleteProduct(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete Main product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getMainProductDelete(id);
        if (value) {
          window.location.reload();
        }
      }
    });
  }
  handleSearchByCat = async (event) => {
    event.preventDefault();
    this.setState({ isloaded: false });
    const { status, categoryId } = this.state;
    let data = { status: status, categoryId: categoryId };
    let list = await GetProductDetails.getAllProductList(data);
    if (list) {
      this.setState({
        getAllProduct: list,
        isloaded: true,
      });
    }
  };
  handleUpload = (row) => {
    this.setState({ isLoaded: true });
    const formData = new FormData();
    formData.append("productId", row.productId);
    formData.append("varientId", row.id);
    for (const file of this.state.files) {
      formData.append("file", file);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    swal({
      title: "Are you sure?",
      text: "You want to add Images",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.getUploadVarientPhoto(
          formData,
          config
        );
        if (list) {
          this.setState({ isLoaded: false });
          window.location.href = "/admin/product/more-photo";
        } else {
          NotificationManager.error("error");
          this.setState({ isLoaded: false });
        }
      }
    });
  };

  render() {
    const { pages, pageNumber, productList } = this.state;
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
          <div className="col-lg-6 col-md-6">
            <div className="bulk-section mt-30">
              <a href="/admin/product/create" className="add-btn hover-btn">
                Create Product
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 ">
            <div className="bulk-section mt-30 float-right">
              <a href="/admin/product/discount" className="add-btn hover-btn">
                Discount
              </a>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All Products</h4>
              </div>
              <div className="news-content-right pd-20">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter product name, slug, id..."
                        name="searchString"
                        value={this.state.searchString}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th className="text-center">Category</th>
                        <th>Product</th>
                        <th>PubilshStatus</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList
                        ? productList.map((d, i) => (
                            <tr key={i}>
                              <td>{d.id}</td>
                              <td>
                                {d.maincat.name + ">" + d &&
                                d.SubCategory &&
                                d.SubCategory.sub_name
                                  ? d.SubCategory.sub_name
                                  : "" +
                                    ">" +
                                    (d.SubChildCategory
                                      ? d.SubChildCategory.name
                                      : null)}
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
                                                this.handlProductVarientDelete(
                                                  row.id
                                                )
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
                              <td>{d.PubilshStatus}</td>
                              <td>
                                <td className="action-btns">
                                  <Link
                                    to={{
                                      pathname: `/admin/product/edit/${d.id}`,
                                      state: d,
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                  <Typography
                                    className={
                                      !d.ProductVariants.length
                                        ? "delete-btn"
                                        : "d-none"
                                    }
                                    onClick={(e) => this.deleteProduct(d.id)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Typography>
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
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={8}
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
