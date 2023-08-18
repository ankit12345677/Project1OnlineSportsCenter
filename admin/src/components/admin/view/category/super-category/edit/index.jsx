import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { GetCategoryDetails } from "../../../../../services";
import { Multiselect } from "multiselect-react-dropdown";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { id, Name, Slug, Sequence } = this.props.state;
    this.state = {
      Name: Name,
      id: id,
      Slug: Slug,
      Sequence: Sequence,
      selectedValue: [],
      getCatList: [],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
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
  onSelect(selectedList, selectedItem) {
    let value = Array.from(selectedList, (option) => option.id);
    this.setState({ selectedValue: value });
  }

  onRemove(selectedList, removedItem) {
    let value = Array.from(selectedList, (option) => option.id);
    this.setState({ selectedValue: value });
  }
  async getCategory() {
    let list = await GetCategoryDetails.getCategoryList();
    this.setState({ getCatList: list.data });
  }
  async componentDidMount() {
    this.getCategory();
  }
  async handleSubmit(e) {
    let data = {
      id: this.state.id,
      Name: this.state.Name,
      Slug: this.state.Slug,
      Sequence: this.state.Sequence,
      CategoryId: this.state.selectedValue,
    };
    let list = await GetCategoryDetails.updateSuperCategory(data);
    if (list) {
      window.location.reload();
    }
  }
  render() {
    const { getCatList } = this.state;
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
                  Update Super Category
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
                    name="Name"
                    value={this.state.Name}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Slug"
                    value={this.state.Slug}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sequence*</label>
                  <input
                    type="number"
                    className="form-control"
                    name="Sequence"
                    value={this.state.Sequence}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Category<b className="text-danger">*</b>
                  </label>
                  <Multiselect
                    options={getCatList}
                    onSelect={this.onSelect}
                    onRemove={this.onRemove}
                    displayValue="name"
                    showCheckbox={true}
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
