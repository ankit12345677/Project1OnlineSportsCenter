// react
import React, { Component } from "react";
// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import Card from "@mui/material/Card";
//import CardMedia from "@mui/material/CardMedia";
// application
//import { history } from "../../helpers/history";

//import StroykaSlick from "../shared/StroykaSlick";
// const slickSettings = {
//   arrows: false,
//   dots: true,
//   autoplay: true,
//   infinite: false,
//   speed: 700,
//   slidesToShow: 4,
//   slidesToScroll: 4,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

class BlockMultiSlideShow extends Component {
  render() {
    const { withDepartments } = this.props;
    const blockClasses = classNames("block-slideshow block", {
      "block-slideshow--layout--full": !withDepartments,
      "block-slideshow--layout--with-departments": withDepartments,
    });

    // const layoutClasses = classNames("col-12", {
    //   "col-lg-12": !withDepartments,
    //   "col-lg-9": withDepartments,
    // });
    return (
      <div className={blockClasses}>
        {/* <div className="container">
          <div className="row">
            <div className={layoutClasses}>
              <StroykaSlick {...slickSettings}>
                <Card
                  className="m-1"
                  onClick={() => {
                    history.push("/shop/catalog/accessories");
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="accessories"
                    image="https://res.cloudinary.com/ddkyepakx/image/upload/v1654603886/ecommerce/Accessories.png"
                  />
                </Card>
                <Card
                  className="m-1"
                  onClick={() => {
                    history.push("/shop/catalog/android");
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="android"
                    image="https://res.cloudinary.com/ddkyepakx/image/upload/v1654603885/ecommerce/Andrrod_Mobiles.png"
                  />
                </Card>
                <Card
                  className="m-1"
                  onClick={() => {
                    history.push("/shop/catalog/kiss-beauty");
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="kiss-beauty"
                    image="https://res.cloudinary.com/ddkyepakx/image/upload/v1654603885/ecommerce/Kiss_beauty.png"
                  />
                </Card>
                <Card
                  className="m-1"
                  onClick={() => {
                    history.push("/shop/catalog/grocery-and-staples");
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="grocery-and-staples"
                    image="https://res.cloudinary.com/ddkyepakx/image/upload/v1654603886/ecommerce/Groceies.png"
                  />
                </Card>
              </StroykaSlick>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

BlockMultiSlideShow.propTypes = {
  withDepartments: PropTypes.bool,
  /** current locale */
  locale: PropTypes.string,
};

BlockMultiSlideShow.defaultProps = {
  withDepartments: false,
};

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default BlockMultiSlideShow;
