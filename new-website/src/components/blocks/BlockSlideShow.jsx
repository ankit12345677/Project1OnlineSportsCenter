// react
import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import departmentsAria from "../../workflow/departmentsArea";
import StroykaSlick from "../shared/StroykaSlick";
import shopApi from "../../api/shop";
import { history } from "../../helpers/history";

const slickSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  arrows: false,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class BlockSlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = { slides: [], slides_mobile: [], width: window.innerWidth };
  }
  departmentsAreaRef = null;

  media = window.matchMedia("(min-width: 992px)");
  getBannerList() {
    let canceled = false;
    const isMobile = this.state.width <= 763;
    let type;
    if (!isMobile) {
      type = 0;
      shopApi.getBannerList({ depth: 1, type: type }).then((list) => {
        if (canceled) {
          return;
        }
        this.setState({ slides: list.data });
      });
    } else {
      type = 1;
      shopApi.getBannerList({ depth: 1, type: type }).then((list) => {
        if (canceled) {
          return;
        }
        this.setState({ slides_mobile: list.data });
      });
    }

    return () => {
      canceled = true;
    };
  }
  componentDidMount() {
    this.getBannerList();
    if (this.media.addEventListener) {
      this.media.addEventListener("change", this.onChangeMedia);
    } else {
      // noinspection JSDeprecatedSymbols
      this.media.addListener(this.onChangeMedia);
    }
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    departmentsAria.area = null;

    if (this.media.removeEventListener) {
      this.media.removeEventListener("change", this.onChangeMedia);
    } else {
      // noinspection JSDeprecatedSymbols
      this.media.removeListener(this.onChangeMedia);
    }
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  onChangeMedia = () => {
    if (this.media.matches) {
      departmentsAria.area = this.departmentsAreaRef;
    }
  };

  setDepartmentsAreaRef = (ref) => {
    this.departmentsAreaRef = ref;

    if (this.media.matches) {
      departmentsAria.area = this.departmentsAreaRef;
    }
  };
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    const { withDepartments } = this.props;
    const isMobile = this.state.width <= 763;
    const blockClasses = classNames("block-slideshow block", {
      "block-slideshow--layout--full": !withDepartments,
      "block-slideshow--layout--with-departments": withDepartments,
    });

    const layoutClasses = classNames("col-12", {
      "col-lg-12": !withDepartments,
      "col-lg-9": withDepartments,
    });
    const slides = this.state.slides.map((slide, index) => {
      return (
        <Card key={index} className="block-slideshow__slide">
          <CardMedia
            className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
            style={{
              backgroundImage: `url(${slide.banner})`,
            }}
          />
          <CardMedia
            className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
            style={{
              backgroundImage: `url(${slide.banner})`,
            }}
            onClick={() => history.push(`shop/catalog/${slide.slug}`)}
          />

          <div className="block-slideshow__slide-content">
            <CardMedia
              className={
                slide.slug ? "block-slideshow__slide-button" : "d-none"
              }
            ></CardMedia>
          </div>
        </Card>
      );
    });
    const slides_mob = this.state.slides_mobile?.map((slide, index) => {
      return (
        <Card
          className="m-1"
          key={index}
          style={{ marginTop: "-1rem !important" }}
          onClick={() => {
            history.push(`shop/catalog/${slide.slug}`);
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={slide.banner}
            alt={slide.slug}
          />
        </Card>
      );
    });
    return (
      <div className={blockClasses}>
        <div className="container">
          <div className="row">
            {withDepartments && (
              <div
                className="col-3 d-lg-block d-none"
                ref={this.setDepartmentsAreaRef}
              />
            )}

            <div className={layoutClasses}>
              <div className="block-slideshow__body">
                <StroykaSlick {...slickSettings}>
                  {!isMobile ? slides : slides_mob}
                </StroykaSlick>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlockSlideShow.propTypes = {
  withDepartments: PropTypes.bool,
  /** current locale */
  locale: PropTypes.string,
};

BlockSlideShow.defaultProps = {
  withDepartments: false,
};

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(BlockSlideShow);
