import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import MainCategorylist from "../../../../../common/category/main-category";
import { GetCategoryDetails } from "../../../../../services";
import SubEdit from "./sub-edit";
import RichTextEditor from "../../../../../RichTextEditor";
import swal from "sweetalert";

export default class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectCategory: "",
      getList: [],
      title: "",
      description: "",
      content: "",
      searchValue: "",
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSearchValue(e) {
    this.setState({ [e.target.name]: e.target.value });
    let data = { searchString: e.target.value };
    if (e.target.value) {
      this.getCategory(data);
    } else {
      this.getCategory();
    }
  }
  handleContentChange = (contentHtml) => {
    this.setState({
      content: contentHtml,
    });
  };
  handleBack() {
    this.props.history.goBack();
  }
  handleChangeCategoryList = (value) => {
    this.setState({ selectCategory: value });
  };
  async getCategory(data) {
    let list = await GetCategoryDetails.getSubCategoryList(data);
    this.setState({ getList: list.data });
  }
  async componentDidMount() {
    this.getCategory();
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, slug, selectCategory, title, keyword, content } = this.state;
    let data = {
      sub_name: name,
      slug: slug,
      categoryId: selectCategory,
      title: title,
      keyword: keyword,
      desc: content,
    };
    swal({
      title: "Are you sure?",
      text: "You want to Add SubCategory",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetCategoryDetails.createSubCategoryList(data);
        if (list) {
          this.getCategory();
        }
      }
    });
  };
  async handlDeleteById(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete SubCategory from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetCategoryDetails.getSubDeleteById(id);
        if (value) {
          this.getCategory();
        }
      }
    });
  }
  render() {
    let self = this.state.getList;
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
                <h4>Add Sub Category</h4>
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
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Main Categories*</label>
                    <MainCategorylist
                      onSelectCategory={this.handleChangeCategoryList}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex:- new title"
                      name="title"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group my-1">
                    <label className="form-label">
                      Keyword<b className="text-danger">*</b>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="ex: janakpur,chitwashop"
                      name="keyword"
                      value={this.state.keyword}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group my-1">
                    <RichTextEditor
                      content={this.state.content}
                      handleContentChange={this.handleContentChange}
                      placeholder="insert text here..."
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
                <div className="col-lg-12 col-md-12">
                  <div className="card card-static-2 mb-30">
                    <div className="row mb-4 p-2">
                      <div className="col-lg-6 col-md-6">
                        <label className="form-label">
                          <b>Cagegory*</b>
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
                      <h4>All Sub Categories</h4>
                    </div>
                    <div className="card-body-table">
                      <div className="table-responsive">
                        <table className="table ucp-table table-hover">
                          <thead>
                            <tr>
                              <th style={{ width: 60 }}>
                                <input type="checkbox" className="check-all" />
                              </th>
                              <th scope="col">Category</th>
                              <th scope="col">Sub Category</th>
                              <th style={{ width: "160px" }}>Slug</th>
                              <th scope="col">Date</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {self.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="check-item"
                                    name="ids[]"
                                    defaultValue={5}
                                  />
                                </td>
                                <td>{row.category ? row.category.name : ""}</td>
                                <td>{row.sub_name}</td>
                                <td>{row.slug ? row.slug : ""}</td>
                                <td>
                                  <span className="delivery-time">
                                    {this.formatDate(row.createdAt)}
                                  </span>
                                </td>
                                <td className="action-btns">
                                  <SubEdit state={row} />
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
                            ))}
                          </tbody>
                        </table>
                      </div>
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
