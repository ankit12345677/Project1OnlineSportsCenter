import React, { Component } from "react";
import { GetCollection } from "../../../../services";
import { Typography, Button } from "@material-ui/core";
import Edit from "../edit";
import swal from "sweetalert";
import ModalCollection from "../modal";
import { Link } from "react-router-dom";
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  async componentDidMount() {
    this.getLocation();
  }
  async getLocation() {
    let list = await GetCollection.getCollection();
    this.setState({ getList: list.data });
  }
  async handlDeleteById(id) {
    swal({
      title: "Are you sure?",
      text: "You want to delete city from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetCollection.getCityDeleteById(id);
        if (value) {
          this.getLocation();
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
            <h2 className="mt-30 page-title">All Collection </h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item active">collection</li>
        </ol>
        <div className="row justify-content-between">
          <div className="col-lg-12">
            <ModalCollection />
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>All collection</h4>
              </div>
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Priority</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {self.map((row, index) => (
                        <tr key={index}>
                          <td>{++index}</td>
                          <td>{row.name}</td>
                          <td>{row.slug}</td>
                          <td>{row.sequence}</td>
                          <td className="action-btns">
                            <Edit state={row} />
                            <a href={`/admin/collection/${row.slug}/${row.id}`}>
                              <i className="fas fa-eye" />
                            </a>
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
    );
  }
}
