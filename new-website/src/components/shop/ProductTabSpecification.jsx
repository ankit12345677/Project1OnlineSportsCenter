// react
import React from 'react';
function ProductTabSpecification(props) {
    const { product } = props;
    return (
        <div className="spec">
            <h4 className="spec__section-title">General</h4>
            {product.Specification?.map((feature, index) => (
            <div key={index} className="spec__row">
                <div className="spec__name">{feature.type}</div>
                <div className="spec__value">{feature.value}</div>
            </div>
        ))}
        </div>
    );
}

export default ProductTabSpecification;
