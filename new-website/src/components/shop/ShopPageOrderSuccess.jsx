// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check100Svg } from '../../svg';

// data stubs
import theme from '../../data/theme';

export default function ShopPageOrderSuccess() {
    return (
        <div className="block order-success">
            <Helmet>
                <title>{`Order Success — ${theme.name}`}</title>
            </Helmet>

            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <Check100Svg className="order-success__icon" />
                        <h1 className="order-success__title">Thank you</h1>
                        <div className="order-success__subtitle">Your order has been received</div>
                        <div className="order-success__actions">
                            <Link to="/" className="btn btn-xs btn-secondary">Go To Homepage</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
