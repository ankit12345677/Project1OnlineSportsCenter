import React, { useMemo, useEffect } from "react";
// third-party
import { Helmet } from "react-helmet-async";
import { GetUserLogin } from "../../services";

// application
import shopApi from "../../api/shop";
import { useProductTabs } from "../../workflow/hooks";
import BottomBar from "../mobile/BottoBar";
import MobileCategory from "../mobile/MobileCategory";
// blocks
// import BlockBanner from "../blocks/BlockBanner";
import BlockAppBanner from "../blocks/BlockAppBanner";
import BlockAppDownload from "../blocks/BlocksAppDownload";
import BlockMultiSlideShow from "../blocks/BlockMultiSlider";
import BlockBrands from "../blocks/BlockBrands";
import BlockFeatures from "../blocks/BlockFeatures";
import WinterSeason from "../blocks/WinterSeason";
import BlockProductsCarousel from "../blocks/BlockProductsCarousel";
import BlockFlashSaleCarousel from "../blocks/BlockFlashSaleCarousel";
import BlockSlideShow from "../blocks/BlockSlideShow";
function HomePageOne(props) {
  const featuredProducts = useProductTabs(
    useMemo(
      () => [
        { id: 1, name: "All", categorySlug: "home-and-kitchen" },
        // { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
      ],
      []
    ),
    (tab) =>
      shopApi.getPopularProducts({ limit: 8, category: tab.categorySlug })
  );
  /**
   * Featured products.
   */
  const fashionProducts = useProductTabs(
    useMemo(() => [{ id: 1, name: "All", categorySlug: "women" }], []),
    (tab) =>
      shopApi.getFashionProducts({ limit: 8, category: tab.categorySlug })
  );
  const makeupProducts = useProductTabs(
    useMemo(() => [{ id: 1, name: "All", categorySlug: "makeup" }], []),
    (tab) => shopApi.getmakeupProducts({ limit: 8, category: tab.categorySlug })
  );
  const shampooProducts = useProductTabs(
    useMemo(() => [{ id: 1, name: "All", categorySlug: "shampoo" }], []),
    (tab) => shopApi.getmakeupProducts({ limit: 8, category: tab.categorySlug })
  );
  const flashSaleProducts = useProductTabs(
    useMemo(() => [{ id: 1, name: "All", categorySlug: "flash-sale" }], []),
    (tab) => shopApi.getFlashSaleProducts({ category: tab.categorySlug })
  );
  /**
   * Featured products.
   */
  const menFashionProducts = useProductTabs(
    useMemo(() => [{ id: 1, name: "All", categorySlug: "men-fashion" }], []),
    (tab) =>
      shopApi.getMenFashionProducts({ limit: 8, category: tab.categorySlug })
  );
  /**
   * Latest products.
   */
  const latestProducts = useProductTabs(
    useMemo(() => [{ id: 1, name: "All", categorySlug: undefined }], []),
    (tab) => shopApi.getLatestProducts({ limit: 8 })
  );
  /**
   * Latest products.
   */
  // const popularCategory = useProductTabs(
  //   useMemo(() => [{ id: 1, name: "All", categorySlug: "" }], []),
  //   (tab) => shopApi.getPopulatCategory({ limit: 8 })
  // );
  // Replace current url.
  useEffect(() => {
    try {
      const queryString = props.location.search;
      const token = queryString.split("token=")[1].split("&")[0];
      const email = queryString.split("email=")[1].split("&")[0];
      if (token && email) {
        GetUserLogin.authenticate(token, email, true);
      }
    } catch (err) {}
  }, []);
  return (
    <React.Fragment>
      {window.location.host !== "www.sportscenter.com" ? (
        ""
      ) : (
        <Helmet>
          {/* <title>{`Home Page One — ${theme.name}`}</title> */}
          <meta charSet="utf-8" />
          <title>
          Shop the latest sports gear and apparel online with Sports Center in Chembur Mumbai.
          </title>
          <meta
            name="og_title"
            property="og:title"
            content="Shop the latest sports gear and apparel online with Sports Center in Chembur Mumbai"
          ></meta>
          <meta name="robots" content="max-image-preview:large"></meta>
          <meta
            name="description"
            content="SportsCenter: The Best Online Shopping Platform in Mumbai. Get Free Delivery and Best Deals. Mumbai online store. Buy Online in Mumbai,Online Shopping : Choose from a wide range of market, baby care products, personal care products, fresh fruits &amp; vegetables online. Pay Online &amp; Avail exclusive discounts on various products @ Mumbai Best Online Sports store. ✔ Best Prices &amp; Offers ✔ Cash on Delivery ✔ Easy Returns"
          ></meta>
          <meta
            property="og:description"
            content="SportsCenter: The Best Online Shopping Platform in Mumbai. Get Free Delivery and Best Deals & Offers in Jankpur,Jaleswar,Bardibas. Nepal's Biggest online store. Buy Online in Nepal,Online Shopping : Choose from a wide range of market, baby care products, personal care products, fresh fruits &amp; vegetables online. Pay Online &amp; Avail exclusive discounts on various products @ Nepal Best Online Grocery store. ✔ Best Prices &amp; Offers ✔ Cash on Delivery ✔ Easy Returns"
          ></meta>
          <meta
            name="keyword"
            content="SportsCenter,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
          ></meta>
          <link rel="canonical" href={window.location.href} />
          <meta
            data-react-helmet="true"
            name="og:url"
            property="og:url"
            content="https://www.sportscenter.com"
          />
        </Helmet>
      )}
      {useMemo(
        () => (
          <BlockSlideShow withDepartments />
        ),
        []
      )}
      {useMemo(
        () => (
          <MobileCategory />
        ),
        []
      )}
      {useMemo(
        () => (
          <BlockFlashSaleCarousel
            title="Flash Sale"
            layout="grid-5"
            products={flashSaleProducts.data?.data}
            loading={flashSaleProducts.isLoading}
            groups={flashSaleProducts.tabs}
            onGroupClick={flashSaleProducts.handleTabChange}
          />
        ),
        [flashSaleProducts]
      )}
      {useMemo(
        () => (
          <BlockAppBanner />
        ),
        []
      )}
      {useMemo(
        () => (
          <BlockMultiSlideShow />
        ),
        []
      )}
      {useMemo(
        () => (
          <BlockProductsCarousel
            title="New Arrivals"
            layout="horizontal"
            rows={2}
            products={latestProducts.data.data?.items}
            loading={latestProducts.isLoading}
            groups={latestProducts.tabs}
            onGroupClick={latestProducts.handleTabChange}
          />
        ),
        [latestProducts]
      )}
      {useMemo(
        () => (
          <WinterSeason />
        ),
        []
      )}
      {useMemo(
        () => (
          <BlockProductsCarousel
            title="Women Fashion"
            layout="grid-5"
            products={fashionProducts.data?.data}
            loading={fashionProducts.isLoading}
            groups={fashionProducts.tabs}
            onGroupClick={fashionProducts.handleTabChange}
          />
        ),
        [fashionProducts]
      )}

      {/* {useMemo(
        () => (
          <BlockBanner />
        ),
        []
      )} */}

      {useMemo(
        () => (
          <BlockProductsCarousel
            title="Home Kitchen"
            layout="grid-5"
            products={featuredProducts.data?.data}
            loading={featuredProducts.isLoading}
            groups={featuredProducts.tabs}
            onGroupClick={featuredProducts.handleTabChange}
          />
        ),
        [featuredProducts]
      )}
      {useMemo(
        () => (
          <BlockProductsCarousel
            title="Men Fashion"
            layout="grid-5"
            products={menFashionProducts.data?.data}
            loading={menFashionProducts.isLoading}
            groups={menFashionProducts.tabs}
            onGroupClick={menFashionProducts.handleTabChange}
          />
        ),
        [menFashionProducts]
      )}
      {useMemo(
        () => (
          <BlockAppDownload />
        ),
        []
      )}
      {useMemo(
        () => (
          <BlockProductsCarousel
            title="For Makeup"
            layout="grid-5"
            products={makeupProducts.data?.data}
            loading={makeupProducts.isLoading}
            groups={makeupProducts.tabs}
            onGroupClick={makeupProducts.handleTabChange}
          />
        ),
        [makeupProducts]
      )}
      {useMemo(
        () => (
          <BlockProductsCarousel
            title="Beauty Fashion"
            layout="grid-5"
            products={shampooProducts.data?.data}
            loading={shampooProducts.isLoading}
            groups={shampooProducts.tabs}
            onGroupClick={shampooProducts.handleTabChange}
          />
        ),
        [shampooProducts]
      )}
      {useMemo(
        () => (
          <BlockBrands />
        ),
        []
      )}

      {useMemo(
        () => (
          <BlockFeatures />
        ),
        []
      )}
      <BottomBar />
    </React.Fragment>
  );
}

export default HomePageOne;
