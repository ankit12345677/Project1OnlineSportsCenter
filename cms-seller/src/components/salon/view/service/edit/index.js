import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetSalonDetails } from "../../../../services";
// import SalonCatDropdown from '../../../../../common/saloncategory';
import { NotificationManager } from "react-notifications";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { id, SERVICENAME, CAT_ID, SORTDESC } = this.props.state;
    this.state = {
      id: id,
      SERVICENAME: SERVICENAME,
      CAT_ID: CAT_ID,
      SORTDESC: SORTDESC,
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
  handleSalonCategory = (value) => {
    this.setState({ CAT_ID: value });
  };
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
  async handleSubmit(e) {
    let slug = this.convertToSlug(this.state.SERVICENAME);

    const { id, SERVICENAME, SORTDESC, CAT_ID } = this.state;

    let data = {
      id: id,
      SERVICENAME: SERVICENAME,
      SORTDESC: SORTDESC,
      CAT_ID: CAT_ID,
      SLUG: slug,
    };
    try {
      let list = await GetSalonDetails.getServiceUpdate(data);
      if (list.success) {
        NotificationManager.success(list.msg, "message");
        window.location.reload();
      } else {
        NotificationManager.error("Please check value", "Input");
      }
    } catch (erro) {
      console.log(erro);
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
                  Update Salon
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
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ex: lotus facial"
                      name="SERVICENAME"
                      value={this.state.SERVICENAME}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  {/* <div className="form-group">
                                        <label className="form-label">Salon Category*</label>
                                        <SalonCatDropdown onSelectSalonCategory={this.handleSalonCategory} />
                                    </div> */}
                  <div className="form-group mb-0">
                    <label className="form-label">Sort Description*</label>
                    <textarea
                      className="form-control"
                      name="SORTDESC"
                      value={this.state.SORTDESC}
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
