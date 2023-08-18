// react
import React from "react";
// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import "./counter.css";
import CountdownTimer from "../../common/Timer/CountdownTimer";
// application
import { history } from "../../helpers/history";
import { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg } from "../../svg";

function BlockFlashSaleHeader(props) {
  const { title, endDate, groups, onPrev, onNext, onGroupClick } = props;
  let { arrows } = props;
  if (arrows) {
    arrows = (
      <div className="block-header__arrows-list">
        <button
          className="block-header__arrow block-header__arrow--left"
          type="button"
          onClick={onPrev}
        >
          <ArrowRoundedLeft7x11Svg />
        </button>
        <button
          className="block-header__arrow block-header__arrow--right"
          type="button"
          onClick={onNext}
        >
          <ArrowRoundedRight7x11Svg />
        </button>
      </div>
    );
  }

  let groupsList;

  if (groups.length > 0) {
    groupsList = groups.map((group, index) => {
      const classes = classNames("block-header__group", {
        "block-header__group--active": group.current,
      });

      return (
        <li key={index}>
          <button
            type="button"
            className={classes}
            onClick={() => history.push(`/site/${group.categorySlug}`)}
          >
            {group.name}
          </button>
        </li>
      );
    });

    groupsList = <ul className="block-header__groups-list">{groupsList}</ul>;
  }

  return (
    <div className="block-header">
      <h3 className="block-header__title">{title}</h3>
      {/* <Countdown className="text-danger pl-2" date={endDate} /> */}
      <CountdownTimer targetDate={endDate} />
      <div className="block-header__divider" />
      {groupsList}
      {arrows}
    </div>
  );
}

BlockFlashSaleHeader.propTypes = {
  title: PropTypes.string,
  arrows: PropTypes.bool,
  groups: PropTypes.array,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onGroupClick: PropTypes.func,
};
BlockFlashSaleHeader.defaultProps = {
  groups: [],
  onGroupClick: () => {},
};

export default BlockFlashSaleHeader;
