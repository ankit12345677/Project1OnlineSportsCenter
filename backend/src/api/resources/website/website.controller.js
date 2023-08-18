import { db } from "../../../models";
import mailer from "../../../mailer";
var Util = require("../../../helpers/Util");
const { Op } = require("sequelize");
var Sequelize = require("sequelize");

import moment from "moment";

const findAddressList = (id) => {
  return new Promise((resolve, reject) => {
    db.Address.findOne({
      where: {
        id: id,
      },
    })
      .then((list) => {
        return list;
      })
      .then((r) => {
        resolve(r);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getGroupByCategory = () => {
  return new Promise((resolve, reject) => {
    try {
      db.Ch_Super_Category.findAll({
        attributes: ["id", "Name", "Slug"],
        order: [["Sequence", "ASC"]],
        where: { Status: true },
        include: [
          {
            model: db.category,
            as: "category",
            order: [["id", "desc"]],
            where: { status: true },
            attributes: ["id", "name", "thumbnail", "slug"],
            include: [
              {
                model: db.SubCategory,
                order: [["id", "asc"]],
                attributes: ["id", "sub_name", "slug"],
                include: [
                  {
                    model: db.SubChildCategory,
                    order: [["id", "asc"]],
                    attributes: ["id", "name"],
                  },
                ],
              },
            ],
          },
        ],
      }).then(async (cat) => {
        const catlist = [];
        cat.forEach((element) => {
          let match = catlist.find((r) => r.Name == element.Name);
          if (match) {
            return true;
          } else {
            catlist.push({
              Name: element.Name,
              Slug: element.Slug,
              category: [],
            });
          }
        });
        catlist.map((item) => {
          cat.map((e) => {
            if (e.Name == item.Name) {
              if (typeof e.category == "object") {
                item.category.push(e.category);
              } else {
                item.category.push(e.category);
              }
            }
          });
        });
        const finalResult = [];
        catlist.forEach((value) =>
          value.category.forEach((category) =>
            finalResult.push({
              name: value.Name,
              slug: value.Slug,
              catList: category.SubCategories,
            })
          )
        );
        const result = finalResult.reduce((acc, { name, slug, catList }) => {
          acc[name] ??= { name: name, slug: slug, catList: [] };
          if (Array.isArray(catList))
            // if it's array type then concat
            acc[name].catList = acc[name].catList.concat(catList);
          else acc[name].catList.push(catList);

          return acc;
        }, {});
        resolve(Object.values(result));
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUniqueListBy = (arr, key) => {
  try {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  } catch (error) {
    throw new RequestError(error);
  }
};

const filterSellerProduct = (arr1, arr2) => {
  const temp = [];
  arr1.forEach((x) => {
    arr2.forEach((y) => {
      if (x.productId === y.id) {
        let sellerIds = JSON.parse(JSON.stringify(y));
        temp.push({ ...x, ...sellerIds });
      }
    });
  });

  return temp;
};

export default {
  async getCategoryList(req, res, next) {
    try {
      let result = {};
      result.catlist = await getGroupByCategory();
      if (result) {
        res.status(200).json({
          status: 200,
          message: "Successfully",
          success: true,
          data: result.catlist,
        });
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getBannerList(req, res, next) {
    try {
      const { type } = req.query;
      db.BannerDetail.findAll({
        where: { status: 1, type: type },
        attributes: ["id", "banner", "slug"],
      }).then((list) => {
        let response = Util.getFormatedResponse(false, list, {
          message: "Success",
        });
        res.status(response.code).json(response);
      });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getNewArrival(req, res, next) {
    const limit = 100;
    const query = {};
    query.where = {};
    query.include = [
      {
        model: db.ProductVariant,
        where: {
          [Op.or]: [
            {
              createdAt: {
                [Op.gte]: moment().subtract(30, "days").toDate(),
              },
            },
            {
              updatedAt: {
                [Op.gte]: moment().subtract(30, "days").toDate(),
              },
            },
          ],
        },
        include: [
          {
            model: db.ch_brand_detail,
            as: "brand",
            attributes: ["id", "name", "slug"],
          },
          {
            model: db.ch_color_detail,
            as: "color",
            attributes: ["id", "TITLE", "CODE"],
          },
        ],
      },
    ];
    query.limit = limit;
    query.order = [["id", "DESC"]];
    query.where = {
      [Op.or]: [
        {
          createdAt: {
            [Op.gte]: moment().subtract(25, "days").toDate(),
          },
        },
        {
          updatedAt: {
            [Op.gte]: moment().subtract(25, "days").toDate(),
          },
        },
      ],
    };
    query.where.SellerId = {
      [Op.ne]: null,
    };
    query.where.name = {
      [Op.ne]: null,
    };
    query.where.PubilshStatus = {
      [Op.eq]: "Published",
    };
    try {
      let product = await db.product.findAndCountAll({ ...query });
      if (product.count) {
        const arrData = [];
        product.rows.forEach((value) => {
          const dataList = {
            ProductId: value.id,
            PubilshStatus: value.PubilshStatus,
            HighLightDetail: value.HighLightDetail,
            VarientId: value.ProductVariants[0]
              ? value.ProductVariants[0].id
              : null,
            Name: value.name,
            slug: value.slug,
            qty: value.ProductVariants[0] ? value.ProductVariants[0].qty : null,
            Thumbnail: value.ProductVariants[0].thumbnail,
            distributorPrice: value.ProductVariants[0]
              ? value.ProductVariants[0].distributorPrice
              : null,
            netPrice: value.ProductVariants[0]
              ? value.ProductVariants[0].netPrice
              : null,
            discount: value.ProductVariants[0]
              ? value.ProductVariants[0].discount
              : null,
            discountPer: value.ProductVariants[0]
              ? value.ProductVariants[0].discountPer
              : null,
            badges: "new",
          };
          arrData.push(dataList);
        });
        let pages = Math.ceil(product.count / limit);
        const finalResult = {
          count: product.count,
          pages: pages,
          items: arrData,
        };
        var response = Util.getFormatedResponse(false, finalResult, {
          message: "Success",
        });
        res.status(response.code).json(response);
      } else {
        var response = Util.getFormatedResponse(false, {
          message: "No data found",
        });
        res.status(response.code).json(response);
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getProductDetail(req, res, next) {
    const { productId, slug } = req.query;
    try {
      const product = await db.product.findOne({
        attributes: ["id"],
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { slug: { [Op.like]: "%" + slug + "%" } },
                { name: { [Op.like]: "%" + slug + "%" } },
              ],
            },
            { SellerId: { [Op.ne]: null } },
            { id: productId },
            { PubilshStatus: { [Op.eq]: "Published" } },
          ],
        },
      });
      if (product && product.id !== null) {
        db.ProductVariant.findAll({
          where: { productId: product.id },
          include: [
            {
              model: db.ch_brand_detail,
              as: "brand",
              attributes: ["id", "name"],
            },
            { model: db.ch_color_detail, as: "color" },
            { model: db.productphoto, attributes: ["id", "imgUrl"] },
            {
              model: db.product,
              attributes: [
                "id",
                "name",
                "slug",
                "sellerId",
                "WarrantyType",
                "WarrantyPeriod",
                "LocalDeiveryCharge",
                "ZonalDeiveryCharge",
                "NationalDeiveryCharge",
                "WarrantyType",
                "WarrantyPeriod",
                "PubilshStatus",
                "ShippingDays",
                "HighLightDetail",
              ],
              include: [
                { model: db.category, attributes: ["name"], as: "maincat" },
                { model: db.SubCategory, attributes: ["sub_name"] },
                { model: db.SubChildCategory, attributes: ["name"] },
                { model: db.ch_specification },
                {
                  model: db.user,
                  as: "users",
                  include: [
                    {
                      model: db.ch_seller_shopdetail,
                    },
                  ],
                },
                {
                  model: db.Seo_Details,
                  attributes: ["meta_title", "meta_keyword", "meta_desc"],
                },
              ],
            },
          ],
        })
          .then((list) => {
            if (list.length && list !== null) {
              const sizeArr = [];
              let SellerDetail = "";
              const colorArr = [];
              const imageList = [];
              list[0].productphotos.forEach((url) => {
                imageList.push(url.imgUrl);
              });
              list.forEach((value) => {
                if (value.unitSize !== null) {
                  sizeArr.push({
                    id: value.id,
                    ProductName: value.productName,
                    ProductId: value.id,
                    slug: value.slug,
                    size: value.unitSize,
                  });
                }
                if (value.color !== null) {
                  colorArr.push({
                    id: value.color ? value.color.id : null,
                    ProductName: value.productName,
                    ProductId: value.id,
                    slug: value.slug,
                    TITLE: value.color ? value.color.TITLE : null,
                    CODE: value.color ? value.color.CODE : null,
                  });
                }
                SellerDetail =
                  value.product.users &&
                  value.product.users.ch_seller_shopdetails
                    ? value.product.users.ch_seller_shopdetails
                    : null;
              });
              const uniqueSizeList = getUniqueListBy(sizeArr, "size");
              const uniqueColorList = getUniqueListBy(colorArr, "TITLE");
              const colordetail = {
                id: list[0].color ? list[0].color.id : null,
                TITLE: list[0].color ? list[0].color.TITLE : null,
                CODE: list[0].color ? list[0].color.CODE : null,
              };
              const seoList = {
                title:
                  list[0].product.Seo_Details &&
                  list[0].product.Seo_Details.length
                    ? list[0].product.Seo_Details[0].meta_title
                    : null,
                keyword:
                  list[0].product.Seo_Details &&
                  list[0].product.Seo_Details.length
                    ? list[0].product.Seo_Details[0].meta_keyword
                    : null,
                desc:
                  list[0].product.Seo_Details &&
                  list[0].product.Seo_Details.length
                    ? list[0].product.Seo_Details[0].meta_desc
                    : null,
              };
              const finalResult = {
                id: list[0].id,
                productId: list[0].productId,
                MainCat: list[0].product.maincat.name,
                SubCat: list[0].product.SubCategory.sub_name,
                ChildCat: list[0].product.SubChildCategory
                  ? list[0].product.SubChildCategory.name
                  : null,
                Name: list[0].productName,
                WarrantyType: list[0].product.WarrantyType,
                WarrantyPeriod: list[0].product.WarrantyPeriod,
                SoldBy:
                  SellerDetail &&
                  SellerDetail.length &&
                  SellerDetail[0].SHOPNAME
                    ? SellerDetail[0].SHOPNAME
                    : null,
                Thumbnail: list[0].productphotos.length
                  ? list[0].productphotos[0].imgUrl
                  : list[0].thumbnail,
                Quantity: list[0].qtyWarning,
                Available: list[0].Available,
                StockType: list[0].stockType,
                Cod: list[0].COD,
                distributorPrice: list[0].distributorPrice,
                discount: list[0].discount,
                discountPer: list[0].discountPer,
                netPrice: list[0].netPrice,
                BrandName: list[0].brand ? list[0].brand.name : "",
                SortDesc: list[0].shortDesc,
                LongDesc: list[0].longDesc,
                Photo: imageList,
                HighLightDetail: list[0].product.HighLightDetail,
                sizeList: uniqueSizeList,
                colorList: uniqueColorList,
                ColorDetail: colordetail,
                SizeDetail: list[0].unitSize ? list[0].unitSize : null,
                Specification: list[0].product.ch_specifications,
                seoList: seoList,
              };
              let response = Util.getFormatedResponse(false, finalResult, {
                message: "success",
              });
              res.status(response.code).json(response);
            } else {
              let response = Util.getFormatedResponse(false, {
                message: "No data found",
              });
              res.status(response.code).json(response);
            }
          })
          .catch(function (err) {
            next(err);
          });
      } else {
        db.ProductVariant.findOne({
          where: { id: productId },
          include: [
            {
              model: db.ch_brand_detail,
              as: "brand",
              attributes: ["id", "name"],
            },
            { model: db.ch_color_detail, as: "color" },
            { model: db.productphoto, attributes: ["id", "imgUrl"] },
            {
              model: db.product,
              attributes: [
                "id",
                "name",
                "slug",
                "sellerId",
                "LocalDeiveryCharge",
                "ZonalDeiveryCharge",
                "NationalDeiveryCharge",
                "WarrantyType",
                "WarrantyPeriod",
                "PubilshStatus",
                "ShippingDays",
                "HighLightDetail",
              ],
              include: [
                {
                  model: db.Seo_Details,
                  attributes: ["meta_title", "meta_keyword", "meta_desc"],
                },
                { model: db.category, attributes: ["name"], as: "maincat" },
                { model: db.SubCategory, attributes: ["sub_name"] },
                { model: db.SubChildCategory, attributes: ["name"] },
                { model: db.ch_specification },
              ],
            },
          ],
        })
          .then(async (list) => {
            if (list !== null) {
              const product = await db.ProductVariant.findAll({
                where: { productId: list.productId },
                include: [
                  {
                    model: db.ch_brand_detail,
                    as: "brand",
                    attributes: ["id", "name"],
                  },
                  { model: db.ch_color_detail, as: "color" },
                  { model: db.productphoto, attributes: ["id", "imgUrl"] },
                  {
                    model: db.product,
                    attributes: [
                      "id",
                      "name",
                      "slug",
                      "sellerId",
                      "WarrantyType",
                      "WarrantyPeriod",
                      "LocalDeiveryCharge",
                      "ZonalDeiveryCharge",
                      "NationalDeiveryCharge",
                      "WarrantyType",
                      "WarrantyPeriod",
                      "PubilshStatus",
                      "ShippingDays",
                      "HighLightDetail",
                    ],
                    include: [
                      {
                        model: db.category,
                        attributes: ["name"],
                        as: "maincat",
                      },
                      { model: db.SubCategory, attributes: ["sub_name"] },
                      { model: db.SubChildCategory, attributes: ["name"] },
                      { model: db.ch_specification },
                      {
                        model: db.user,
                        as: "users",
                        attributes: ["firstName", "lastName"],
                        include: [
                          {
                            model: db.ch_seller_shopdetail,
                          },
                        ],
                      },
                      {
                        model: db.Seo_Details,
                        attributes: ["meta_title", "meta_keyword", "meta_desc"],
                      },
                    ],
                  },
                ],
              });
              const sizeArr = [];
              let SellerDetail = "";
              const colorArr = [];
              const imageList = [];
              list.productphotos.forEach((url) => {
                imageList.push(url.imgUrl);
              });
              product.forEach((value) => {
                if (value.unitSize !== null) {
                  sizeArr.push({
                    id: value.id,
                    ProductName: value.productName,
                    ProductId: value.id,
                    slug: value.slug,
                    size: value.unitSize,
                  });
                }
                if (value.color !== null) {
                  colorArr.push({
                    id: value.color ? value.color.id : null,
                    ProductName: value.productName,
                    ProductId: value.id,
                    slug: value.slug,
                    TITLE: value.color ? value.color.TITLE : null,
                    CODE: value.color ? value.color.CODE : null,
                  });
                }
                SellerDetail =
                  value.product.users &&
                  value.product.users.ch_seller_shopdetails
                    ? value.product.users.ch_seller_shopdetails
                    : null;
              });
              const uniqueSizeList = getUniqueListBy(sizeArr, "size");
              const uniqueColorList = getUniqueListBy(colorArr, "TITLE");

              const colordetail = {
                id: list.color ? list.color.id : null,
                TITLE: list.color ? list.color.TITLE : null,
                CODE: list.color ? list.color.CODE : null,
              };
              const seoList = {
                title:
                  list.product.Seo_Details && list.product.Seo_Details.length
                    ? list.product.Seo_Details[0].meta_title
                    : null,
                keyword:
                  list.product.Seo_Details && list.product.Seo_Details.length
                    ? list.product.Seo_Details[0].meta_keyword
                    : null,
                desc:
                  list.product.Seo_Details && list.product.Seo_Details.length
                    ? list.product.Seo_Details[0].meta_desc
                    : null,
              };
              const finalResult = {
                id: list.id,
                productId: list.productId,
                MainCat: list.product.maincat.name,
                WarrantyType: list.product.WarrantyType,
                WarrantyPeriod: list.product.WarrantyPeriod,
                SubCat: list.product.SubCategory.sub_name,
                SoldBy:
                  SellerDetail &&
                  SellerDetail.length &&
                  SellerDetail[0].SHOPNAME
                    ? SellerDetail[0].SHOPNAME
                    : null,
                ChildCat: list.product.SubChildCategory
                  ? list.product.SubChildCategory.name
                  : null,
                Name: list.productName,
                Thumbnail: list.productphotos.length
                  ? list.productphotos[0].imgUrl
                  : list.thumbnail,
                Quantity: list.qtyWarning,
                Available: list.Available,
                StockType: list.stockType,
                Cod: list.COD,
                distributorPrice: list.distributorPrice,
                discount: list.discount,
                discountPer: list.discountPer,
                netPrice: list.netPrice,
                BrandName: list.brand ? list.brand.name : "",
                SortDesc: list.shortDesc,
                LongDesc: list.longDesc,
                Photo: imageList,
                HighLightDetail: list.product.HighLightDetail,
                sizeList: uniqueSizeList,
                colorList: uniqueColorList,
                ColorDetail: colordetail,
                SizeDetail: list.unitSize,
                Specification: list.product.ch_specifications,
                seoList: seoList,
              };
              let response = Util.getFormatedResponse(false, finalResult, {
                message: "success",
              });
              res.status(response.code).json(response);
            } else {
              let response = Util.getFormatedResponse(false, {
                message: "No data found",
              });
              res.status(response.code).json(response);
            }
          })
          .catch(function (err) {
            next(err);
          });
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getCategoryByProduct(req, res, next) {
    const { slug } = req.body;
    try {
      let result = {};
      result.maincat = await db.category.findOne({
        where: { slug: slug, status: "1" },
      });
      result.subcat = await db.SubCategory.findOne({
        where: { slug: slug },
      });
      result.subchild = await db.SubChildCategory.findOne({
        where: { slug: slug },
      });
      if (result.maincat) {
        await db.product
          .findAll({
            where: {
              categoryId: result.maincat.id,
              PubilshStatus: { [Op.eq]: "Published" },
            },
            include: [
              {
                model: db.ProductVariant,
                include: [
                  {
                    model: db.ch_brand_detail,
                    as: "brand",
                    attributes: ["id", "name"],
                  },
                  {
                    model: db.ch_color_detail,
                    as: "color",
                    attributes: ["id", "TITLE", "CODE"],
                  },
                  { model: db.productphoto, attributes: ["id", "imgUrl"] },
                ],
              },
              { model: db.category, as: "maincat", attributes: ["id", "name"] },
              { model: db.SubCategory, attributes: ["id", "sub_name"] },
              { model: db.SubChildCategory, attributes: ["id", "name"] },
            ],
          })
          .then((list) => {
            const arrData = [];
            list.forEach((value) => {
              let dataList = {
                productName: value.ProductVariants[0].productName,
                slug: value.ProductVariants[0].slug,
                Available: value.ProductVariants[0].Available,
                qty: value.ProductVariants[0].qty,
                unitSize: value.ProductVariants[0].unitSize,
                thumbnail: value.ProductVariants[0].thumbnail,
                gallery: value.ProductVariants[0].productphotos,
                youTubeUrl: value.ProductVariants[0].youTubeUrl,
                qtyWarning: value.ProductVariants[0].qtyWarning,
                shortDesc: value.ProductVariants[0].shortDesc,
                longDesc: value.ProductVariants[0].longDesc,
                distributorPrice: value.ProductVariants[0].distributorPrice,
                netPrice: value.ProductVariants[0].netPrice,
                discount: Math.round(
                  value.ProductVariants[0].distributorPrice -
                    value.ProductVariants[0].netPrice
                ),
                discountPer: Math.round(
                  (value.ProductVariants[0].distributorPrice -
                    value.ProductVariants[0].netPrice) /
                    100
                ),
                maincat: value.maincat.name,
                subcat: value.SubCategory.sub_name,
                childcat: value.SubChildCategory.name,
                LocalDeiveryCharge: value.LocalDeiveryCharge,
                ZonalDeiveryCharge: value.ZonalDeiveryCharge,
                NationalDeiveryCharge: value.NationalDeiveryCharge,
                WarrantyType: value.WarrantyType,
                WarrantyPeriod: value.WarrantyPeriod,
                HighLightDetail: value.HighLightDetail,
                ShippingDays: value.ShippingDays,
              };
              arrData.push(dataList);
            });
            res.status(200).json({ status: 200, success: true, data: arrData });
          })
          .catch(function (err) {
            next(err);
          });
      }
      if (result.subcat) {
        await db.product
          .findAll({
            where: { subCategoryId: result.subcat.id },
            include: [
              {
                model: db.ProductVariant,
                include: [
                  {
                    model: db.ch_brand_detail,
                    as: "brand",
                    attributes: ["id", "name"],
                  },
                  {
                    model: db.ch_color_detail,
                    as: "color",
                    attributes: ["id", "TITLE", "CODE"],
                  },
                  { model: db.productphoto, attributes: ["id", "imgUrl"] },
                ],
              },
              { model: db.category, as: "maincat", attributes: ["id", "name"] },
              { model: db.SubCategory, attributes: ["id", "sub_name"] },
              { model: db.SubChildCategory, attributes: ["id", "name"] },
            ],
          })
          .then((list) => {
            const arrData = [];
            list.forEach((value) => {
              let dataList = {
                productName: value.ProductVariants[0].productName,
                slug: value.ProductVariants[0].slug,
                Available: value.ProductVariants[0].Available,
                qty: value.ProductVariants[0].qty,
                unitSize: value.ProductVariants[0].unitSize,
                thumbnail: value.ProductVariants[0].thumbnail,
                gallery: value.ProductVariants[0].productphotos,
                youTubeUrl: value.ProductVariants[0].youTubeUrl,
                qtyWarning: value.ProductVariants[0].qtyWarning,
                shortDesc: value.ProductVariants[0].shortDesc,
                longDesc: value.ProductVariants[0].longDesc,
                distributorPrice: value.ProductVariants[0].distributorPrice,
                netPrice: value.ProductVariants[0].netPrice,
                discount: Math.round(
                  value.ProductVariants[0].distributorPrice -
                    value.ProductVariants[0].netPrice
                ),
                discountPer: Math.round(
                  (value.ProductVariants[0].distributorPrice -
                    value.ProductVariants[0].netPrice) /
                    100
                ),
                maincat: value.maincat.name,
                subcat: value.SubCategory.sub_name,
                childcat: value.SubChildCategory.name,
                LocalDeiveryCharge: value.LocalDeiveryCharge,
                ZonalDeiveryCharge: value.ZonalDeiveryCharge,
                NationalDeiveryCharge: value.NationalDeiveryCharge,
                WarrantyType: value.WarrantyType,
                WarrantyPeriod: value.WarrantyPeriod,
                HighLightDetail: value.HighLightDetail,
                ShippingDays: value.ShippingDays,
              };
              arrData.push(dataList);
            });
            res.status(200).json({ status: 200, success: true, data: arrData });
          })
          .catch(function (err) {
            next(err);
          });
      }
      if (result.subchild) {
        await db.product
          .findAll({
            where: { childCategoryId: result.subchild.id },
            include: [
              {
                model: db.ProductVariant,
                include: [
                  {
                    model: db.ch_brand_detail,
                    as: "brand",
                    attributes: ["id", "name"],
                  },
                  {
                    model: db.ch_color_detail,
                    as: "color",
                    attributes: ["id", "TITLE", "CODE"],
                  },
                  { model: db.productphoto, attributes: ["id", "imgUrl"] },
                ],
              },
              { model: db.category, as: "maincat", attributes: ["id", "name"] },
              { model: db.SubCategory, attributes: ["id", "sub_name"] },
              { model: db.SubChildCategory, attributes: ["id", "name"] },
            ],
          })
          .then((list) => {
            const arrData = [];
            list.forEach((value) => {
              let dataList = {
                productName: value.ProductVariants[0].productName,
                slug: value.ProductVariants[0].slug,
                Available: value.ProductVariants[0].Available,
                qty: value.ProductVariants[0].qty,
                unitSize: value.ProductVariants[0].unitSize,
                thumbnail: value.ProductVariants[0].thumbnail,
                gallery: value.ProductVariants[0].productphotos,
                youTubeUrl: value.ProductVariants[0].youTubeUrl,
                qtyWarning: value.ProductVariants[0].qtyWarning,
                shortDesc: value.ProductVariants[0].shortDesc,
                longDesc: value.ProductVariants[0].longDesc,
                distributorPrice: value.ProductVariants[0].distributorPrice,
                netPrice: value.ProductVariants[0].netPrice,
                discount: Math.round(
                  value.ProductVariants[0].distributorPrice -
                    value.ProductVariants[0].netPrice
                ),
                discountPer: Math.round(
                  (value.ProductVariants[0].distributorPrice -
                    value.ProductVariants[0].netPrice) /
                    100
                ),
                maincat: value.maincat.name,
                subcat: value.SubCategory.sub_name,
                childcat: value.SubChildCategory.name,
                LocalDeiveryCharge: value.LocalDeiveryCharge,
                ZonalDeiveryCharge: value.ZonalDeiveryCharge,
                NationalDeiveryCharge: value.NationalDeiveryCharge,
                WarrantyType: value.WarrantyType,
                WarrantyPeriod: value.WarrantyPeriod,
                HighLightDetail: value.HighLightDetail,
                ShippingDays: value.ShippingDays,
              };
              arrData.push(dataList);
            });
            res.status(200).json({ status: 200, success: true, data: arrData });
          })
          .catch(function (err) {
            next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  },
  async getFilterAllProduct(req, res, next) {
    const { filter_category, filter_brand, filter_color, filter_price } =
      req.query;
    let arrData = [];
    const whereCond = {};
    whereCond.where = {};
    const query = {};
    query.where = {};

    if (filter_brand) {
      const brandArr = filter_brand.split(",");
      const brandOr = [];
      for (const brand of brandArr) {
        brandOr.push({
          [Op.like]: `%${brand}`,
        });
      }
      const brandsId = await db.ch_brand_detail.findAll({
        attributes: ["id"],
        where: {
          name: { [Op.or]: brandOr },
        },
        raw: true,
      });
      if (brandsId.length > 0) {
        whereCond.where.brandId = {
          [Op.in]: brandsId.map(({ id }) => id),
        };
      }
    }
    if (filter_color) {
      const colorrr = filter_color.split(",");
      const colorOr = [];
      for (const color of colorrr) {
        colorOr.push({
          [Op.like]: `${color}`,
        });
      }
      const colorsId = await db.ch_color_detail.findAll({
        attributes: ["id"],
        where: {
          TITLE: { [Op.or]: colorOr },
        },
        raw: true,
      });
      if (colorsId.length > 0) {
        whereCond.where.colorId = {
          [Op.in]: colorsId.map(({ id }) => id),
        };
      }
    }
    if (filter_price) {
      const price = filter_price.split("-");
      const startPrice = Number(price[0]);
      const endPrice = Number(price[1]);
      if (startPrice && endPrice) {
        whereCond.where.netPrice = {
          [Op.between]: [startPrice, endPrice],
        };
      }
    }
    try {
      let result = {};
      result.tag = await db.tag.findAll({
        attributes: ["id", "title", "productId"],
        where: { title: { [Op.like]: `%${filter_category}%` } },
      });
      result.maincat = await db.category.findOne({
        attributes: ["id", "name", "slug", "title", "keyword", "desc"],
        where: {
          [Op.or]: [
            { slug: { [Op.like]: `%${filter_category}%` } },
            { name: { [Op.like]: `%${filter_category}%` } },
          ],
        },
      });
      result.subcat = await db.SubCategory.findOne({
        where: {
          [Op.or]: [{ slug: filter_category }, { sub_name: filter_category }],
        },
      });
      result.subchild = await db.SubChildCategory.findOne({
        where: {
          [Op.or]: [{ slug: filter_category }, { name: filter_category }],
        },
      });
      result.brand = await db.ch_brand_detail.findOne({
        where: {
          [Op.or]: [{ slug: filter_category }, { name: filter_category }],
        },
      });
      result.varient = await db.ProductVariant.findOne({
        where: {
          [Op.or]: [
            { productName: { [Op.like]: `%${filter_category}%` } },
            { slug: { [Op.like]: `%${filter_category}%` } },
          ],
        },
        attributes: ["productName", "productId"],
      });
      result.shop = await db.ch_seller_shopdetail.findOne({
        attributes: ["id", "SELLERID", "SHOPNAME"],
        where: {
          SHOPNAME: { [Op.like]: `%${filter_category}%` },
        },
      });
      //limit
      const limit = req.query.limit ? Number(req.query.limit) : 30;
      const page = req.query.page ? Number(req.query.page) : 1;
      query.offset = (page - 1) * limit;
      query.limit = limit;
      query.order = [["id", "DESC"]];
      query.attributes = [
        "id",
        "name",
        "slug",
        "SellerId",
        "PubilshStatus",
        "categoryId",
        "subCategoryId",
        "HighLightDetail",
        "childCategoryId",
      ];
      query.include = [
        {
          model: db.ProductVariant,
          ...whereCond,
          attributes: [
            "id",
            "productName",
            "qty",
            "brandId",
            "thumbnail",
            "distributorPrice",
            "netPrice",
            "discount",
            "discountPer",
          ],
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
        },
      ];
      if (result.tag && result.tag.length) {
        const productIds = result.tag.map(({ productId }) => productId);
        query.where = {
          id: { [Op.in]: productIds },
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0].thumbnail,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });

          let pages = Math.ceil(product.count / limit);
          const SeoList = {
            Title:
              result.subcat && result.subcat.title ? result.subcat.title : null,
            Keyword:
              result.subcat && result.subcat.keyword
                ? result.subcat.keyword
                : null,
            Desc:
              result.subcat && result.subcat.desc ? result.subcat.desc : null,
          };
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
            SeoList: SeoList,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (result.maincat) {
        query.where = {
          [Op.and]: [
            {
              categoryId: result.maincat.id,
            },
            {
              SellerId: { [Op.ne]: null },
            },
          ],
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          const arrData = [];
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              brandId: value.ProductVariants[0]
                ? value.ProductVariants[0].brandId
                : null,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });

          let pages = Math.ceil(product.count / limit);
          const SeoList = {
            Title:
              result.maincat && result.maincat.title
                ? result.maincat.title
                : null,
            Keyword:
              result.maincat && result.maincat.keyword
                ? result.maincat.keyword
                : null,
            Desc:
              result.maincat && result.maincat.desc
                ? result.maincat.desc
                : null,
          };
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
            SeoList: SeoList,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (result.subcat) {
        query.where = {
          [Op.and]: [
            {
              subCategoryId: result.subcat.id,
            },
            {
              SellerId: { [Op.ne]: null },
            },
          ],
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0].thumbnail,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });

          let pages = Math.ceil(product.count / limit);
          const SeoList = {
            Title:
              result.subcat && result.subcat.title ? result.subcat.title : null,
            Keyword:
              result.subcat && result.subcat.keyword
                ? result.subcat.keyword
                : null,
            Desc:
              result.subcat && result.subcat.desc ? result.subcat.desc : null,
          };
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
            SeoList: SeoList,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (result.subchild) {
        query.where = {
          [Op.and]: [
            {
              childCategoryId: result.subchild.id,
            },
            {
              SellerId: { [Op.ne]: null },
            },
          ],
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0].thumbnail,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
              badges: "new",
            };
            arrData.push(dataList);
          });
          let pages = Math.ceil(product.count / limit);
          const SeoList = {
            Title:
              result.subchild && result.subchild.title
                ? result.subchild.title
                : null,
            Keyword:
              result.subchild && result.subchild.keyword
                ? result.subchild.keyword
                : null,
            Desc:
              result.subchild && result.subchild.desc
                ? result.subchild.desc
                : null,
          };
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
            SeoList: SeoList,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (result.brand) {
        whereCond.where.brandId = result.brand.id;
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0].thumbnail,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });
          const SeoList = {
            Title:
              result.brand && result.brand.title ? result.brand.title : null,
            Keyword:
              result.brand && result.brand.keyword
                ? result.brand.keyword
                : null,
            Desc: result.brand && result.brand.desc ? result.brand.desc : null,
          };
          let pages = Math.ceil(product.count / limit);
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
            SeoList: SeoList,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (result.varient) {
        query.where.id = result.varient.productId;
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0].thumbnail,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });
          let pages = Math.ceil(product.count / limit);
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (result.shop) {
        query.where = {
          [Op.and]: [
            {
              PubilshStatus: { [Op.eq]: "Published" },
            },
            {
              SellerId: result.shop.SELLERID,
            },
          ],
        };
        let product = await db.product.findAndCountAll({ ...query });
        if (product.count) {
          const arrData = [];
          product.rows.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              brandId: value.ProductVariants[0]
                ? value.ProductVariants[0].brandId
                : null,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });

          let pages = Math.ceil(product.count / limit);
          const SeoList = {
            Title:
              result.maincat && result.maincat.title
                ? result.maincat.title
                : null,
            Keyword:
              result.maincat && result.maincat.keyword
                ? result.maincat.keyword
                : null,
            Desc:
              result.maincat && result.maincat.desc
                ? result.maincat.desc
                : null,
          };
          const finalResult = {
            count: product.rows.length,
            pages: pages,
            items: arrData,
            SeoList: SeoList,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else {
        var response = Util.getFormatedResponse(false, {
          message: "No data found",
        });
        res.status(response.code).json(response);
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getFilterAllCategoryBrand(req, res, next) {
    const { queryString } = req.query;
    let BrandData = [];
    let ColorData = [];
    const query = {};
    query.where = {};
    try {
      let search = "%%";
      if (queryString) {
        search = "%" + queryString + "%";
      }
      let result = {};
      result.maincat = await db.category.findAll({
        attributes: ["id", "name", "slug", "title", "keyword", "desc"],
        where: { slug: { [Op.like]: search } },
        include: [
          { model: db.SubCategory, attributes: ["id", "sub_name", "slug"] },
        ],
      });
      result.subcat = await db.SubCategory.findAll({
        where: { slug: { [Op.like]: search } },
        include: [
          {
            model: db.SubChildCategory,
            attributes: ["id", "name", "slug"],
          },
        ],
      });
      result.subchild = await db.SubChildCategory.findAll({
        where: { slug: { [Op.like]: search } },
        where: {
          [Op.or]: [
            { name: { [Op.like]: search } },
            { slug: { [Op.like]: search } },
          ],
        },
      });
      result.brand = await db.ch_brand_detail.findAll({
        where: { slug: { [Op.like]: search } },
      });
      query.include = [
        {
          model: db.ProductVariant,
          include: [
            {
              model: db.ch_brand_detail,
              as: "brand",
              attributes: ["id", "name", "slug"],
            },
            {
              model: db.ch_color_detail,
              as: "color",
              attributes: ["id", "TITLE", "CODE"],
            },
          ],
        },
      ];
      if (result.maincat.length) {
        const ids = result.maincat[0].id;
        query.where.categoryId = {
          [Op.in]: [ids],
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAll({ ...query });
        if (product) {
          product.forEach((value) => {
            const brand = value.ProductVariants[0]
              ? value.ProductVariants[0].brand
              : null;
            const color = value.ProductVariants[0]
              ? value.ProductVariants[0].color
              : null;
            BrandData.push(brand);
            ColorData.push(color);
          });
          let checkEmptyColor = ColorData.filter(function (e) {
            return e != null;
          });
          let checkEmptyBrand = BrandData.filter(function (e) {
            return e != null;
          });

          const finalColor = checkEmptyColor.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const finalBrand = checkEmptyBrand.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const filters = [
            {
              type: "category",
              slug: "category",
              name: "Categories",
              items: result.maincat,
            },
            {
              type: "check",
              slug: "brand",
              name: "Brand",
              items: finalBrand,
              value: [],
            },
            { type: "color", slug: "color", name: "Color", items: finalColor },
            {
              type: "range",
              slug: "price",
              name: "Price",
              min: 0,
              max: 100000,
              value: [0, 100000],
            },
          ];
          var response = Util.getFormatedResponse(false, filters, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      } else if (result.subcat.length) {
        const ids = result.subcat[0].id;
        query.where.subcategoryId = {
          [Op.in]: [ids],
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAll({ ...query });
        if (product) {
          product.forEach((value) => {
            const brand = value.ProductVariants[0]
              ? value.ProductVariants[0].brand
              : null;
            const color = value.ProductVariants[0]
              ? value.ProductVariants[0].color
              : null;
            BrandData.push(brand);
            ColorData.push(color);
          });

          let checkEmptyColor = ColorData.filter(function (e) {
            return e != null;
          });
          let checkEmptyBrand = BrandData.filter(function (e) {
            return e != null;
          });

          const finalColor = checkEmptyColor.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const finalBrand = checkEmptyBrand.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const filters = [
            {
              type: "category",
              slug: "category",
              name: "Categories",
              items: result.subcat,
            },
            {
              type: "check",
              slug: "brand",
              name: "Brand",
              items: finalBrand,
              value: [],
            },
            { type: "color", slug: "color", name: "Color", items: finalColor },
            {
              type: "range",
              slug: "price",
              name: "Price",
              min: 0,
              max: 100000,
              value: [0, 100000],
            },
          ];
          var response = Util.getFormatedResponse(false, filters, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      } else if (result.subchild.length) {
        const ids = result.subchild[0].id;
        query.where.childCategoryId = {
          [Op.in]: [ids],
        };
        query.where.PubilshStatus = {
          [Op.eq]: "Published",
        };
        let product = await db.product.findAll({ ...query });
        if (product) {
          product.forEach((value) => {
            const brand = value.ProductVariants[0]
              ? value.ProductVariants[0].brand
              : null;
            const color = value.ProductVariants[0]
              ? value.ProductVariants[0].color
              : null;
            BrandData.push(brand);
            ColorData.push(color);
          });

          let checkEmptyColor = ColorData.filter(function (e) {
            return e != null;
          });
          let checkEmptyBrand = BrandData.filter(function (e) {
            return e != null;
          });

          const finalColor = checkEmptyColor.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const finalBrand = checkEmptyBrand.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const filters = [
            {
              type: "category",
              slug: "category",
              name: "Categories",
              items: result.subchild,
            },
            {
              type: "check",
              slug: "brand",
              name: "Brand",
              items: finalBrand,
              value: [],
            },
            { type: "color", slug: "color", name: "Color", items: finalColor },
            {
              type: "range",
              slug: "price",
              name: "Price",
              min: 0,
              max: 100000,
              value: [0, 100000],
            },
          ];
          var response = Util.getFormatedResponse(false, filters, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      } else if (result.brand.length) {
        const ids = result.brand[0].id;
        let product = await db.ProductVariant.findAll({
          where: {
            brandId: { [Op.in]: [ids] },
          },
          include: [
            {
              model: db.ch_brand_detail,
              as: "brand",
              attributes: ["id", "name", "slug"],
            },
            {
              model: db.ch_color_detail,
              as: "color",
              attributes: ["id", "TITLE", "CODE"],
            },
          ],
        });
        if (product) {
          product.forEach((value) => {
            const brand = value.brand;
            const color = value.color;
            BrandData.push(brand);
            ColorData.push(color);
          });

          let checkEmptyColor = ColorData.filter(function (e) {
            return e != null;
          });
          let checkEmptyBrand = BrandData.filter(function (e) {
            return e != null;
          });

          const finalColor = checkEmptyColor.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const finalBrand = checkEmptyBrand.reduce((unique, o) => {
            if (!unique.some((obj) => obj.id === o.id)) {
              unique.push(o);
            }
            return unique;
          }, []);
          const filters = [
            {
              type: "category",
              slug: "category",
              name: "Categories",
              items: result.subcat,
            },
            {
              type: "check",
              slug: "brand",
              name: "Brand",
              items: finalBrand,
              value: [],
            },
            { type: "color", slug: "color", name: "Color", items: finalColor },
            {
              type: "range",
              slug: "price",
              name: "Price",
              min: 0,
              max: 100000,
              value: [0, 100000],
            },
          ];
          var response = Util.getFormatedResponse(false, filters, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      } else {
        var response = Util.getFormatedResponse(false, {
          message: "No data found",
        });
        res.status(response.code).json(response);
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getAutoSuggestList(req, res, next) {
    let { query } = req.query;
    let search = "%";
    if (query) {
      search = query + "%";
    }
    try {
      let result = {};
      result.tag = await db.tag.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("title")), "title"],
        ],
        where: { title: { [Op.like]: search } },
      });
      result.maincat = await db.category.findAll({
        where: { name: { [Op.like]: search }, status: "1" },
      });
      result.subcat = await db.SubCategory.findAll({
        where: { sub_name: { [Op.like]: search } },
      });
      result.subchild = await db.SubChildCategory.findAll({
        where: { name: { [Op.like]: search } },
      });
      result.brand = await db.ch_brand_detail.findAll({
        where: { name: { [Op.like]: search }, status: true },
      });
      result.varient = await db.ProductVariant.findAll({
        where: { productName: { [Op.like]: search } },
        include: [
          {
            model: db.product,
            attributes: ["id"],
            where: {
              SellerId: { [Op.ne]: null },
              PubilshStatus: { [Op.eq]: "Published" },
            },
          },
        ],
      });
      var newList = [];
      if (
        (result.tag && result.tag.length) ||
        (result.maincat && result.maincat.length) ||
        (result.subcat && result.subcat.length) ||
        (result.subchild && result.subchild.length) ||
        (result.brand && result.brand.length) ||
        result.varient
      ) {
        for (let i = 0; i < result.tag.length; i++) {
          const assignee = result.tag[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.title,
            slug: assignee.title,
          };
          newList.push(assigneeData);
        }
        for (let i = 0; i < result.maincat.length; i++) {
          const assignee = result.maincat[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.name,
            slug: assignee.slug,
            thumbnail: assignee.thumbnail,
          };
          newList.push(assigneeData);
        }
        for (let i = 0; i < result.subcat.length; i++) {
          const assignee = result.subcat[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.sub_name,
            slug: assignee.slug,
          };
          newList.push(assigneeData);
        }
        for (let i = 0; i < result.subchild.length; i++) {
          const assignee = result.subchild[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.name,
            slug: assignee.slug,
          };
          newList.push(assigneeData);
        }
        for (let i = 0; i < result.brand.length; i++) {
          const assignee = result.brand[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.name,
            slug: assignee.slug,
          };
          newList.push(assigneeData);
        }
        for (let i = 0; i < result.varient.length; i++) {
          const assignee = result.varient[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.productName,
            slug: assignee.slug,
            thumbnail: assignee.thumbnail,
          };
          newList.push(assigneeData);
        }
        var response = Util.getFormatedResponse(false, newList, {
          message: "Success",
        });
        res.status(response.code).json(response);
      } else {
        let response = Util.getFormatedResponse(true, {
          message: "No data found",
        });
        res.status(response.code).json(response);
      }
    } catch (err) {
      console.log(err);
      throw new RequestError(err);
    }
  },
  async relatedProduct(req, res, next) {
    const { productId, slug } = req.query;
    const limit = 50;
    const query = {};
    query.where = {};

    query.limit = limit;
    query.order = [["id", "DESC"]];
    query.attributes = [
      "id",
      "name",
      "slug",
      "SellerId",
      "PubilshStatus",
      "categoryId",
      "subCategoryId",
      "childCategoryId",
    ];
    query.include = [
      {
        model: db.ProductVariant,
        attributes: [
          "id",
          "productName",
          "qty",
          "thumbnail",
          "distributorPrice",
          "netPrice",
          "discount",
          "discountPer",
        ],
        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
      },
    ];
    query.where.SellerId = {
      [Op.ne]: null,
    };
    query.where.PubilshStatus = {
      [Op.eq]: "Published",
    };
    try {
      const product = await db.product.findOne({
        where: {
          id: productId,
          slug: slug,
          SellerId: { [Op.ne]: null },
          PubilshStatus: { [Op.eq]: "Published" },
        },
      });
      const varient = await db.ProductVariant.findOne({
        attributes: ["id", "productId"],
        where: {
          id: productId,
          slug: slug,
        },
        include: [
          {
            model: db.product,
            attributes: ["id", "childCategoryId"],
            where: { PubilshStatus: { [Op.eq]: "Published" } },
          },
        ],
      });
      if (product && product.id) {
        query.where.childCategoryId = product.childCategoryId;
        const finalResult = await db.product.findAll(query);
        if (finalResult.length) {
          const arrData = [];
          finalResult.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });
          let response = Util.getFormatedResponse(false, arrData, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      } else if (varient && varient.product) {
        query.where.childCategoryId = varient.product.childCategoryId;
        const finalResult = await db.product.findAll(query);
        if (finalResult.length) {
          const arrData = [];
          finalResult.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
              HighLightDetail: value.HighLightDetail,
            };
            arrData.push(dataList);
          });
          let response = Util.getFormatedResponse(false, arrData, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      } else {
        var response = Util.getFormatedResponse(false, {
          message: "No data found",
        });
        res.status(response.code).json(response);
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getHomeKitchen(req, res, next) {
    const catId = await db.category.findOne({
      attributes: ["id"],
      where: { slug: "home-and-kitchen" },
    });
    const query = {};
    const limit = 50;
    query.where = {};
    query.include = [
      {
        model: db.ProductVariant,
        include: [
          {
            model: db.ch_brand_detail,
            as: "brand",
            attributes: ["id", "name", "slug"],
          },
          {
            model: db.ch_color_detail,
            as: "color",
            attributes: ["id", "TITLE", "CODE"],
          },
        ],
      },
    ];
    query.order = [["createdAt", "DESC"]];
    query.where.SellerId = {
      [Op.ne]: null,
    };
    query.where.name = {
      [Op.ne]: null,
    };
    query.where.PubilshStatus = {
      [Op.eq]: "Published",
    };
    query.limit = limit;
    try {
      if (catId && catId.id) {
        query.where.categoryId = catId.id;
        let product = await db.product.findAll({ ...query });
        if (product.length > 0) {
          const arrData = [];
          product.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
            };
            arrData.push(dataList);
          });
          const finalResult = await Promise.all(arrData);
          const response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      }
    } catch (err) {
      console.log(err);
      throw new RequestError(err);
    }
  },
  async getWomenFashion(req, res, next) {
    const catId = await db.category.findOne({
      attributes: ["id"],
      where: { slug: "women" },
    });
    const limit = 20;
    const query = {};
    query.where = {};
    query.include = [
      {
        model: db.ProductVariant,
        include: [
          {
            model: db.ch_brand_detail,
            as: "brand",
            attributes: ["id", "name", "slug"],
          },
          {
            model: db.ch_color_detail,
            as: "color",
            attributes: ["id", "TITLE", "CODE"],
          },
        ],
      },
    ];
    query.order = [["createdAt", "DESC"]];
    query.where.SellerId = {
      [Op.ne]: null,
    };
    query.where.name = {
      [Op.ne]: null,
    };
    query.where.PubilshStatus = {
      [Op.eq]: "Published",
    };
    query.limit = limit;
    try {
      if ( catId && catId.id) {
        query.where.categoryId = catId.id;
        let product = await db.product.findAll({ ...query });
        if (product.length > 0) {
          const arrData = [];
          product.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
            };
            arrData.push(dataList);
          });
          const finalResult = await Promise.all(arrData);
          const response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getMakeup(req, res, next) {
    const catId = await db.SubCategory.findOne({
      attributes: ["id", "sub_name"],
      where: { slug: req.query.type },
    });
    const subchild = await db.SubChildCategory.findOne({
      attributes: ["id", "name"],
      where: { slug: req.query.type },
    });
    const limit = 20;
    const query = {};
    query.where = {};
    query.include = [
      {
        model: db.ProductVariant,
        include: [
          {
            model: db.ch_brand_detail,
            as: "brand",
            attributes: ["id", "name", "slug"],
          },
          {
            model: db.ch_color_detail,
            as: "color",
            attributes: ["id", "TITLE", "CODE"],
          },
        ],
      },
    ];
    query.order = [["createdAt", "DESC"]];
    query.where.SellerId = {
      [Op.ne]: null,
    };
    query.where.name = {
      [Op.ne]: null,
    };
    query.where.PubilshStatus = {
      [Op.eq]: "Published",
    };
    query.limit = limit;
    try {
      if (catId && catId.id) {
        query.where.subCategoryId = catId.id;
        let product = await db.product.findAll({ ...query });
        if (product.length > 0) {
          const arrData = [];
          product.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
            };
            arrData.push(dataList);
          });
          const finalResult = await Promise.all(arrData);
          const response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else if (subchild && subchild.id) {
        query.where.childCategoryId = subchild.id;
        let product = await db.product.findAll({ ...query });
        if (product.length > 0) {
          const arrData = [];
          product.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
            };
            arrData.push(dataList);
          });
          const finalResult = await Promise.all(arrData);
          const response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          let response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      } else {
        let response = Util.getFormatedResponse(false, {
          message: "No data found",
        });
        res.status(response.code).json(response);
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getMenFashion(req, res, next) {
    const catId = await db.category.findOne({
      attributes: ["id"],
      where: { slug: "men-fashion" },
    });
    const limit = 20;
    const query = {};
    query.where = {};
    query.include = [
      {
        model: db.ProductVariant,
        include: [
          {
            model: db.ch_brand_detail,
            as: "brand",
            attributes: ["id", "name", "slug"],
          },
          {
            model: db.ch_color_detail,
            as: "color",
            attributes: ["id", "TITLE", "CODE"],
          },
        ],
      },
    ];
    query.order = [["createdAt", "DESC"]];
    query.where.SellerId = {
      [Op.ne]: null,
    };
    query.where.name = {
      [Op.ne]: null,
    };
    query.where.PubilshStatus = {
      [Op.eq]: "Published",
    };
    query.limit = limit;
    try {
      if (catId && catId.id) {
        query.where.categoryId = catId.id;
        let product = await db.product.findAll({ ...query });
        if (product.length > 0) {
          const arrData = [];
          product.forEach((value) => {
            const dataList = {
              ProductId: value.id,
              VarientId: value.ProductVariants[0]
                ? value.ProductVariants[0].id
                : null,
              Name: value.name,
              slug: value.slug,
              qty: value.ProductVariants[0]
                ? value.ProductVariants[0].qty
                : null,
              Thumbnail: value.ProductVariants[0]
                ? value.ProductVariants[0].thumbnail
                : null,
              distributorPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].distributorPrice
                : null,
              netPrice: value.ProductVariants[0]
                ? value.ProductVariants[0].netPrice
                : null,
              discount: value.ProductVariants[0]
                ? value.ProductVariants[0].discount
                : null,
              discountPer: value.ProductVariants[0]
                ? value.ProductVariants[0].discountPer
                : null,
            };
            arrData.push(dataList);
          });
          const finalResult = await Promise.all(arrData);
          const response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No data found",
          });
          res.status(response.code).json(response);
        }
      }
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getPopularCategory(req, res, next) {
    try {
      await db.category
        .findAll({
          where: {
            slug: {
              [Op.in]: [
                "home-and-kitchen",
                "women",
                "personal-care",
                "tv-appliances",
                "men-fashion",
                "electronics",
              ],
            },
          },
          include: [
            { model: db.SubCategory, attributes: ["id", "sub_name", "slug"] },
          ],
        })
        .then((result) => {
          return Promise.all(result);
        })
        .then((list) => {
          let response = Util.getFormatedResponse(false, list, {
            message: "Success",
          });
          res.status(response.code).json(response);
        });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async createAddress(req, res, next) {
    try {
      const { fullName, phone, zoneName, city, shippingAddress } = req.body;
      db.customer
        .findOne({
          where: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role,
          },
        })
        .then((customer) => {
          if (customer) {
            return db.Address.create({
              custId: req.user.id,
              fullname: fullName,
              phone: phone,
              city: city,
              states: zoneName,
              shipping: shippingAddress,
            });
          } else {
            var response = Util.getFormatedResponse(false, {
              message: "No found data",
            });
            res.status(response.code).json(response);
          }
        })
        .then((re) => {
          var response = Util.getFormatedResponse(false, {
            message: "Success",
          });
          res.status(response.code).json(response);
        })
        .catch((err) => {
          var response = Util.getFormatedResponse(false, {
            message: err,
          });
          res.status(response.code).json(response);
        });
    } catch (err) {
      var response = Util.getFormatedResponse(false, {
        message: err,
      });
      res.status(response.code).json(response);
    }
  },
  async createOrder(req, res, next) {
    try {
      const { payment, addressId, shippingPrice, total, cart } = req.body;
      const query = {};
      query.where = {};
      db.customer
        .findOne({ where: { id: req.user.id, email: req.user.email } })
        .then(async (customer) => {
          const t = await db.sequelize.transaction();
          let orderId =
            "OD" +
            Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
          if (customer) {
            try {
              const order = await db.Order.create(
                {
                  addressId: addressId,
                  custId: req.user.id,
                  number: orderId,
                  grandtotal: total,
                  paymentmethod: payment,
                },
                { transaction: t }
              );

              let cartEntries = [];
              cart.forEach((value) => {
                cartEntries.push({
                  orderId: order.id,
                  custId: req.user.id,
                  addressId: addressId,
                  productId: value.productId,
                  varientId: value.varientId,
                  qty: value.quantity,
                });
              });
              if (cartEntries.length)
                await db.Cart_Detail.bulkCreate(cartEntries, {
                  transaction: t,
                });
              await db.OrderNotification.create({
                orderId: order.id,
                userId: req.user.id,
              });

              // find product list in cart
              let addrdetails = await findAddressList(addressId, {
                transaction: t,
              });
              //end
              await mailer.sendInvoiceForCustomerNew(
                req.body,
                addrdetails,
                orderId,
                req.user,
                { transaction: t }
              );
              let productIds = [];
              cart.forEach((value) => {
                productIds.push(value.productId);
              });
              query.where.id = {
                [Op.in]: productIds,
              };
              query.attributes = ["id", "SellerId"];
              query.include = [
                {
                  model: db.user,
                  attributes: ["id", "email"],
                  required: false,
                  as: "users",
                },
              ];
              const seller = await db.product.findAll(query, {
                transaction: t,
              });

              /* seller email send */
              const sellerProduct = filterSellerProduct(req.body.cart, seller);
              if (sellerProduct && sellerProduct.length) {
                sellerProduct.forEach(async (value) => {
                  const product = {
                    thumbnail: value.thumbnail,
                    productName: value.productName,
                    qty: value.quantity,
                    netPrice: value.netPrice,
                  };
                  const sellerEmail = value.users?.email;
                  const custDetail = {
                    email: customer.email,
                    name: customer.firstName + " " + customer.lastName,
                    phone: customer.phone,
                    email: customer.email,
                  };
                  await mailer.sendInvoiceForSeller(
                    product,
                    addrdetails,
                    orderId,
                    custDetail,
                    sellerEmail,
                    { transaction: t }
                  );
                });
              }
              /* end */
              return t.commit();
            } catch (err) {
              await t.rollback();
              throw new RequestError(err);
            }
          } else {
            var response = Util.getFormatedResponse(false, {
              message: "No found data",
            });
            res.status(response.code).json(response);
          }
        })
        .then((re) => {
          var response = Util.getFormatedResponse(false, {
            message: "Ordered successfully! please check your account",
          });
          res.status(response.code).json(response);
        })
        .catch((err) => {
          var response = Util.getFormatedResponse(false, {
            message: err,
          });
          res.status(response.code).json(response);
        });
    } catch (err) {
      console.log(err);
      var response = Util.getFormatedResponse(false, {
        message: err,
      });
      res.status(response.code).json(response);
    }
  },
  async orderHistory(req, res, next) {
    const arrData = [];
    const limit = 100;
    const query = {};
    query.where = {};

    query.where.custId = req.user.id;
    query.attributes = ["id", "number", "grandtotal", "createdAt"];
    query.order = [["createdAt", "DESC"]];
    query.include = [
      {
        model: db.Cart_Detail,
        attributes: ["id", "qty", "status", "deliveryDate"],
        include: [
          {
            model: db.ProductVariant,
            as: "varient",
            attributes: ["id", "productId", "productName", "thumbnail"],
          },
        ],
      },
    ];
    try {
      db.Order.findAndCountAll(query).then((list) => {
        if (list) {
          list.rows.forEach((value) => {
            const dataList = {
              id: value.id,
              OrderNo: value.number,
              OrderDate: value.createdAt,
              Status: value.name,
              Total: value.grandtotal,
              count: value.Cart_Details.length,
              Items: value.Cart_Details,
            };
            arrData.push(dataList);
          });

          let pages = Math.ceil(list.count / limit);
          const finalResult = {
            count: list.count,
            pages: pages,
            items: arrData,
          };
          var response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No found data",
          });
          res.status(response.code).json(response);
        }
      });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async orderProductList(req, res, next) {
    const arrData = [];
    const query = {};
    query.where = {};

    query.where.orderId = req.body.orderId;
    query.attributes = ["id", "qty", "status", "deliveryDate"];
    query.order = [["createdAt", "DESC"]];
    query.include = [
      {
        model: db.ProductVariant,
        as: "varient",
        attributes: [
          "id",
          "productId",
          "productName",
          "thumbnail",
          "unitSize",
          "netPrice",
        ],
        include: [
          { model: db.ch_brand_detail, as: "brand", attributes: ["name"] },
        ],
      },
    ];
    try {
      db.Cart_Detail.findAll(query).then((list) => {
        if (list) {
          list.forEach((value) => {
            const dataList = {
              id: value.varient ? value.varient.id : null,
              thumbnail: value.varient ? value.varient.thumbnail : null,
              name: value.varient ? value.varient.productName : null,
              qty: value.qty,
              size: value.varient ? value.varient.unitSize : null,
              total: value.varient ? value.qty * value.varient.netPrice : null,
              brand:
                value.varient && value.varient.brand
                  ? value.varient.brand.name
                  : null,
              status: value.status,
            };
            arrData.push(dataList);
          });
          var response = Util.getFormatedResponse(false, arrData, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No found data",
          });
          res.status(response.code).json(response);
        }
      });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async orderProductDetail(req, res, next) {
    const query = {};
    query.where = {};

    query.where = {
      [Op.and]: [
        {
          orderId: req.body.orderId,
        },
        {
          varientId: req.body.varientId,
        },
      ],
    };

    query.attributes = ["id", "qty", "status", "deliveryDate"];
    query.order = [["createdAt", "DESC"]];
    query.include = [
      {
        model: db.ProductVariant,
        as: "varient",
        attributes: [
          "id",
          "productId",
          "productName",
          "thumbnail",
          "unitSize",
          "netPrice",
        ],
        include: [
          { model: db.ch_brand_detail, as: "brand", attributes: ["name"] },
        ],
      },
      { model: db.Address, as: "address" },
    ];
    try {
      db.Cart_Detail.findOne(query).then((list) => {
        if (list) {
          const dataList = {
            id: list.id,
            thumbnail: list.varient.thumbnail,
            name: list.varient.productName,
            qty: list.qty,
            size: list.varient.unitSize,
            total: list.qty * list.varient.netPrice,
            brand: list.varient.brand.name,
            status: list.status,
            deliveryDate: list.deliveryDate,
            customerName: list.address.fullname,
            phone: list.address.phone,
            city: list.address.city,
            zone: list.address.states,
            shipping: list.address.shipping,
          };
          var response = Util.getFormatedResponse(false, dataList, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          var response = Util.getFormatedResponse(false, {
            message: "No found data",
          });
          res.status(response.code).json(response);
        }
      });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async orderdProductCancel(req, res, next) {
    const { varientId, issue, comment } = req.body;
    try {
      db.Cart_Detail.findOne({
        where: { varientId: varientId },
      })
        .then(async (list) => {
          const t = await db.sequelize.transaction();
          if (list) {
            try {
              await db.Order_Details_Status.create(
                {
                  orderId: list.orderId,
                  custId: req.user.id,
                  productId: list.varientId,
                  status: 0,
                  issue: issue,
                  comment: comment,
                },
                { transaction: t }
              );

              await db.Cart_Detail.update(
                {
                  status: "cancelRequest",
                  deliveryDate: new Date(),
                },
                { where: { id: list.id } }
              );

              return t.commit();
            } catch (err) {
              await t.rollback();
              throw new RequestError(err);
            }
          }
        })
        .then((success) => {
          var response = Util.getFormatedResponse(false, {
            message: "Success",
          });
          res.status(response.code).json(response);
        });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Unfortuntely something is wrong" });
    }
  },
  async collectionList(req, res, next) {
    const query = {};
    query.where = {};
    query.where.sequence = {
      [Op.ne]: 0,
    };
    query.order = [["Sequence", "ASC"]];
    query.attributes = ["id", "name", "slug"];
    query.include = [
      {
        model: db.item,
        attributes: ["id", "name", "slug", "thumbnail"],
      },
    ];
    try {
      db.collection
        .findAll(query)
        .then((list) => {
          let response = Util.getFormatedResponse(false, list, {
            message: "Successfully",
          });
          res.status(response.code).json(response);
        })
        .catch((error) => {
          let response = Util.getFormatedResponse(false, {
            message: error,
          });
          res.status(response.code).json(response);
        });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Unfortuntely something is wrong" });
    }
  },
  async flashSale(req, res, next) {
    const arrData = [];
    const flashArr = [];

    const query = {};
    query.where = {};
    query.where.status = 1;
    query.include = [
      {
        model: db.ch_flash_sale_item,
        order: [["createdAt", "DESC"]],
        as: "flashSaleItem",
        attributes: ["id"],
        include: [
          {
            model: db.product,
            as: "productList",
            attributes: ["id", "name", "slug"],
            include: [
              {
                model: db.ProductVariant,
                include: [
                  {
                    model: db.ch_brand_detail,
                    as: "brand",
                    attributes: ["id", "name", "slug"],
                  },
                  {
                    model: db.ch_color_detail,
                    as: "color",
                    attributes: ["id", "TITLE", "CODE"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    try {
      db.ch_flash_sale
        .findAll(query)
        .then((list) => {
          if (list && list.length) {
            list.forEach((flashSale) => {
              flashSale.flashSaleItem.forEach((item) => {
                const dataList = {
                  ProductId: item.productList.id,
                  VarientId: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].id
                    : null,
                  Name: item.productList.name,
                  slug: item.productList.slug,
                  qty: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].qty
                    : null,
                  Thumbnail: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].thumbnail
                    : null,
                  distributorPrice: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].distributorPrice
                    : null,
                  netPrice: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].netPrice
                    : null,
                  discount: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].discount
                    : null,
                  discountPer: item.productList.ProductVariants[0]
                    ? item.productList.ProductVariants[0].discountPer
                    : null,
                  badges: "flash",
                };
                arrData.push(dataList);
              });
            });
            list.forEach((flashSale) => {
              let flash = {
                title: flashSale.title,
                thumbnail: flashSale.thumbnail,
                slug: flashSale.slug,
                startDate: flashSale.startDate,
                endDate: flashSale.endDate,
                product: arrData,
              };
              flashArr.push(flash);
            });
          }
          let response = Util.getFormatedResponse(false, flashArr, {
            message: "Successfully",
          });
          res.status(response.code).json(response);
        })
        .catch((error) => {
          let response = Util.getFormatedResponse(false, {
            message: error,
          });
          res.status(response.code).json(response);
        });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Unfortuntely something is wrong" });
    }
  },
  async areaList(req, res, next) {
    try {
      db.area
        .findAll({
          where: { locationId: req.body.id },
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError(err);
    }
  },
};
