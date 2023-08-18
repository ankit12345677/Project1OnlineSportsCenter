import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { NotificationManager } from "react-notifications";
import { GetSalonDetails } from "../../../../services";
import Edit from "../edit";
import ReactPaginate from "react-paginate";

export default class MainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      salonCategoryName: "",
      gender: "",
      image: "",
      sortDesc: "",
      isLoading: false,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBack() {
    this.props.history.goBack();
  }
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };
  async getList(data) {
    this.setState({ isloading: true });
    let list = await GetSalonDetails.getAllSalonList(data);
    if (list) {
      this.setState({
        list: list.data.items,
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
        isloaded: false,
      });
    } else {
      this.setState({ isloading: false });
    }
  }
  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = {
      limit: this.state.limit,
      page: params ? params.page : this.state.pageNumber,
    };
    if (Object.keys(params).length !== 0) {
      this.getList(data);
    } else {
      this.getList({
        limit: this.state.limit,
        page: this.state.pageNumber,
      });
    }
  }
  convertToSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  handleStatus = async (index, value, getData) => {
    let status = !getData.Status ? 1 : 0;
    const formData = new FormData();
    formData.append("id", getData.id);
    formData.append("Status", status);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let list = await GetSalonDetails.getSalonUpdate(formData, config);
    if (list) {
      NotificationManager.success("Update status", "Status");
      window.location.reload();
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let slug = this.convertToSlug(this.state.salonCategoryName);
    const { salonCategoryName, sortDesc, gender, image } = this.state;
    const formData = new FormData();
    formData.append("salonCategoryName", salonCategoryName);
    formData.append("salonSlug", slug);
    formData.append("sortDesc", sortDesc);
    formData.append("gender", gender);
    formData.append("thumbnail", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      let list = await GetSalonDetails.getCreateSalonCategory(formData, config);
      if (list) {
        NotificationManager.success(list.msg, "message");
        window.location.reload();
      } else {
        NotificationManager.error("Please check value", "Input");
      }
    } catch (erro) {
      console.log(erro);
    }
  };
  handlePageClick = (e) => {
    let data = { limit: this.state.limit, page: e.selected + 1 };
    this.props.history.push({
      pathname: location.pathname,
      search: "?" + new URLSearchParams({ page: data.page }).toString(),
    });
    this.getList(data);
  };
  render() {
    let { list, pages, pageNumber } = this.state;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Salon Category</h2>
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
              {}
              <div className="col-lg-4 col-md-5">
                <div className="card card-static-2 mb-30">
                  <div className="card-title-2">
                    <h4>Salon Category</h4>
                  </div>
                  <div className="card-body-table">
                    <div className="news-content-right pd-20">
                      <div className="form-group">
                        <label className="form-label">Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ex:Body Wax"
                          name="salonCategoryName"
                          value={this.state.salonCategoryName}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <div className="form-group my-4">
                        <label className="form-label">Gender*</label>
                        <select
                          id="status"
                          name="gender"
                          className="form-control"
                          value={this.state.gender}
                          onChange={(e) => this.handleChange(e)}
                        >
                          <option>Select Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                      <div className="form-group my-4">
                        <label className="form-label">Category Image*</label>
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={this.onFileChange}
                        />
                      </div>
                      <div className="form-group mb-0">
                        <label className="form-label">Sort Description*</label>
                        <textarea
                          className="form-control"
                          name="sortDesc"
                          value={this.state.sortDesc}
                          onChange={(e) => this.handleChange(e)}
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
                        <div className="card-title-2">
                          <h4>Salon Category</h4>
                        </div>
                        <div className="card-body-table">
                          <div className="table-responsive">
                            <table className="table ucp-table table-hover">
                              <thead>
                                <tr>
                                  <th style={{ width: 60 }}>
                                    <input
                                      type="checkbox"
                                      className="check-all"
                                    />
                                  </th>
                                  <th scope="col">thumbnail</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Gender</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {list.length
                                  ? list.map((row, index) => (
                                      <tr key={index}>
                                        <td>{row.id}</td>
                                        <td>
                                          <img
                                            src={row.Thumbnail}
                                            alt="thumbnail"
                                            height="30"
                                          />
                                        </td>
                                        <td>{row.salonCategoryName}</td>
                                        <td>
                                          {row.Gender === "M"
                                            ? "Male"
                                            : "Female"}
                                        </td>
                                        <td>
                                          <td>
                                            <button
                                              type="button"
                                              className={
                                                row.Status
                                                  ? "btn btn-sm btn-secondary btn-toggle active"
                                                  : "btn btn-sm btn-secondary btn-toggle"
                                              }
                                              data-toggle="button"
                                              aria-pressed="true"
                                              autocomplete="off"
                                              onClick={(e) =>
                                                this.handleStatus(
                                                  index,
                                                  e.target.value,
                                                  row
                                                )
                                              }
                                            >
                                              {" "}
                                              <div className="handle"></div>{" "}
                                            </button>
                                          </td>
                                        </td>
                                        <td>
                                          <Edit state={row} />
                                        </td>
                                      </tr>
                                    ))
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
                            forcePage={pageNumber ? pageNumber - 1 : null}
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
        </main>
      </div>
    );
  }
}
