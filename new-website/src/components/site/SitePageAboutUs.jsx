// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
// data stubs
import theme from "../../data/theme";

const slickSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 379,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SitePageAboutUs() {
  return (
    <div className="block about-us">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`About Us — ${theme.name}`}</title>
        <meta charset="utf-8" />
        <meta name="title" content="About Us" />
        <meta
          name="keyword"
          content="SportsCenter,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="" content="IE=edge,chrome=1"></meta>
      </Helmet>

      <div
        className="about-us__image"
        style={{ backgroundImage: 'url("images/aboutus.jpg")' }}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="about-us__body">
              <h1 className="about-us__title">About Us</h1>
              <div className="about-us__text typography">
                <p>
                <b>SportsCenter</b> is a popular sports platform that has kept one and only motto to give 100% satisfaction to the customers in its primary target areas – All over the world – at any cost so that they won’t have any room for any complaints regarding service, varieties of sports products along with their quality, delivery time, and price.
                </p>
                <p>
                It is a well-known fact that sports has been a part of people’s life since the past, but it seems that nowadays people are struggling to manage time for it by going to sports shops. Respecting their busy schedule and lessening the burden of shopping by making it easy and quick, a commercial website <b>SportsCenter</b>, an online sports shopping platform, has been launched to assist consumers across the globe in their daily chores of shopping by bringing all necessary sports products of consumers’ demand at the tip of their finger. They are just a flick away from the sports items of their necessities and choice.
                </p>
                <p>
                <b>SportsCenter</b>, an online sports company, provides different types of sports items, including sports equipment, sportswear, accessories, and much more of popular brands, all at a more affordable price than available in the market. We consider our valuable customers’ health, lifestyle, and passion for sports. Caring for the budget of our customers, we provide only the cheapest and the best products with no compromise in their quality.
                </p>
                <p>
                <b>SportsCenter</b> is a customer-friendly online sports shopping platform since you will experience no difficulty while checking details of sports items to be sure about their quality and price along with other necessary details. So, you are just away from your sports items only until you have collected them into your cart and confirmed them to be processed for the fast and FREE delivery. It lets you go with three modes of payments: online payment, cash on delivery.
                </p>
              </div>
              {/* <div className="about-us__team">
                                <h2 className="about-us__team-title">Meat Our Team</h2>
                                <div className="about-us__team-subtitle text-muted">
                                    Want to work in our friendly team?
                                    <br />
                                    <Link to="/site/contact-us">Contact us</Link>
                                    {' '}
                                    and we will consider your candidacy.
                                </div>
                                <div className="about-us__teammates teammates">
                                    <StroykaSlick {...slickSettings}>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                <img src="images/teammates/teammate-1.jpg" alt="" />
                                            </div>
                                            <div className="teammate__name">Michael Russo</div>
                                            <div className="teammate__position text-muted">Chief Executive Officer</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                <img src="images/teammates/teammate-2.jpg" alt="" />
                                            </div>
                                            <div className="teammate__name">Katherine Miller</div>
                                            <div className="teammate__position text-muted">Marketing Officer</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                <img src="images/teammates/teammate-3.jpg" alt="" />
                                            </div>
                                            <div className="teammate__name">Anthony Harris</div>
                                            <div className="teammate__position text-muted">Finance Director</div>
                                        </div>
                                    </StroykaSlick>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitePageAboutUs;
