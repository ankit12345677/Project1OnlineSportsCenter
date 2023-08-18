// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { history } from "../../helpers/history";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import ProductGallery from "./ProductGallery";
// import Rating from './Rating';
import { cartAddItem, cartBuyItem } from "../../store/cart";
import { compareAddItem } from "../../store/compare";
import { Wishlist16Svg, Compare16Svg } from "../../svg";
import { wishlistAddItem } from "../../store/wishlist";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
  }

  handleChangeQuantity = (quantity) => {
    this.setState({ quantity });
  };
  handleChangeColor = async (variant) => {
    history.push(`/shop/products/${variant.ProductId}/${variant.slug}`);
    window.location.reload();
  };
  handleChangeBySize = async (variant) => {
    history.push(`/shop/products/${variant.ProductId}/${variant.slug}`);
    window.location.reload();
  };
  render() {
    const {
      product,
      layout,
      wishlistAddItem,
      compareAddItem,
      cartAddItem,
      cartBuyItem,
    } = this.props;
    const { quantity } = this.state;
    let prices;
    if (product) {
      prices = (
        <div className="product-card__prices">
          <span className="product-card__new-price">
            <Currency value={product.netPrice} />
          </span>{" "}
          {product.discount && product.discountPer ? (
            <span className="product-card__old-price">
              <Currency value={product.distributorPrice} />
            </span>
          ) : null}{" "}
          {product.discount && product.discountPer ? (
            <span className="product-card__Save-price">
              {product.discountPer + "% " + "off"}
            </span>
          ) : null}
        </div>
      );
    } else {
      prices = <Currency value={product.netPrice} />;
    }

    return (
      <div className={`product product--layout--${layout}`}>
        <div className="product__content">
          <ProductGallery layout={layout} images={product.Photo} />

          <div className="product__info">
            <div className="product__wishlist-compare">
              <AsyncAction
                action={() => wishlistAddItem(product)}
                render={({ run, loading }) => (
                  <button
                    type="button"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Wishlist"
                    onClick={run}
                    className={classNames("btn btn-sm btn-light btn-svg-icon", {
                      "btn-loading": loading,
                    })}
                  >
                    <Wishlist16Svg />
                  </button>
                )}
              />
              <AsyncAction
                action={() => compareAddItem(product)}
                render={({ run, loading }) => (
                  <button
                    type="button"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Compare"
                    onClick={run}
                    className={classNames("btn btn-sm btn-light btn-svg-icon", {
                      "btn-loading": loading,
                    })}
                  >
                    <Compare16Svg />
                  </button>
                )}
              />
            </div>
            <h1 className="product__name">{product.Name}</h1>
            {/* <div className="product__rating">
                            <div className="product__rating-stars">
                                <Rating value={product.rating} />
                            </div>
                            <div className="product__rating-legend">
                                <Link to="/">{`${product.reviews} Reviews`}</Link>
                                <span>/</span>
                                <Link to="/">Write A Review</Link>
                            </div>
                        </div> */}
            <div className="product__description">
              {product.HighLightDetail?.map((attribute, index) => (
                <li key={index}>{attribute.title}</li>
              ))}
            </div>
            <ul className="product__features">
              {product.HighLightDetail?.map((attribute, index) => (
                <li key={index}>{attribute.title}</li>
              ))}
            </ul>
            <ul className="product__meta">
              <li className="product__meta-availability">
                Availability: <span className="text-success">In Stock</span>
              </li>
              <li>
                Brand:
                <a href={`shop/catalog/${product.BrandName}`}>
                  {" "}
                  {product.BrandName}
                </a>
              </li>
              <li>
                SoldBy:{" "}
                <a href={`shop/catalog/${product.SoldBy}`}> {product.SoldBy}</a>
              </li>
            </ul>
            <ul className="product__meta">
              <li className="product__meta-availability">
                WarrantyType : {product.WarrantyType}
              </li>
              <li className="product__meta-availability">
                WarrantyPeriod : {product.WarrantyPeriod}
              </li>
            </ul>
          </div>

          <div className="product__sidebar">
            <div className="product__availability">
              Availability: <span className="text-success">In Stock</span>
            </div>

            <div className="product__prices">{prices}</div>

            <form className="product__options">
              <div
                className={
                  product.colorList && product.colorList.length
                    ? "form-group product__option"
                    : "d-none"
                }
              >
                <div className="product__option-label">Color</div>
                <div className="input-radio-color">
                  <div className="input-radio-color__list">
                    {product.colorList?.map((attribute, index) => (
                      <label
                        key={index}
                        className="input-radio-color__item input-radio-color__item--white"
                        style={{ color: `${attribute.CODE}` }}
                        data-toggle="tooltip"
                        title={attribute.TITLE}
                      >
                        <input
                          type="radio"
                          name="color"
                          checked={attribute.id === product.ColorDetail.id}
                          onClick={() => this.handleChangeColor(attribute)}
                        />
                        <span />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={
                  product.sizeList && product.sizeList.length
                    ? "form-group product__option"
                    : "d-none"
                }
              >
                <div className="product__option-label">Size</div>
                <div className="input-radio-label">
                  <div className="input-radio-label__list">
                    {product.sizeList?.map((attribute, index) => (
                      <label key={index}>
                        <input
                          type="radio"
                          name="material"
                          checked={attribute.size === product.SizeDetail}
                          onClick={() => this.handleChangeBySize(attribute)}
                        />
                        <span>{attribute.size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group product__option">
                <div className="product__actions">
                  <div className="product__actions-item product__actions-item--addtocart">
                    <AsyncAction
                      action={() => cartAddItem(product, [], quantity)}
                      render={({ run, loading }) => (
                        <Button
                          outline
                          color="info"
                          onClick={run}
                          disabled={!quantity}
                          className={classNames("btn  btn-lg", {
                            "btn-loading": loading,
                          })}
                        >
                          <i
                            className="fa fa-shopping-bag"
                            aria-hidden="true"
                          ></i>{" "}
                          Add To Bag
                        </Button>
                      )}
                    />
                  </div>
                  <div className="product__actions-item product__actions-item--addtocart">
                    <AsyncAction
                      action={() => cartBuyItem(product, [], quantity)}
                      render={({ run, loading }) => (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={run}
                          disabled={!quantity}
                          className={classNames("btn  btn-lg", {
                            "btn-loading": loading,
                          })}
                        >
                          Buy Now
                        </Button>
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="product__footer">
            {/* <div className="product__tags tags">
                            <div className="tags__list">
                                <Link to="/">Mounts</Link>
                                <Link to="/">Electrodes</Link>
                                <Link to="/">Chainsaws</Link>
                            </div>
                        </div>

                        <div className="product__share-links share-links">
                            <ul className="share-links__list">
                                <li className="share-links__item share-links__item--type--like"><Link to="/">Like</Link></li>
                                <li className="share-links__item share-links__item--type--tweet"><Link to="/">Tweet</Link></li>
                                <li className="share-links__item share-links__item--type--pin"><Link to="/">Pin It</Link></li>
                                <li className="share-links__item share-links__item--type--counter"><Link to="/">4K</Link></li>
                            </ul>
                        </div> */}
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  /** product object */
  product: PropTypes.object.isRequired,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

Product.defaultProps = {
  layout: "standard",
};

const mapDispatchToProps = {
  cartAddItem,
  wishlistAddItem,
  compareAddItem,
  cartBuyItem,
};

export default withRouter(connect(() => ({}), mapDispatchToProps)(Product));
