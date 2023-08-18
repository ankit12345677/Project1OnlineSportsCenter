import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetCollection } from "../../../../services";
import { NotificationManager } from "react-notifications";
export default class ModalCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      sequence: null,
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOpen() {
    this.setState({ open: !this.state.open, loading: true });
  }

  handleClose() {
    this.setState({ open: !this.state.open });
  }
  async handleSubmit(e) {
    let data = {
      name: this.state.name,
      sequence: this.state.sequence,
    };
    let list = await GetCollection.createCollection(data);
    if (list) {
      NotificationManager.success(list.msg, "Message");
      window.location.reload();
    }
  }
  render() {
    return (
      <div>
        <a
          className="add-btn hover-btn text-white"
          onClick={(e) => this.handleOpen()}
        >
          Create
        </a>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Collection
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.handleClose()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row price_list_details">
                  <div className="col-md-12">
                    <label className="form-label">
                      Title<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      placeholder="Enter collection..."
                      defaultValue={this.state.name}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                </div>
                <div className="row price_list_details">
                  <div className="col-md-12">
                    <label className="form-label">
                      Sequence<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="sequence"
                      placeholder="Enter sequence..."
                      defaultValue={this.state.sequence}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.handleClose()}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.handleSubmit()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
