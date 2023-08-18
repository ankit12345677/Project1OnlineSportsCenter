// react
import React, { Fragment } from "react";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// application
import { ArrowRoundedLeft6x9Svg } from "../../svg";
import { url } from "../../workflow/utils";

function FilterCategory(props) {
  const { data } = props;
  const categoriesList = data.items.map((category) => {
    // const itemClasses = classNames('filter-categories__item', {
    //     'filter-categories__item--current': data.value === category.slug,
    // });

    return (
      <Fragment key={category.id}>
        {data.items.map((parent) => (
          <li
            key={parent.id}
            className="filter-categories__item filter-categories__item--parent"
          >
            <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
            <Link to={url.category(parent)}>
              {parent.sub_name ? parent.sub_name : category.name}
            </Link>
          </li>
        ))}
        {category.SubCategories &&
          category.SubCategories.map((child) => (
            <li
              key={child.id}
              className="filter-categories__item filter-categories__item--child"
            >
              <Link to={url.category(child)}>{child.sub_name}</Link>
            </li>
          ))}
        {category.SubChildCategories &&
          category.SubChildCategories.map((child) => (
            <li
              key={child.id}
              className="filter-categories__item filter-categories__item--child"
            >
              <Link to={url.category(child)}>{child.name}</Link>
            </li>
          ))}
      </Fragment>
    );
  });
  return (
    <div className="filter-categories">
      <ul className="filter-categories__list">{categoriesList}</ul>
    </div>
  );
}

FilterCategory.propTypes = {
  /**
   * Filter object.
   */
  data: PropTypes.object,
};

export default FilterCategory;
