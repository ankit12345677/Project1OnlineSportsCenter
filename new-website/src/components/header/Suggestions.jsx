// react
import React from "react";

// third-party
import classNames from "classnames";

// application
// import AsyncAction from '../shared/AsyncAction';
import { url } from "../../workflow/utils";
import { history } from "../../helpers/history";
function Suggestions(props) {
  const { context, className, products, onClose } = props;
  const rootClasses = classNames(
    `suggestions suggestions--location--${context}`,
    className
  );

  const list =
    products &&
    products.slice(0, 10).map((product) => (
      <li key={product.id} className="suggestions__item">
        {product.thumbnail && (
          <div className="suggestions__item-image product-image">
            <div className="product-image__body">
              <img
                className="product-image__img"
                src={product.thumbnail}
                alt={product.name}
              />
            </div>
          </div>
        )}
        <div className="suggestions__item-info">
          <span
            className="suggestions__item-name"
            onClick={(event) => [
              onClose(),
              history.push(url.category(product)),
            ]}
          >
            {product.name}
          </span>
          <div className="suggestions__item-meta">SKU: 83690/32</div>
        </div>
      </li>
    ));

  return (
    <div className={rootClasses}>
      <ul className="suggestions__list">{list}</ul>
    </div>
  );
}

export default Suggestions;
