// react
import React from 'react';

function ProductTabDescription(props) {
    const { product } = props;
    return (
        <div className="typography">
            {/* <h3>Product Full Description</h3> */}
            <p dangerouslySetInnerHTML={{__html: product.LongDesc}}>
            </p>
        </div>
    );
}

export default ProductTabDescription;
