// react
import React, { useEffect, useState } from "react";
// third-party
import PropTypes from "prop-types";
import "./category.css";
import shopApi from "../../api/shop";
import { Link } from "react-router-dom";
import { url } from "../../workflow/utils";

import { Card } from "@mui/material";
function MobileCategory() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let canceled = false;
    shopApi.getPopulatCategory({ depth: 1 }).then((list) => {
      if (canceled) {
        return;
      }
      setCategories(list.data);
    });

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (windowWidth > 650) {
    return true;
  }
  return (
    <div className="product-catagories-wrapper p-1">
      <div className="container">
        <div className="section-heading">
          <h6>Popular Categories</h6>
        </div>
        <div className="product-catagory-wrap">
          <div className="row g-3">
            {categories && categories.length
              ? categories?.map((row, index) => (
                  <div className="col-4 mt-2" key={index}>
                    <Card className="m-1">
                      <Link to={url.category(row)}>
                        <div className="card catagory-card">
                          <div className="card-body img-card">
                            <img
                              src={row.thumbnail}
                              style={{ height: "11vh" }}
                            />
                            <h6 className="title pt-1 ">{row.name}</h6>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

MobileCategory.propTypes = {
  links: PropTypes.array,
  level: PropTypes.number,
  onItemClick: PropTypes.func,
};

MobileCategory.defaultProps = {
  links: [],
  level: 0,
};

export default MobileCategory;
