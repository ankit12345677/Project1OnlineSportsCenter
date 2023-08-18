// react
import React, { useEffect, useState } from "react";

// third-party
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";
import Product from "../shared/Product";
import ProductTabs from "./ProductTabs";
import shopApi from "../../api/shop";
import { url } from "../../workflow/utils";

// blocks
import BlockLoader from "../blocks/BlockLoader";
import BlockProductsCarousel from "../blocks/BlockProductsCarousel";

// widgets
import WidgetCategories from "../widgets/WidgetCategories";
import WidgetProducts from "../widgets/WidgetProducts";
function ShopPageProduct(props) {
  const { ProductId, productSlug, layout, sidebarPosition } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  // Load product.
  useEffect(() => {
    let canceled = false;

    setIsLoading(true);

    shopApi.getProductBySlug(ProductId, productSlug).then((product) => {
      if (canceled) {
        return;
      }

      setProduct(product.data);
      setIsLoading(false);
    });

    return () => {
      canceled = true;
    };
  }, [productSlug, setIsLoading]);

  // Load related products.
  useEffect(() => {
    let canceled = false;

    shopApi.getRelatedProducts(ProductId, productSlug).then((products) => {
      if (canceled) {
        return;
      }

      setRelatedProducts(products.data);
    });

    return () => {
      canceled = true;
    };
  }, [ProductId, productSlug, setRelatedProducts]);

  // Load latest products.
  useEffect(() => {
    let canceled = false;

    if (layout !== "sidebar") {
      setLatestProducts([]);
    } else {
      shopApi.getLatestProducts({ limit: 5 }).then((result) => {
        if (canceled) {
          return;
        }

        setLatestProducts(result);
      });
    }

    return () => {
      canceled = true;
    };
  }, [layout]);

  if (isLoading) {
    return <BlockLoader />;
  }
  const breadcrumb = [
    { title: "Home", url: url.home() },
    { title: "Shop", url: url.catalog() },
    { title: product.Name, url: url.product(product.Name) },
  ];

  let content;
  if (layout === "sidebar") {
    const sidebar = (
      <div className="shop-layout__sidebar">
        <div className="block block-sidebar">
          <div className="block-sidebar__item">
            <WidgetCategories categories={categories} location="shop" />
          </div>
          <div className="block-sidebar__item d-none d-lg-block">
            <WidgetProducts title="Latest Products" products={latestProducts} />
          </div>
        </div>
      </div>
    );

    content = (
      <div className="container">
        <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
          {sidebarPosition === "start" && sidebar}
          <div className=" shop-layout__content">
            <div className=" block">
              <Product product={product} layout={layout} />
              <ProductTabs withSidebar product={product} />
            </div>

            {relatedProducts.length > 0 && (
              <BlockProductsCarousel
                title="Related Products"
                layout="grid-4-sm"
                products={relatedProducts}
                withSidebar
              />
            )}
          </div>
          {sidebarPosition === "end" && sidebar}
        </div>
      </div>
    );
  } else {
    content = (
      <React.Fragment>
        <div className="block">
          <div className="container">
            <Product product={product} layout={layout} />
            <ProductTabs product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <BlockProductsCarousel
            title="Related Products"
            layout="grid-5"
            products={relatedProducts}
          />
        )}
      </React.Fragment>
    );
  }

  const { seoList } = product;
  return (
    <React.Fragment>
      <Helmet>
        <title>{seoList ? seoList.title : ""}</title>
        <meta
          name="og_title"
          property="og:title"
          content={seoList ? seoList.title : ""}
        ></meta>
        <meta name="Description" content={seoList ? seoList.desc : ""} />
        <meta
          property="og:description"
          content={seoList ? seoList.desc : ""}
        ></meta>
        <meta name="keyword" content={seoList ? seoList.keyword : ""}></meta>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="og_image"
          property="og:image"
          content={product.Thumbnail}
        ></meta>
        <meta
          name="og_url"
          property="og:url"
          content={window.location.href}
        ></meta>
        <meta
          data-react-helmet="true"
          name="og:url"
          property="og:url"
          content="https://www.sportscenter.com"
        />
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      {content}
    </React.Fragment>
  );
}

ShopPageProduct.propTypes = {
  /** Product slug. */
  productSlug: PropTypes.string,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
  /**
   * sidebar position (default: 'start')
   * one of ['start', 'end']
   * for LTR scripts "start" is "left" and "end" is "right"
   */
  sidebarPosition: PropTypes.oneOf(["start", "end"]),
};

ShopPageProduct.defaultProps = {
  layout: "standard",
  sidebarPosition: "start",
};

export default ShopPageProduct;
