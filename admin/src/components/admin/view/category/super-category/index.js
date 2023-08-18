import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Multiselect } from "multiselect-react-dropdown";
import { GetCategoryDetails } from "../../../../services";
import ButtonField from "../../../../common/ButtonField/ButtonField";
import swal from "sweetalert";
import Edit from "./edit";
export default class SuperCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Slug: "",
      getList: [],
      selectedValue: [],
      getCatList: [],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBack() {
    this.props.history.goBack();
  }
  async getCategory() {
    let list = await GetCategoryDetails.getCategoryList();
    this.setState({ getCatList: list.data });
  }
  async getSuperCategory() {
    let list = await GetCategoryDetails.getSuperCategoryList();
    this.setState({ getList: list.data });
  }
  async componentDidMount() {
    this.getCategory();
    this.getSuperCategory();
  }
  onSelect(selectedList, selectedItem) {
    let value = Array.from(selectedList, (option) => option.id);
    this.setState({ selectedValue: value });
  }

  onRemove(selectedList, removedItem) {
    let value = Array.from(selectedList, (option) => option.id);
    this.setState({ selectedValue: value });
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
  createService = async (event) => {
    event.preventDefault();
    const { Name, selectedValue } = this.state;
    let data = {
      Name: Name,
      categoryId: selectedValue,
      Slug: this.convertToSlug(Name),
    };
    swal({
      title: "Are you sure?",
      text: "You want to Add super category",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetCategoryDetails.createSuperCategory(data);
        if (list) {
          this.getSuperCategory();
        }
      }
    });
  };
  async handlDeleteById(id, CategoryId) {
    const data = { id: id, CategoryId: CategoryId };
    swal({
      title: "Are you sure?",
      text: "You want to delete category from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetCategoryDetails.getSuperCatDelete(data);
        if (value) {
          this.getSuperCategory();
        }
      }
    });
  }
  render() {
    const { Name, getList, getCatList } = this.state;
    let disableSaveButton = !Name;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">SuperCategories</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Rearrange Category</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">
                      Title<b className="text-danger">*</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ex: Mobile"
                      name="Name"
                      value={Name}
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

                  <ButtonField
                    className="theme-btn w-100"
                    variant="contained"
                    color="primary"
                    buttonText={"Create"}
                    disabled={disableSaveButton}
                    data-test="create-user-button"
                    onClick={this.createService}
                  />
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
                      <h4>All Main Categories</h4>
                    </div>
                    <div className="card-body-table">
                      <div className="table-responsive">
                        <table className="table ucp-table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">S.N</th>
                              <th scope="col">Sequence No</th>
                              <th scope="col">Super Cat</th>
                              <th scope="col">Slug</th>
                              <th scope="col">Category</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getList.map((row, index) => (
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{row.Sequence}</td>
                                <td>{row.Name}</td>
                                <td>{row.Slug}</td>
                                <td>
                                  <thead>
                                    <tr>
                                      <th scope="col">Name</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.category && row.category.length
                                      ? row.category.map((p, i) => (
                                          <tr key={i}>
                                            <td>
                                              {p && p.name ? p.name : null}
                                            </td>
                                            <td>
                                              <span
                                                className="delete-btn"
                                                onClick={(e) =>
                                                  this.handlDeleteById(
                                                    row.id,
                                                    p.id
                                                  )
                                                }
                                              >
                                                <i className="fas fa-trash-alt" />
                                              </span>
                                            </td>
                                          </tr>
                                        ))
                                      : ""}
                                  </tbody>
                                </td>
                                <td className="action-btns">
                                  <Edit state={row} />
                                  <span
                                    className="delete-btn"
                                    onClick={(e) =>
                                      this.handlDeleteById(row.id)
                                    }
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </span>
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
          </div>
        </div>
      </div>
    );
  }
}
