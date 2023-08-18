import React from 'react';
import PropTypes from 'prop-types';

export default function FooterLinks(props) {
    const { title, items } = props;

    const linksList = items.map((item, index) => (
        <li key={index} className="footer-links__item">
            <a href={item.url} className="footer-links__link">
                {item.title}
            </a>
        </li>
    ));

    return (
        <div className="site-footer__widget footer-links">
            <h5 className="footer-links__title">{title}</h5>
            <ul className="footer-links__list">
                {linksList}
            </ul>
        </div>
    );
}

FooterLinks.propTypes = {
    /** widget title */
    title: PropTypes.node.isRequired,
    /** array of links */
    items: PropTypes.array,
};

FooterLinks.defaultProps = {
    items: [],
};
