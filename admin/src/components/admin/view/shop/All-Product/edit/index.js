import React, { Component } from "react";
import { Button, Paper, Grid } from "@material-ui/core";
import { GetSupplierDetails } from "../../../../../services";
import Loader from "../../../../../loader";
import swal from "sweetalert";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.row;
    this.state = {
      id: data.id,
      productName: data.name,
      productCode: data.code,
      distributorPrice: data.distributorPrice,
      marginPer: data.marginPer,
      marginPrice: data.marginPrice,
      buyerPrice: data.buyerPrice,
      sellerPrice: data.sellerPrice,
      qty: data.qty,
      discountPer: data.discountPer,
      discount: data.discount,
      total: data.total,
      netPrice: data.netPrice,
    };
  }
  handleBack() {
    this.props.history.goBack();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  callback = (data) => {
    this.setState({ priceDetails: data });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    let data = {
      id: this.state.id,
      distributorPrice: this.state.distributorPrice,
      buyerPrice: this.state.buyerPrice,
      sellerPrice: Number(this.state.sellerPrice),
    };
    swal({
      title: "Are you sure?",
      text: "You want to update product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetSupplierDetails.productUpdate(data);
        if (list) {
          this.setState({ isLoaded: false });
          this.props.history.push("/admin/shop/seller/all-product");
        } else {
          this.setState({ isLoaded: false });
        }
      } else {
        this.setState({ isLoaded: false });
      }
    });
  };

  render() {
    const {
      isLoaded,
      productName,
      productCode,
      distributorPrice,
      marginPer,
      marginPrice,
      buyerPrice,
      sellerPrice,
      qty,
    } = this.state;
    let disableSaveButton = !sellerPrice;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <div
          className="row" /* style={this.state.blockhide ? { display: 'block' } : { display: 'none' }} */
        >
          {isLoaded ? <Loader /> : ""}
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mb-30">
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <Paper
                    style={{
                      marginBottom: "2rem",
                      padding: "1rem",
                      marginTop: "1rem",
                      background: "#f7f7f",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <Grid>
                          <label>Price List</label>
                          <div className="row price_list_details">
                            <div className="col-md-3">
                              <label className="form-label">
                                Product Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="productName"
                                placeholder="ex: Bultra"
                                value={productName}
                                disabled
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">
                                Product Code
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="productCode"
                                placeholder="ex: FGSTW"
                                value={productCode}
                                disabled
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">
                                DistributerPrice
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="distributorPrice"
                                placeholder="ex: 100"
                                value={distributorPrice}
                                disabled
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">
                                Quantity<span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="qty"
                                placeholder="ex: 1"
                                value={qty}
                                disabled
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">
                                Margin(%)<span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="marginPer"
                                placeholder="ex: 5%"
                                value={marginPer}
                                disabled
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">
                                Margin Price
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="marginPrice"
                                placeholder="ex: 50"
                                value={marginPrice}
                                disabled
                              />
                            </div>

                            <div className="col-md-3">
                              <label className="form-label">Buyer Price*</label>
                              <input
                                className="form-control"
                                name="buyerPrice"
                                placeholder="ex: 100"
                                value={buyerPrice}
                                disabled
                              />
                            </div>

                            <div className="col-md-3">
                              <label className="form-label">
                                {" "}
                                Customer Price*
                              </label>
                              <input
                                className="form-control"
                                name="sellerPrice"
                                placeholder="ex: 105"
                                value={sellerPrice}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                          </div>
                        </Grid>
                      </div>
                    </div>
                  </Paper>
                  <div className="button_price">
                    <div className="form-group">
                      <Button
                        variant="contained"
                        disabled={disableSaveButton}
                        className={
                          disableSaveButton ? "bg-grey" : "save-btn hover-btn"
                        }
                        onClick={this.handleSubmit}
                      >
                        update
                      </Button>
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
