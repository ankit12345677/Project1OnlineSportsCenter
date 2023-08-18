// react
import React, { useEffect, useState } from "react";
// third-party
import PropTypes from "prop-types";

// application
import MobileSideBarCategory from "./MobileSidebarCategory";
import MobileAccount from "./MobileAccount";
import AppLink from "../shared/AppLink";
import Collapse from "../shared/Collapse";
import { ArrowRoundedDown12x7Svg } from "../../svg";
import shopApi from "../../api/shop";
import { history } from "../../helpers/history";
function useCategories() {
  const [categories, setCategories] = useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 800) {
      let canceled = false;
      shopApi.getCategories({ depth: 1 }).then((list) => {
        if (canceled) {
          return;
        }
        setCategories(list.data);
      });

      return () => {
        canceled = true;
      };
    }
  }, []);

  return categories;
}
function MobileLinks(props) {
  const { links, level, onItemClick } = props;
  const categories = useCategories();
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.url) {
      history.push(item.url);
    }
  };
  const linksList = links.map((link, index) => {
    let item;
    if (link.type === "link" || link.type === "button") {
      item = (
        <Collapse
          toggleClass="mobile-links__item--open"
          render={({ toggle, setItemRef, setContentRef }) => {
            let arrow;
            let subLinks;
            let linkOrButton;
            arrow = (
              <button
                className="mobile-links__item-toggle"
                type="button"
                onClick={toggle}
              >
                <ArrowRoundedDown12x7Svg className="mobile-links__item-arrow" />
              </button>
            );
            if (link.label === "Categories") {
              subLinks = (
                <div
                  className="mobile-links__item-sub-links"
                  ref={setContentRef}
                >
                  <MobileSideBarCategory
                    level={level + 1}
                    links={categories}
                    onItemClick={handleItemClick}
                  />
                </div>
              );
            }
            if (link.label === "Account") {
              subLinks = (
                <div
                  className="mobile-links__item-sub-links"
                  ref={setContentRef}
                >
                  <MobileAccount level={level + 1} onItemClick={onItemClick} />
                </div>
              );
            }
            if (link.children && link.children.length > 0) {
              subLinks = (
                <div
                  className="mobile-links__item-sub-links"
                  ref={setContentRef}
                >
                  <MobileLinks
                    links={link.children}
                    level={level + 1}
                    onItemClick={onItemClick}
                  />
                </div>
              );
            }
            if (link.type === "link") {
              linkOrButton = (
                <AppLink
                  // to={link.url}
                  className="mobile-links__item-link"
                  onClick={() => handleItemClick(link)}
                >
                  {link.label}
                </AppLink>
              );
            } else {
              linkOrButton = (
                <button
                  type="button"
                  className="mobile-links__item-link"
                  onClick={() => handleItemClick(link)}
                >
                  {link.label}
                </button>
              );
            }

            return (
              <div className="mobile-links__item" ref={setItemRef}>
                <div className="mobile-links__item-title">
                  {linkOrButton}
                  {arrow}
                </div>
                {subLinks}
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

MobileLinks.propTypes = {
  links: PropTypes.array,
  level: PropTypes.number,
  onItemClick: PropTypes.func,
};

MobileLinks.defaultProps = {
  links: [],
  level: 0,
};

export default MobileLinks;
