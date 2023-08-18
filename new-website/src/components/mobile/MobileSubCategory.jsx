// react
import React from "react";
// third-party
import PropTypes from "prop-types";

// application
import AppLink from "../shared/AppLink";
import Collapse from "../shared/Collapse";
import { history } from "../../helpers/history";

function MobileSubCategory(props) {
  const { links, level, onItemClick } = props;
  const handleItemClick = (item, link) => {
    if (onItemClick) {
      onItemClick(item);
    }
    history.push("/shop/catalog/" + link.slug);
  };
  const linksList = links?.map((link, index) => {
    let item;

    if (link.sub_name) {
      item = (
        <Collapse
          toggleClass="mobile-links__item--open"
          render={({ setItemRef }) => {
            let arrow;
            let linkOrButton;

            if (link.slug) {
              linkOrButton = (
                <AppLink
                  to={"/shop/catalog/" + link.slug}
                  className="mobile-links__item-link"
                  onClick={() => handleItemClick("link", link)}
                >
                  {link.sub_name}
                </AppLink>
              );
            } else {
              linkOrButton = (
                <button
                  type="button"
                  className="mobile-links__item-link"
                  onClick={() => handleItemClick(link)}
                  level={level + 1}
                >
                  {link.sub_name}
                </button>
              );
            }

            return (
              <div className="mobile-links__item" ref={setItemRef}>
                <div className="mobile-links__item-title">
                  {linkOrButton}
                  {arrow}
                </div>
              </div>
            );
          }}
        />
      );
    } else if (link.type === "divider") {
      item = <div className="mobile-links__divider" />;
    }

    return <li key={index}>{item}</li>;
  });

  return (
    <ul className={`mobile-links mobile-links--level--${level}`}>
      {linksList}
    </ul>
  );
}

MobileSubCategory.propTypes = {
  links: PropTypes.array,
  level: PropTypes.number,
  onItemClick: PropTypes.func,
};

MobileSubCategory.defaultProps = {
  links: [],
  level: 0,
};

export default MobileSubCategory;
