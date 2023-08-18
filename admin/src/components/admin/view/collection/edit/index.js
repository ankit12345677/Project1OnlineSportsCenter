import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetCollection } from "../../../../services";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { name, sequence, id } = this.props.state;
    this.state = {
      name: name,
      sequence: sequence,
      selectLocation: id,
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
  handleChangeLocation = (value) => {
    this.setState({ selectLocation: value });
  };

  async handleSubmit(e) {
    let data = {
      id: this.props.state.id,
      name: this.state.name,
      sequence: this.state.sequence,
    };
    let list = await GetCollection.getCollectionUpdate(data);
    if (list) {
      window.location.reload();
    }
  }
  render() {
    return (
      <div>
        <a className="edit-btn" onClick={(e) => this.handleOpen()}>
          <i className="fas fa-edit" />
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
                  Update collection
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
                <div className="form-group">
                  <label className="form-label">Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
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
