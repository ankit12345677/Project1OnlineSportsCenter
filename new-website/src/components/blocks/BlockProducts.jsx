// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import BlockHeader from '../shared/BlockHeader';
import ProductCard from '../shared/ProductCard';

export default function BlockProducts(props) {
    const {
        title,
        layout,
        featuredProduct,
        products,
    } = props;

    let large;
    let smalls;

    if (featuredProduct) {
        large = (
            <div className="block-products__featured">
                <div className="block-products__featured-item">
                    <ProductCard product={featuredProduct} />
                </div>
            </div>
        );
    }

    if (products.length > 0) {
        const productsList = products.slice(3, 9).map((product, index) => (
            <div key={index} className="block-products__list-item">
                <ProductCard product={product} />
            </div>
        ));

        smalls = (
            <div className="block-products__list">
                {productsList}
            </div>
        );
    }

    return (
        <div className={`block block-products block-products--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-products__body">
                    {layout === 'large-first' && large}
                    {smalls}
                    {layout === 'large-last' && large}
                </div>
                <div className="category-card__all">
                    <Link to={`/shop/catalog/women`}>Show All</Link>
                </div>
            </div>
        </div>
    );
}

BlockProducts.propTypes = {
    title: PropTypes.string.isRequired,
    featuredProduct: PropTypes.object,
    products: PropTypes.array,
    layout: PropTypes.oneOf(['large-first', 'large-last']),
};

BlockProducts.defaultProps = {
    products: [],
    layout: 'large-first',
};
