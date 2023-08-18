// react
import React from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// application
import AppLink from "../shared/AppLink";
import languages from "../../i18n";
// import Megamenu from './Megamenu';
// import Menu from './Menu';
// import { ArrowRoundedDown9x6Svg } from '../../svg';

// data stubs
import navLinks from "../../data/headerNavigation";

function NavLinks(props) {
  const handleMouseEnter = (event) => {
    const { locale } = props;
    const { direction } = languages[locale];

    const item = event.currentTarget;
    const megamenu = item.querySelector(".nav-links__megamenu");

    if (megamenu) {
      const container = megamenu.offsetParent;
      const containerWidth = container.getBoundingClientRect().width;
      const megamenuWidth = megamenu.getBoundingClientRect().width;
      const itemOffsetLeft = item.offsetLeft;

      if (direction === "rtl") {
        const itemPosition =
          containerWidth -
          (itemOffsetLeft + item.getBoundingClientRect().width);

        const megamenuPosition = Math.round(
          Math.min(itemPosition, containerWidth - megamenuWidth)
        );

        megamenu.style.left = "";
        megamenu.style.right = `${megamenuPosition}px`;
      } else {
        const megamenuPosition = Math.round(
          Math.min(itemOffsetLeft, containerWidth - megamenuWidth)
        );

        megamenu.style.right = "";
        megamenu.style.left = `${megamenuPosition}px`;
      }
    }
  };

  const linksList = navLinks.map((item, index) => {
    const classes = classNames("nav-links__item", {
      "nav-links__item--with-submenu": item.submenu,
    });

    return (
      <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
        {item.title === "Beauty & Parlour" ? (
          <a href={item.url} {...item.props} target="_blank">
            <span>{item.title}</span>
          </a>
        ) : (
          <AppLink to={item.url} {...item.props}>
            <span>{item.title}</span>
          </AppLink>
        )}
      </li>
    );
  });

  return <ul className="nav-links__list">{linksList}</ul>;
}

NavLinks.propTypes = {
  /** current locale */
  locale: PropTypes.string,
};

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(NavLinks);
