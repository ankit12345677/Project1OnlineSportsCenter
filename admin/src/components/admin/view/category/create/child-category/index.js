import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import MainCategorylist from "../../../../../common/category/main-category";
import SubCategorylist from "../../../../../common/category/sub-category";
import { GetCategoryDetails } from "../../../../../services";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "../../../../../loader";
import { NotificationManager } from "react-notifications";
import Edit from "./edit";
export default class SubChildCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      name: "",
      getdata: [],
      getList: [],
      selectedCategory: "",
      selectedSubCategory: "",
      limit: 10,
      pageNumber: 1,
      searchValue: "",
    };
  }

  handleBack() {
    this.props.history.goBack();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSearchValue(e) {
    this.setState({ [e.target.name]: e.target.value });
    let data = {
      searchString: e.target.value,
    };
    if (e.target.value) {
      this.getChildCategory(data);
    } else {
      this.getChildCategory();
    }
  }
  handleSubCategory = (value) => {
    this.setState({ selectedSubCategory: value });
  };
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  handleCategory = async (value) => {
    this.setState({ selectedCategory: value });
    let categoryId = value;
    let list = await GetCategoryDetails.getSelectSubCategory(categoryId);
    this.setState({ getList: list.data });
  };
  async getChildCategory(data) {
    this.setState({ isLoaded: true });
    let list = await GetCategoryDetails.getChildCategoryList(data);
    if (list.code === 200) {
      this.setState({ isLoaded: false });
      this.setState({
        getdata: list.data.items,
        isLoaded: false,
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
      });
    } else {
      this.setState({ isLoaded: false });
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
      this.getChildCategory(data);
    } else {
      this.getChildCategory({
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
    this.getChildCategory(data);
    window.location.reload();
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      name: this.state.name,
      categoryId: this.state.selectedCategory,
      subcategoryId: this.state.selectedSubCategory,
    };
    swal({
      title: "Are you sure?",
      text: "You want to Add New Location",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetCategoryDetails.createChildCategory(data);
        if (list.code === 200) {
          this.getChildCategory();
          NotificationManager.success(list.message);
        }
      }
    });
  };
  async handlDeleteById(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete Category from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetCategoryDetails.getChildDeleteById(id);
        if (value) {
          this.getChildCategory();
        }
      }
    });
  }

  render() {
    const { getList, pageNumber, getdata, pages, isLoaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Categories</h2>
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
          <li className="breadcrumb-item active">Category</li>
        </ol>
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add Child Category</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                      name="name"
                      value={this.state.name}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Main Category*</label>
                    <MainCategorylist onSelectCategory={this.handleCategory} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sub Category*</label>
                    <SubCategorylist
                      state={getList}
                      onSelectSubCategory={this.handleSubCategory}
                    />
                  </div>
                  <button
                    className="save-btn hover-btn"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="all-cate-tags">
              <div className="row justify-content-between">
                {isLoaded ? <Loader /> : ""}
                <div className="col-lg-12 col-md-12">
                  <div className="card card-static-2 mb-30">
                    <div className="row mb-4 p-2">
                      <div className="col-lg-6 col-md-6">
                        <label className="form-label">
                          <b>Child Cagegory*</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search category ... "
                          value={this.state.searchValue}
                          name="searchValue"
                          onChange={(e) => this.handleSearchValue(e)}
                        />
                      </div>
                    </div>
                    <div className="card-title-2">
                      <h4>All Child Categories</h4>
                    </div>
                    <div className="card-body-table">
                      <div className="table-responsive">
                        <table className="table ucp-table table-hover">
                          <thead>
                            <tr>
                              <th style={{ width: 60 }}>Id</th>
                              <th scope="col">Category </th>
                              <th scope="col">Sub Category</th>
                              <th scope="col">Child Cat</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          {getdata && getdata.length
                            ? getdata.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.id}</td>
                                  <td>{row.MainCat}</td>
                                  <td>{row.SubCat}</td>
                                  <td>{row.name}</td>
                                  <td className="action-btns">
                                    <Edit state={row} />
                                    <Typography
                                      className="delete-btn"
                                      onClick={(e) =>
                                        this.handlDeleteById(row.id)
                                      }
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </Typography>
                                  </td>
                                </tr>
                              ))
                            : "No data found"}
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
                        forcePage={pageNumber ? pageNumber - 1 : ""}
                        onPageChange={this.handlePageClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
