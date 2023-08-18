// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import BlockFlashSaleHeader from "../shared/BlockFlashSaleHeader";
import ProductCard from "../shared/ProductCard";
import StroykaSlick from "../shared/StroykaSlick";

const slickSettings = {
  "grid-4": {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  "grid-4-sm": {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 474,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  },
  "grid-5": {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  },
  horizontal: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
};

export default class BlockFlashSaleCarousel extends Component {
  handleNextClick = () => {
    if (this.slickRef) {
      this.slickRef.slickNext();
    }
  };

  handlePrevClick = () => {
    if (this.slickRef) {
      this.slickRef.slickPrev();
    }
  };

  setSlickRef = (ref) => {
    this.slickRef = ref;
  };

  productsColumns() {
    const columns = [];
    const { rows } = this.props;
    let { products } = this.props;
    let productArr = [];
    products.forEach((value) => {
      productArr = productArr.concat(value.product);
    });
    if (rows > 0) {
      productArr = productArr.slice();

      while (productArr.length > 0) {
        columns.push(productArr.splice(0, rows));
      }
    }
    return columns;
  }
  flashSaleColumns() {
    let { products } = this.props;
    return products;
  }
  render() {
    const { layout, withSidebar, onGroupClick, groups, loading } = this.props;
    const columns = this.productsColumns().map((column, index) => {
      const products = column.map((product) => (
        <div key={product.id} className="block-products-carousel__cell">
          <ProductCard product={product} />
        </div>
      ));

      return (
        <div key={index} className="block-products-carousel__column">
          {products}
        </div>
      );
    });
    const header = this.flashSaleColumns().map((column, index) => {
      return (
        <BlockFlashSaleHeader
          key={index}
          title={column.title}
          startDate={column.startDate}
          endDate={column.endDate}
          groups={groups}
          arrows
          onNext={this.handleNextClick}
          onPrev={this.handlePrevClick}
          onGroupClick={onGroupClick}
        />
      );
    });
    const blockClasses = classNames("block block-products-carousel", {
      "block-products-carousel--loading": loading,
      "block-products-carousel--has-items": columns.length > 0,
    });
    const containerClasses = classNames({
      container: !withSidebar,
    });

    return (
      <div className={blockClasses} data-layout={layout}>
        {this.props.products && this.props.products.length ? (
          <div className={containerClasses}>
            {header}

            <div className="block-products-carousel__slider">
              <div className="block-products-carousel__preloader" />

              <StroykaSlick ref={this.setSlickRef} {...slickSettings[layout]}>
                {columns}
              </StroykaSlick>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

BlockFlashSaleCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(["grid-4", "grid-4-sm", "grid-5", "horizontal"]),
  rows: PropTypes.number,
  products: PropTypes.array,
  groups: PropTypes.array,
  withSidebar: PropTypes.bool,
  loading: PropTypes.bool,
  onGroupClick: PropTypes.func,
};

BlockFlashSaleCarousel.defaultProps = {
  layout: "grid-4",
  rows: 1,
  products: [],
  groups: [],
  withSidebar: false,
  loading: false,
  onGroupClick: undefined,
};
