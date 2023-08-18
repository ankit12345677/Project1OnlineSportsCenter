// react
import React, { useEffect, useState } from "react";
// third-party
import { Link } from "react-router-dom";
import { history } from "../../helpers/history";

// application
import Menu from "./Menu";
import { ArrowRoundedRight6x9Svg } from "../../svg";
import shopApi from "../../api/shop";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 800) {
      let canceled = false;
      shopApi.getCategories({ depth: 1 }).then((categories) => {
        if (canceled) {
          return;
        }
        setCategories(categories.data);
      });

      return () => {
        canceled = true;
      };
    }
  }, [setCategories]);

  return categories;
}

function DepartmentsLinks() {
  const categories = useCategories();
  const linksList = categories.map((department, index) => {
    let arrow = null;
    let submenu = null;
    let itemClass = "";

    if (department.catList) {
      arrow = <ArrowRoundedRight6x9Svg className="departments__link-arrow" />;
    }

    if (department.catList && department.catList.length) {
      itemClass = "departments__item--menu";
      submenu = (
        <div className="departments__menu">
          <Menu items={department.catList} />
        </div>
      );
    }
    return (
      <li key={index} className={`departments__item ${itemClass}`}>
        <a href={`/shop/catalog/${department.slug}`}>
          {department.name}
          {arrow}
        </a>
        {submenu}
      </li>
    );
  });

  return <ul className="departments__links">{linksList}</ul>;
}

export default DepartmentsLinks;
