// react
import React from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
// import Rating from './Rating';
import { cartAddItem } from "../../store/cart";
import { Compare16Svg, Quickview16Svg, Wishlist16Svg } from "../../svg";
import { compareAddItem } from "../../store/compare";
import { quickviewOpen } from "../../store/quickview";
import { url } from "../../workflow/utils";
import { wishlistAddItem } from "../../store/wishlist";

function ProductCard(props) {
  const {
    product,
    layout,
    quickviewOpen,
    cartAddItem,
    wishlistAddItem,
    // compareAddItem,
  } = props;
  const containerClasses = classNames("product-card", {
    "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
    "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
    "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
    "product-card--layout--list": layout === "list",
    "product-card--layout--horizontal": layout === "horizontal",
  });

  let badges = [];
  let image;
  let price;
  let features;

  if (product && product.badges) {
    if (product.badges.includes("flash")) {
      badges.push(
        <div
          key="sale"
          className="product-card__badge product-card__badge--sale"
        >
          Flash
        </div>
      );
    }
    if (product.badges.includes("hot")) {
      badges.push(
        <div key="hot" className="product-card__badge product-card__badge--hot">
          Hot
        </div>
      );
    }
    if (product.badges.includes("new")) {
      badges.push(
        <div key="new" className="product-card__badge product-card__badge--new">
          New
        </div>
      );
    }
  }

  badges =
    badges && badges.length ? (
      <div className="product-card__badges-list">{badges}</div>
    ) : null;

  if (product.Thumbnail) {
    image = (
      <CardMedia className="product-card__image product-image">
        <Link to={url.product(product)} className="product-image__body">
          <img
            className="product-image__img"
            src={product.Thumbnail}
            alt={product.productName}
          />
        </Link>
      </CardMedia>
    );
  }

  if (product.netPrice && product.distributorPrice) {
    price = (
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
    price = (
      <div className="product-card__prices">
        <Currency value={product.netPrice} />
      </div>
    );
  }

  if (product.HighLightDetail && product.HighLightDetail.length) {
    features = (
      <ul className="product-card__features-list">
        {product.HighLightDetail.map((attribute, index) => (
          <li key={index}>{attribute.title}</li>
        ))}
      </ul>
    );
  }
  return (
    <Card className={containerClasses}>
      <AsyncAction
        action={() => quickviewOpen(product)}
        render={({ run, loading }) => (
          <button
            type="button"
            onClick={run}
            className={classNames("product-card__quickview", {
              "product-card__quickview--preload": loading,
            })}
          >
            <Quickview16Svg />
          </button>
        )}
      />
      {badges}
      {image}
      <div className="product-card__info">
        <div className="product-card__name">
          <Link to={url.product(product)}>{product.Name}</Link>
        </div>
        {/* <div className="product-card__rating">
                    <Rating value={product.rating} />
                    <div className=" product-card__rating-legend">{`${product.reviews} Reviews`}</div>
                </div> */}
        {features}
      </div>
      <div className="product-card__actions">
        <div className="product-card__availability">
          Availability:
          <span className="text-success">In Stock</span>
        </div>
        {price}
        <div className="product-card__buttons">
          <AsyncAction
            action={() => cartAddItem(product)}
            render={({ run, loading }) => (
              <React.Fragment>
                <button
                  type="button"
                  onClick={run}
                  className={classNames(
                    "btn btn-primary product-card__addtocart",
                    {
                      "btn-loading": loading,
                    }
                  )}
                >
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i> Add
                  To Bag
                </button>
              </React.Fragment>
            )}
          />
          <AsyncAction
            action={() => wishlistAddItem(product)}
            render={({ run, loading }) => (
              <button
                type="button"
                onClick={run}
                className={classNames(
                  "btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist",
                  {
                    "btn-loading": loading,
                  }
                )}
              >
                <Wishlist16Svg />
              </button>
            )}
          />
          {/* <AsyncAction
                        action={() => compareAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Compare16Svg />
                            </button>
                        )}
                    /> */}
        </div>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  /**
   * product object
   */
  product: PropTypes.object.isRequired,
  /**
   * product card layout
   * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
   */
  layout: PropTypes.oneOf([
    "grid-sm",
    "grid-nl",
    "grid-lg",
    "list",
    "horizontal",
  ]),
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  cartAddItem,
  wishlistAddItem,
  compareAddItem,
  quickviewOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
