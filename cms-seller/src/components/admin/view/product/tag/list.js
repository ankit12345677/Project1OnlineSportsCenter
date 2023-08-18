import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import swal from "sweetalert";
import NotificationManager from "react-notifications/lib/NotificationManager";
import ReactPaginate from "react-paginate";

export default class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      limit: 20,
      pageNumber: 1,
      page: 1,
      searchString: "",
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      let data = {
        limit: this.state.limit,
        page: this.state.page,
        searchString: e.target.value,
      };
      this.getTagList(data);
    } else {
      let data = {
        limit: this.state.limit,
        page: this.state.page,
      };
      this.getTagList(data);
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  async getTagList(data) {
    this.setState({ isloaded: true });
    let list = await GetProductDetails.getTagList(data);
    if (list) {
      this.setState({
        tagList: list.data.items,
        isloaded: false,
        pageNumber: list.data.pages,
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
      this.getTagList(data);
    } else {
      this.getTagList({
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
    this.getTagList(data);
  };
  async handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete Tag",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.deleteTag(id);
        if (value) {
          NotificationManager.success(value.message, "Sucess");
          this.getTagList();
        }
      }
    });
  }
  render() {
    const { pages, pageNumber, tagList } = this.state;

    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Tag</h2>
              </div>
              <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                <Button variant="contained" onClick={(e) => this.handleBack()}>
                  <i className="fas fa-arrow-left" /> Back
                </Button>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mt-30 mb-30">
                  <div className="card-title-2">
                    <h4>All tag</h4>
                  </div>
                  <div className="news-content-right pd-20">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter productId, title, id..."
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
                            <th>#</th>
                            <th>Title</th>
                            <th>Product</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tagList && tagList.length ? (
                            tagList.map((row, index) => (
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{row.title}</td>
                                <td>{row.productName}</td>
                                <td className="action-btns">
                                  <span
                                    className="delete-btn"
                                    onClick={(e) => this.handleDelete(row.id)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <p className="p-1">No data found</p>
                          )}
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
        </main>
      </div>
    );
  }
}
