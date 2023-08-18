import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import { GetSeoDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import Edit from "../edit";
import ReactPaginate from "react-paginate";
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      isloading: false,
      productId: "",
      limit: 20,
      pageNumber: 1,
      searchValue: "",
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
      this.getCustomer(data);
    } else {
      let data = {
        limit: this.state.limit,
        page: e.selected + 1,
      };
      this.getCustomer(data);
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let data = {
      limit: this.state.limit,
      page: params ? params.page : this.state.pageNumber,
    };
    if (Object.keys(params).length !== 0) {
      this.getCustomer(data);
    } else {
      this.getCustomer({
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
    this.getCustomer(data);
  };
  async getCustomer(data) {
    this.setState({ isloading: true });
    let list = await GetSeoDetails.getAllSeoList(data);
    if (list) {
      this.setState({
        getList: list.data.items,
        pages: list.data.pages,
        pageNumber: Number(list.data.page),
        isloaded: false,
      });
    } else {
      this.setState({ isloading: false });
    }
  }
  async handlDeleteById(id) {
    let data = { id: id };
    swal({
      title: "Are you sure?",
      text: "You want to delete seo from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetSeoDetails.getDeleteList(data);
        if (value) {
          NotificationManager.success(value.msg, "Status");
          setTimeout(async function () {
            window.location.reload();
          }, 1000);
        }
      }
    });
  }

  render() {
    const { getList, pages, pageNumber, isloading } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">SEO List</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="index.html">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">seo</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All details</h4>
              </div>
              <div className="news-content-right pd-20">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter product name, slug, id..."
                        name="productId"
                        value={this.state.productId}
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
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Title</th>
                        <th>Keyword</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isloading && getList && getList.length ? (
                        getList.map((row, index) => (
                          <tr key={index}>
                            <td>{row.productId}</td>
                            <td>{row.name}</td>
                            <td>{row.title}</td>
                            <td>{row.keyword}</td>
                            <td>{row.description}</td>
                            <td className="action-btns">
                              <Edit state={row} />
                              <Typography
                                className="delete-btn"
                                onClick={(e) => this.handlDeleteById(row.id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
    );
  }
}
