/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import qs from "query-string";
const API_URL =
  document.domain === "localhost"
    ? "http://localhost:4000"
    : "https://www.sportscenter.com";

const shopApi = {
  /**
   * Returns array of categories.
   *
   * @param {object?} options
   * @param {number?} options.depth
   *
   * @return {Promise<Array<object>>}
   */
  getCategories: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/categories.json?depth=2
     *
     * where:
     * - 2 = options.depth
     */
    return fetch(`${API_URL}/api/website/category/list`).then((response) =>
      response.json()
    );
  },
  getBannerList: (type) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/categories.json?depth=2
     *
     * where:
     * - 2 = options.depth
     */
    return fetch(`${API_URL}/api/website/image/banner?type=${type.type}`).then(
      (response) => response.json()
    );
  },
  /**
   * Returns category by slug.
   *
   * @param {string} slug
   * @param {object?} options
   * @param {number?} options.depth
   *
   * @return {Promise<object>}
   */
  getCategoryBySlug: (slug, options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/categories/power-tools.json?depth=2
     *
     * where:
     * - power-tools = slug
     * - 2           = options.depth
     */
    return fetch(
      `${API_URL}/api/website/catalog/category/search?queryString=${slug}`
    ).then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    // return getCategoryBySlug(slug, options);
  },
  /**
   * Returns product.
   *
   * @param {string} slug
   *
   * @return {Promise<object>}
   */
  getProductBySlug: (id, slug) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/products/screwdriver-a2017.json
     *
     * where:
     * - screwdriver-a2017 = slug
     */
    return fetch(
      `${API_URL}/api/website/product/detail?productId=${id}&slug=${slug}`
    ).then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    // return getProductBySlug(slug);
  },
  /**
   * Returns array of related products.
   *
   * @param {string}  slug
   * @param {object?} options
   * @param {number?} options.limit
   *
   * @return {Promise<Array<object>>}
   */
  getRelatedProducts: (id, slug, options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/products/screwdriver-a2017/related.json&limit=3
     *
     * where:
     * - screwdriver-a2017 = slug
     * - limit             = options.limit
     */
    return fetch(
      `${API_URL}/api/website/relatedProduct?productId=${id}&slug=${slug}`
    ).then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    // return getRelatedProducts(slug, options);
  },
  /**
   * Return products list.
   *
   * @param {object?} options
   * @param {number?} options.page
   * @param {number?} options.limit
   * @param {string?} options.sort
   * @param {Object.<string, string>?} filters
   *
   * @return {Promise<object>}
   */
  getProductsList: (options = {}, filters = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/products.json?page=2&limit=12&sort=name_desc&filter_category=screwdriwers&filter_price=500-1000
     *
     * where:
     * - page            = options.page
     * - limit           = options.limit
     * - sort            = options.sort
     * - filter_category = filters.category
     * - filter_price    = filters.price
     */
    const params = { ...options };

    Object.keys(filters).forEach((slug) => {
      params[`filter_${slug}`] = filters[slug];
    });
    return fetch(
      `${API_URL}/api/website/catalog/product/search?${qs.stringify(params)}`
    ).then((response) => response.json());
  },
  /**
   * Returns array of latest products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getLatestProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/latest-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/product/new-arrival`).then(
      (response) => response.json()
    );
  },
  /**
   * Returns an array of most popular products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getPopularProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/product/home-kitchen`).then(
      (response) => response.json()
    );
  },
  /**
   * Returns an array of most popular products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getFashionProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/product/women-fashion`).then(
      (response) => response.json()
    );
  },
  getmakeupProducts: (slug, options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/product?type=${slug.category}`).then(
      (response) => response.json()
    );
  },
  /**
   * Returns an array of most popular products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getFlashSaleProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/flash-sale`).then((response) =>
      response.json()
    );
  },
  /**
   * Returns an array of most popular products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getMenFashionProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/product/men-fashion`).then(
      (response) => response.json()
    );
  },
  /**
   * Returns an array of most popular products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getPopulatCategory: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    return fetch(`${API_URL}/api/website/popular/category-list`).then(
      (response) => response.json()
    );
  },
  /**
   * Returns search suggestions.
   *
   * @param {string}  query
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getSuggestions: (query, options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
     *
     * where:
     * - query    = query
     * - limit    = options.limit
     * - category = options.category
     */
    return fetch(
      `${API_URL}/api/website/autosuggest/search?${qs.stringify({
        ...options,
        query,
      })}`
    ).then((response) => response.json());
  },
};

export default shopApi;
