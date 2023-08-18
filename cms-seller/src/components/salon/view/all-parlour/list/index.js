import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetSalonDetails } from "../../../../services";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: false,
    };
  }
  async getList() {
    this.setState({ isLoading: true });
    let p = await GetSalonDetails.getAllSalonOwner();
    if (p) {
      this.setState({ list: p.data, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.getList();
  }
  handleStatus = async (index, value, getData) => {
    console.log(getData);
    let STATUS = getData.STATUS ? false : true;
    let data = { ID: getData.id, STATUS: STATUS };
    let list = await GetSalonDetails.getParlourStatusChanged(data);
    if (list) {
      NotificationManager.success(list.message, "Status");
      this.getList();
    }
  };
  render() {
    let { list, isLoading } = this.state;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-md-9 col-lg-6">
                <h2 className="mt-30 page-title">Salon List</h2>
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
              <li className="breadcrumb-item active">Salon List</li>
            </ol>
            <div className="row justify-content-between">
              <div className="col-lg-12">
                <a
                  href="/salon/your-parlour/create"
                  className="add-btn hover-btn"
                >
                  Add New
                </a>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="card card-static-2 mt-30 mb-30">
                  <div className="card-title-2">
                    <h4>All Salon</h4>
                  </div>
                  <div className="card-body-table">
                    <div className="table-responsive">
                      {isLoading ? <p>Loading...</p> : ""}
                      <table className="table ucp-table table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: 60 }}>
                              <input type="checkbox" className="check-all" />
                            </th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Salon Name</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Salon No</th>
                            <th scope="col">Salon Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list !== undefined
                            ? list.map((row, index) => (
                                <tr key={index}>
                                  <td>{++index}</td>
                                  <td>
                                    <img
                                      src={row.THUMBNAIL ? row.THUMBNAIL : null}
                                      alt="thumbnail"
                                      height="30"
                                    />
                                  </td>
                                  <td>{row.NAME}</td>
                                  <td>
                                    {row.owner ? row.owner.firstName : ""}
                                  </td>
                                  <td>{row.PHONENO}</td>
                                  <td>{row.ADDRESS}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className={
                                        row.STATUS
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
                                  <td>
                                    <Link
                                      to={{
                                        pathname: `/salon/your-parlour/edit/${row.id}`,
                                        state: { row },
                                      }}
                                    >
                                      <i className="fas fa-edit" />
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            : "No data found..."}
                        </tbody>
                      </table>
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

export default List;
