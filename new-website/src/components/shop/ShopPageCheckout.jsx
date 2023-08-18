// react
import React, { Component } from "react";
import classNames from "classnames";
import { fetchUserDetail } from "../../store/auth";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { CreateOrderDetail } from "../../store/order";

// application
import AsyncAction from "../shared/AsyncAction";
import Collapse from "../shared/Collapse";
import Currency from "../shared/Currency";
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import Addaddress from "../shared/Addaddress";
import { NotificationManager } from "react-notifications";
import { getCookie } from "../../function";
import { GetUserLogin } from "../../services";
class ShopPageCheckout extends Component {
  payments = payments;

  constructor(props) {
    super(props);
    this.state = {
      payment: "",
      bgColor: null,
      addressId: null,
      newCart: null,
      userData: "",
    };
  }
  async componentDidMount() {
    const token = getCookie("token");
    if (token) {
      let userDetail = await GetUserLogin.getCustomerDetail(token);
      if (userDetail && userDetail.code === 200) {
        this.setState({ userData: userDetail.data });
      }
    }
  }
  handlePaymentChange = (event) => {
    if (event.target.checked) {
      this.setState({ payment: event.target.value });
    }
  };
  selectAddress = (address) => {
    this.setState({ bgColor: "#f1f1f1", addressId: address.id });
  };
  renderTotals() {
    const { cart } = this.props;

    if (cart.extraLines.length <= 0) {
      return null;
    }

    const extraLines = cart.extraLines.map((extraLine, index) => (
      <tr key={index}>
        <th>{extraLine.title}</th>
        <td>
          <Currency value={extraLine.price} />
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <tbody className="checkout__totals-subtotals">
          <tr>
            <th>Subtotal</th>
            <td>
              <Currency value={cart.subtotal} />
            </td>
          </tr>
          {extraLines}
        </tbody>
      </React.Fragment>
    );
  }

  renderCart() {
    const { cart } = this.props;
    const items = cart.items.map((item) => (
      <tr key={item.id}>
        <td>{`${item.product.Name} × ${item.quantity}`}</td>
        <td>
          <Currency value={item.product.netPrice} />
        </td>
      </tr>
    ));

    return (
      <table className="checkout__totals">
        <thead className="checkout__totals-header">
          <tr>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="checkout__totals-products">{items}</tbody>
        {this.renderTotals()}
        <tfoot className="checkout__totals-footer">
          <tr>
            <th>Total</th>
            <td>
              <Currency value={cart.total} />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

  renderPaymentsList() {
    const { payment: currentPayment } = this.state;

    const payments = this.payments.map((payment) => {
      const renderPayment = ({ setItemRef, setContentRef }) => (
        <li className="payment-methods__item" ref={setItemRef}>
          <label className="payment-methods__item-header">
            <span className="payment-methods__item-radio input-radio">
              <span className="input-radio__body">
                <input
                  type="radio"
                  className="input-radio__input"
                  name="checkout_payment_method"
                  value={payment.key}
                  checked={currentPayment === payment.key}
                  onChange={this.handlePaymentChange}
                />
                <span className="input-radio__circle" />
              </span>
            </span>
            <span className="payment-methods__item-title">{payment.title}</span>
          </label>
          <div className="payment-methods__item-container" ref={setContentRef}>
            <div className="payment-methods__item-description text-muted">
              {payment.description}
            </div>
          </div>
        </li>
      );

      return (
        <Collapse
          key={payment.key}
          open={currentPayment === payment.key}
          toggleClass="payment-methods__item--active"
          render={renderPayment}
        />
      );
    });

    return (
      <div className="payment-methods">
        <ul className="payment-methods__list">{payments}</ul>
      </div>
    );
  }
  handlePlaceHolder = () => {
    const { payment, addressId } = this.state;
    if (addressId === null) {
      NotificationManager.error("Please select on address field");
    } else {
      const { cart } = this.props;
      const product = [];
      cart.items?.forEach((value) => {
        const prod = {
          varientId: value.product.ProductId,
          productName: value.product.Name,
          netPrice: value.product.netPrice,
          quantity: value.quantity,
        };
        product.push(prod);
      });
      const OrderDetail = {
        payment: payment,
        addressId: addressId,
        shippingPrice: cart.extraLines[0].price,
        total: cart.total,
        cart: product,
      };
      this.setState({ newCart: OrderDetail });
    }
  };
  render() {
    const { cart, CreateOrderDetail } = this.props;
    const { userData } = this.state;
    const address = [];
    const { payment, addressId } = this.state;
    if (cart.items.length < 1) {
      return <Redirect to="cart" />;
    }

    const breadcrumb = [
      { title: "Home", url: "" },
      { title: "Shopping Cart", url: "/shop/cart" },
      { title: "Checkout", url: "" },
    ];
    const containerClasses = classNames("product-card", {
      "btn btn-primary btn-xl btn-block": "grid-sm",
    });
    // ORDER DETAIL
    const product = [];
    cart.items?.forEach((value) => {
      const prod = {
        thumbnail: value.product.Thumbnail,
        productId:
          value.product && value.product.ProductId
            ? value.product.ProductId
            : value.product.productId,
        varientId:
          value.product && value.product.VarientId
            ? value.product.VarientId
            : value.product.id,
        productName: value.product.Name,
        netPrice: value.product.netPrice,
        quantity: value.quantity,
      };
      product.push(prod);
    });
    const OrderDetail = {
      payment: payment,
      addressId: addressId,
      shippingPrice: cart.extraLines[0].price,
      total: cart.total,
      cart: product,
    };
    return (
      <React.Fragment>
        <Helmet>
          <title>{`Checkout — ${theme.name}`}</title>
        </Helmet>

        <PageHeader header="Checkout" breadcrumb={breadcrumb} />

        <div className="checkout block">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="alert alert-primary alert-lg">
                  <b>{userData?.firstName}</b> {userData?.email}
                </div>
              </div>

              <div className="col-12 col-lg-6 col-xl-7">
                <div className="card mb-lg-0">
                  <div className="card-body">
                    <h3 className="card-title">Billing details</h3>
                    <div className="row">
                      {userData &&
                      userData.Addresses &&
                      userData.Addresses.length
                        ? userData.Addresses.map((address, index) => (
                            <div
                              className="col-sm-12 col-md-6 col-lg-6 "
                              key={index}
                            >
                              <div
                                className="card address-card address-card--featured grey"
                                onClick={() => this.selectAddress(address)}
                                style={
                                  this.state.addressId === address.id
                                    ? { background: this.state.bgColor }
                                    : null
                                }
                              >
                                {this.state.addressId === address.id ? (
                                  <div className="address-card__badge pl-2">
                                    Selected Address
                                    <i
                                      className="fa fa-check"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                ) : (
                                  <div className="address-card__badgee--muted">
                                    Click Address{" "}
                                    <i
                                      className="fa fa-check pl-2"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                )}
                                <div className="address-card__body">
                                  <div className="address-card__name">{`${userData?.firstName} ${userData?.lastName}`}</div>
                                  <div className="address-card__row">
                                    {address.shipping}
                                    <br />,{address.city}
                                    <br />
                                  </div>
                                  <div className="address-card__row">
                                    <div className="address-card__row-title">
                                      Phone Number
                                    </div>
                                    <div className="address-card__row-content">
                                      {address.phone}
                                    </div>
                                  </div>
                                  <div className="address-card__row">
                                    <div className="address-card__row-title">
                                      Email Address
                                    </div>
                                    <div className="address-card__row-content">
                                      {userData?.email}
                                    </div>
                                  </div>
                                  <div className="address-card__footer">
                                    {/* <button className="btn btn-danger">
                                  <i
                                    className="far fa-trash-alt m-1"
                                    onClick={() => handlDeleteById(address.id)}
                                  ></i>
                                </button> */}
                                    {/* <Link to="/account/addresses/5">Edit Address</Link> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className="card-divider" />
                  <div className="card-body">
                    <div className="dropcart__buttons">
                      <Addaddress />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                <div className="card mb-0">
                  <div className="card-body">
                    <h3 className="card-title">Your Order</h3>

                    {this.renderCart()}

                    {this.renderPaymentsList()}

                    <div className="checkout__agree form-group">
                      <div className="form-check">
                        <span className="form-check-input input-check">
                          <span className="input-check__body">
                            <input
                              className="input-check__input"
                              type="checkbox"
                              id="checkout-terms"
                            />
                            <span className="input-check__box" />
                            <Check9x7Svg className="input-check__icon" />
                          </span>
                        </span>
                        <label
                          className="form-check-label"
                          htmlFor="checkout-terms"
                        >
                          I have read and agree to the website
                          <Link to="site/terms">terms and conditions</Link>*
                        </label>
                      </div>
                    </div>
                    <div className={containerClasses}>
                      <AsyncAction
                        action={() => CreateOrderDetail(OrderDetail)}
                        render={({ run, loading }) => (
                          <button
                            type="button"
                            onClick={run}
                            className={classNames(
                              "btn btn-primary btn-xl btn-block",
                              {
                                "btn-loading": loading,
                              }
                            )}
                            disabled={!payment}
                          >
                            Place Order
                          </button>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  userData: state.user,
});

const mapDispatchToProps = {
  CreateOrderDetail,
  fetchUserDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCheckout);
