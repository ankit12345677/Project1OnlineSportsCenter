import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetSeoDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.state.productId,
      seoId: this.props.state.seoId,
      title: this.props.state.title,
      description: this.props.state.description,
      keyword: this.props.state.keyword,
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
      productId: this.props.state.productId,
      id: this.props.state.seoId,
      title: this.state.title,
      description: this.state.description,
      keyword: this.state.keyword,
    };
    let list = await GetSeoDetails.getSeoUpdate(data);
    if (list) {
      NotificationManager.success(list.msg, "Message");
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
                  Update Seo
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
                      name="title"
                      placeholder="Enter title..."
                      defaultValue={this.props.state.title}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      Description<span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Enter description..."
                      defaultValue={this.props.state.description}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      Keyword<span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="keyword"
                      placeholder="Enter keyword..."
                      defaultValue={this.props.state.keyword}
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
