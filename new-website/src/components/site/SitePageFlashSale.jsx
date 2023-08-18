// react
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
// third-party
import { Helmet } from "react-helmet-async";
import { GetProductDetails } from "../../services";
import BlockLoader from "../blocks/BlockLoader";
import FlashSaleProductView from "../shop/FlashSaleProductView";

// data stubs
import theme from "../../data/theme";

function SitePageFlashSale(props) {
  const { columns, viewMode } = props;
  const offcanvas = columns === 3 ? "mobile" : "always";

  const [flashList, setFlashList] = useState();
  const [loading, setLoading] = useState(true);

  const flashSale = async () => {
    let list = await GetProductDetails.getFlashSale();
    if (list.code == 200) {
      setFlashList(list.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    flashSale();
  }, []);
  if (loading && !flashList) {
    return <BlockLoader />;
  }
  const productsView = (
    <FlashSaleProductView
      productsList={flashList ? flashList : null}
      options={""}
      filters={""}
      layout={viewMode}
      grid={`grid-${columns}-${columns > 3 ? "full" : "sidebar"}`}
      offcanvas={offcanvas}
    />
  );
  const bgImage = flashList && flashList.length ? flashList[0].thumbnail : "";
  return (
    <React.Fragment>
      <div className="block about-us">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Flash-Sale — ${theme.name}`}</title>
          <meta charset="utf-8" />
          <meta name="title" content="Flash-Sale" />
          <meta
            name="keyword"
            content="SporstCenter,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
          ></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="" content="IE=edge,chrome=1"></meta>
        </Helmet>
        <Grid style={{ backgroundColor: "#ffffff" }}>
          <section className="text-center">
            <img
              src={bgImage}
              data-src={bgImage}
              alt="Flash Deal"
              className="img-fit w-100 ls-is-cached lazyloaded"
            />
          </section>
        </Grid>
        <div className="block">{productsView}</div>
      </div>
    </React.Fragment>
  );
}

export default SitePageFlashSale;
