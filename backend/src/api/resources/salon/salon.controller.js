import { db } from "../../../models";
import config from "../../../config";
import AWS from "aws-sdk";
var Util = require("../../../helpers/Util");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const s3 = new AWS.S3({
  accessKeyId: config.app.AWS_ACCESS_KEY,
  secretAccessKey: config.app.AWS_SECRET_KEY,
});

var deleteFileFromS3 = async (imgUrl) => {
  try {
    const lastItem = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
    var params = {
      Bucket: "grociproduct",
      Key: lastItem,
    };
    s3.deleteObject(params, (error, data) => {
      if (error) {
        console.log(error, error.stack);
      }
      return data;
    });
  } catch (error) {
    assert.isNotOk(error, "Promise error");
    done();
  }
};

export default {
  /* Add user api start here................................*/

  async index(req, res, next) {
    try {
      const { salonCategoryName, salonSlug, sortDesc, gender, thumbnail } =
        req.body;
      db.ch_salon_category
        .findOne({
          where: { salonCategoryName: salonCategoryName, Gender: gender },
        })
        .then((data) => {
          if (data) {
            res
              .status(409)
              .json({ success: false, msg: "already exist in list" });
          }
          return db.ch_salon_category.create({
            salonCategoryName: salonCategoryName,
            salonSlug: salonSlug,
            Gender: gender,
            Thumbnail: req.file ? req.file.location : "",
            sortDesc: sortDesc,
            Status: 1,
          });
        })
        .then((success) => {
          res.status(201).json({ success: true, msg: "Successfully inserted" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getList(req, res, next) {
    const { searchString, gender } = req.query;
    const query = {};
    query.where = {};
    query.order = [["createdAt", "DESC"]];
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    // const offset = limit * (page - 1);

    query.limit = limit;
    query.offset = limit * (page - 1);
    if (searchString) {
      query.where = {
        [Op.or]: [
          {
            salonCategoryName: {
              [Op.like]: "%" + searchString + "%",
            },
          },
          {
            salonSlug: {
              [Op.like]: "%" + searchString + "%",
            },
          },
        ],
      };
    }
    if (gender) {
      query.where.Gender = gender;
    }
    try {
      db.ch_salon_category
        .findAndCountAll(query)
        .then((list) => {
          let pages = Math.ceil(list.count / limit);
          const finalResult = {
            count: list.count,
            pages: pages,
            page: page,
            items: list.rows,
          };
          let response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      throw new RequestError(err);
    }
  },

  async getUpdate(req, res, next) {
    const {
      id,
      salonCategoryName,
      salonSlug,
      sortDesc,
      Gender,
      thumbnail,
      Status,
    } = req.body;
    try {
      db.ch_salon_category
        .findOne({
          where: { id: id },
        })
        .then((data) => {
          if (data) {
            return db.ch_salon_category.update(
              {
                salonCategoryName: salonCategoryName
                  ? salonCategoryName
                  : data.salonCategoryName,
                salonSlug: salonSlug ? salonSlug : data.salonSlug,
                Gender: Gender ? Gender : data.gender,
                Thumbnail: req.file ? req.file.location : data.thumbnail,
                sortDesc: sortDesc ? sortDesc : data.sortDesc,
                Status: Status ? Status : data.Status,
              },
              { where: { id: id } }
            );
          }
        })
        .then((success) => {
          res.status(200).json({ success: true, data: success });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  //service api

  async serviceCreate(req, res, next) {
    try {
      const { SERVICENAME, CAT_ID, SORTDESC, SLUG } = req.body;
      if (CAT_ID) {
        db.ch_salon_service
          .create({
            SERVICENAME: SERVICENAME,
            SLUG: SLUG,
            CAT_ID: CAT_ID,
            SORTDESC: SORTDESC,
            OWNERID: req.user.id,
            STATUS: 1,
          })
          .then((success) => {
            res
              .status(201)
              .json({ success: true, msg: "Successfully inserted" });
          })
          .catch(function (err) {
            next(err);
          });
      } else {
        res
          .status(500)
          .json({ success: false, msg: "please select salon category" });
      }
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async serviceDelete(req, res, next) {
    try {
      const { id } = req.body;
      db.ch_salon_service
        .findOne({
          where: { id: id },
        })
        .then((list) => {
          return db.ch_salon_service.destroy({ where: { id: id } });
        })
        .then((success) => {
          res.status(201).json({ success: true, msg: "Successfully deleted" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getServiceList(req, res, next) {
    const { searchString, gender } = req.query;
    const query = {};
    query.where = {};

    const whereCond = {};
    whereCond.where = {};

    query.order = [["createdAt", "DESC"]];
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;

    query.limit = limit;
    query.offset = limit * (page - 1);
    query.where.OWNERID = req.user.id;
    if (searchString) {
      whereCond.where = {
        [Op.or]: [
          {
            salonCategoryName: {
              [Op.like]: "%" + searchString + "%",
            },
          },
          {
            salonSlug: {
              [Op.like]: "%" + searchString + "%",
            },
          },
        ],
      };
    }
    if (gender) {
      whereCond.where.Gender = gender;
    }
    query.include = [
      { model: db.ch_salon_category, as: "category", ...whereCond },
    ];
    try {
      db.ch_salon_service
        .findAndCountAll(query)
        .then((list) => {
          let pages = Math.ceil(list.count / limit);
          const finalResult = {
            count: list.count,
            pages: pages,
            page: page,
            items: list.rows,
          };
          let response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getServiceByGender(req, res, next) {
    const finalResult = [];
    const query = {};
    query.where = {};
    query.where.OWNERID = req.user.id;
    query.include = [{ model: db.ch_salon_category, as: "category" }];
    try {
      db.ch_salon_service
        .findAll(query)
        .then((list) => {
          list.forEach((value) => {
            const salonList = {
              id: value.id,
              serviceName: value.SERVICENAME,
              categoryName: value.category
                ? value.category.salonCategoryName
                : "",
              catId: value.category ? value.category.id : "",
              gender: value.category ? value.category.Gender : "",
            };
            finalResult.push(salonList);
          });
          let response = Util.getFormatedResponse(false, finalResult, {
            message: "Success",
          });
          res.status(response.code).json(response);
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getServiceUpdate(req, res, next) {
    const { id, SERVICENAME, CAT_ID, SORTDESC, STATUS, SLUG } = req.body;
    try {
      db.ch_salon_service
        .findOne({
          where: { id: req.body.id },
        })
        .then((data) => {
          if (data) {
            return db.ch_salon_service.update(
              {
                SERVICENAME: SERVICENAME ? SERVICENAME : data.SERVICENAME,
                SLUG: SLUG ? SLUG : data.SLUG,
                CAT_ID: CAT_ID ? CAT_ID : data.CAT_ID,
                SORTDESC: SORTDESC ? SORTDESC : data.SORTDESC,
                STATUS: STATUS ? STATUS : data.STATUS,
              },
              { where: { id: id } }
            );
          }
        })
        .then((success) => {
          res.status(200).json({ success: true, msg: "Successfully update" });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getFilterCategory(req, res, next) {
    const { Gender } = req.body;
    try {
      db.ch_salon_category
        .findAll({
          where: { Gender: Gender },
        })
        .then((success) => {
          res.status(200).json({ success: true, data: success });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getServiceCategoryList(req, res, next) {
    const { Gender } = req.body;
    let result = {};
    try {
      result = await db.ch_salon_category.findAll({
        where: { Gender: Gender },
        include: [{ model: db.ch_salon_service, as: "service" }],
      });
      return res.status(200).json({ success: true, data: result });
    } catch (err) {
      console.log(err);
      throw new RequestError("Error");
    }
  },

  async deleteCategory(req, res, next) {
    const { id } = req.body;
    try {
      db.ch_salon_category
        .findOne({
          where: { id: id },
        })
        .then(async (list) => {
          console.log(JSON.stringify(list));
          const t = await db.sequelize.transaction();
          if (list) {
            try {
              await deleteFileFromS3(list.Thumbnail, { transaction: t });
              await db.ch_salon_category.destroy(
                { where: { id: list.id } },
                { transaction: t }
              );
              return t.commit();
            } catch (err) {
              await t.rollback();
              throw err;
            }
          }
        })
        .then((success) => {
          res.status(200).json({ success: true, msg: "Deleted successfully" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async createParlour(req, res, next) {
    const {
      selectSalonCity,
      SalonPhoneNo,
      SalonName,
      Slug,
      SalonAddress,
      salonServicePrice,
    } = req.body;
    let serviceVarients = JSON.parse(salonServicePrice);
    try {
      db.user
        .findOne({
          where: { id: req.user.id },
        })
        .then(async (list) => {
          if (list) {
            const t = await db.sequelize.transaction();
            try {
              const salonCreated = await db.ch_salon_detail.create(
                {
                  OWNERID: req.user.id,
                  NAME: SalonName,
                  PHONENO: SalonPhoneNo,
                  CITY: selectSalonCity,
                  SLUG: Slug,
                  ADDRESS: SalonAddress,
                  // LAT: LAT,
                  // LONG: LONG
                  THUMBNAIL: req.file ? req.file.location : "",
                },
                { transaction: t }
              );

              let priceEntries = [];
              for (var i = 0; i < serviceVarients.length; i++) {
                const DISCOUNTPRICE = Math.round(
                  serviceVarients[i].SalonPrice - serviceVarients[i].netPrice
                );
                const DISCOUNTPER =
                  Math.round(DISCOUNTPRICE / serviceVarients[i].SalonPrice) *
                  100;
                priceEntries.push({
                  SALONID: salonCreated.id,
                  GENDER: serviceVarients[i].gender,
                  OWNERID: salonCreated.id,
                  SERVICEID: serviceVarients[i].serviceId,
                  PRICE: serviceVarients[i].SalonPrice,
                  TOTAL: serviceVarients[i].netPrice,
                  GRANDTOTAL: serviceVarients[i].netPrice,
                  DISCOUNTPRICE: DISCOUNTPRICE,
                  DISCOUNTPER: DISCOUNTPER,
                });
              }
              if (priceEntries.length)
                await db.ch_salon_price_detail.bulkCreate(priceEntries, {
                  transaction: t,
                });
              return t.commit();
            } catch (err) {
              await t.rollback();
              throw err;
            }
          }
        })
        .then((success) => {
          res
            .status(200)
            .json({ success: true, msg: "Successfully inserted in list" });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      throw new RequestError(err);
    }
  },

  async getAllParlourList(req, res, next) {
    const query = {};
    query.where = {};
    query.include = [
      {
        model: db.user,
        where: { role: "salon" },
        attributes: ["firstName", "role"],
        as: "owner",
      },
    ];
    try {
      db.ch_salon_detail
        .findAll(query)
        .then((list) => {
          let response = Util.getFormatedResponse(false, list, {
            message: "Success",
          });
          res.status(response.code).json(response);
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError(err);
    }
  },

  async getPrlourById(req, res, next) {
    try {
      db.ch_salon_detail
        .findAll({
          order: [["createdAt", "DESC"]],
          where: {
            OWNERID: req.user.id,
          },
          include: [
            {
              model: db.user,
              as: "owner",
              attributes: ["firstName", "role"],
              where: {
                id: req.user.id,
              },
            },
            {
              model: db.ch_salon_price_detail,
              as: "pricelist",
              include: [{ model: db.ch_salon_service, as: "servicelist" }],
            },
          ],
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async updateParlour(req, res, next) {
    const {
      selectSalonCity,
      SalonPhoneNo,
      salonId,
      SalonName,
      Slug,
      SalonAddress,
      // LAT,
      // LONG,
      salonServicePrice,
    } = req.body;
    let serviceVarients = JSON.parse(salonServicePrice);
    try {
      db.ch_salon_detail
        .findOne({
          where: { id: salonId },
        })
        .then(async (list) => {
          if (list) {
            const t = await db.sequelize.transaction();
            try {
              const salonCreated = await db.ch_salon_detail.update(
                {
                  NAME: SalonName,
                  PHONENO: SalonPhoneNo,
                  CITY: selectSalonCity,
                  SLUG: Slug,
                  ADDRESS: SalonAddress,
                  THUMBNAIL: req.file ? req.file.location : req.body.thumbnail,
                },
                { where: { id: salonId } },
                { transaction: t }
              );

              let priceEntries = [];
              for (var i = 0; i < serviceVarients.length; i++) {
                const DISCOUNTPRICE = Math.round(
                  serviceVarients[i].PRICE - serviceVarients[i].GRANDTOTAL
                );
                const DISCOUNTPER = Math.round(
                  (DISCOUNTPRICE * 100) / serviceVarients[i].PRICE
                );
                priceEntries.push({
                  id: serviceVarients[i].id,
                  SALONID: salonId,
                  OWNERID: req.user.id,
                  SERVICEID: serviceVarients[i].SERVICEID,
                  GENDER: serviceVarients[i].GENDER,
                  DISCOUNTPRICE: DISCOUNTPRICE,
                  DISCOUNTPER: DISCOUNTPER,
                  PRICE: serviceVarients[i].PRICE,
                  GRANDTOTAL: serviceVarients[i].GRANDTOTAL,
                });
              }
              if (priceEntries.length)
                await db.ch_salon_price_detail.bulkCreate(
                  priceEntries,
                  {
                    updateOnDuplicate: Object.keys(priceEntries[0]),
                  },
                  { transaction: t }
                );
              return t.commit();
            } catch (err) {
              await t.rollback();
              throw err;
            }
          }
        })
        .then((success) => {
          res
            .status(200)
            .json({ success: true, message: "Successfully updated" });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      console.log(err);

      throw new RequestError(err);
    }
  },

  // parlour in website
  async getAllSearchList(req, res, next) {
    let { search_text } = req.body;
    try {
      let result = {};
      result.location = await db.ch_city.findAll({
        where: { TITLE: { [Op.like]: `%${req.body.search_text}%` } },
      });
      result.parlour = await db.ch_salon_detail.findAll({
        where: { NAME: { [Op.like]: `%${req.body.search_text}%` } },
      });
      result.address = await db.ch_salon_detail.findAll({
        where: { ADDRESS: { [Op.like]: `%${req.body.search_text}%` } },
      });
      var newList = [];
      if (result.location) {
        for (let i = 0; i < result.location.length; i++) {
          const assignee = result.location[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.TITLE,
          };
          newList.push(assigneeData);
        }
      }
      if (result.address) {
        for (let i = 0; i < result.address.length; i++) {
          const assignee = result.address[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.ADDRESS,
          };
          newList.push(assigneeData);
        }
      }
      if (result.parlour) {
        for (let i = 0; i < result.parlour.length; i++) {
          const assignee = result.parlour[i];
          let assigneeData = {
            id: assignee.id,
            name: assignee.NAME,
          };
          newList.push(assigneeData);
        }
      }
      res.status(200).json({ success: true, data: newList });
    } catch (err) {
      throw new RequestError(err);
    }
  },

  async getAllSalonInWebsite(req, res, next) {
    const { searchString } = req.body;
    const query = {};
    query.where = {};

    const whereCond = {};
    whereCond.where = {};
    query.where = {
      [Op.and]: [{ OWNERID: { [Op.ne]: null } }, { STATUS: { [Op.eq]: 1 } }],
    };
    query.order = [["createdAt", "Desc"]];
    query.attributes = [
      "id",
      "OWNERID",
      "NAME",
      "SLUG",
      "STATUS",
      "THUMBNAIL",
      "ADDRESS",
    ];
    if (searchString) {
      query.where = {
        [Op.or]: [
          {
            NAME: {
              [Op.like]: "%" + searchString + "%",
            },
          },
          {
            SLUG: {
              [Op.like]: "%" + searchString + "%",
            },
          },
          {
            ADDRESS: {
              [Op.like]: "%" + searchString + "%",
            },
          },
        ],
      };
    }
    query.include = [
      {
        model: db.user,
        attributes: ["id", "firstName"],
        as: "owner",
        where: { role: "salon" },
      },
      {
        model: db.ch_city,
        ...whereCond,
        attributes: ["id", "TITLE"],
        as: "city",
      },
    ];
    try {
      db.ch_salon_detail.findAll(query).then((salon) => {
        if (salon && salon.length) {
          let response = Util.getFormatedResponse(false, salon, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          let response = Util.getFormatedResponse(false, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getPrlourDetail(req, res, next) {
    const { slug } = req.body;
    const query = {};
    query.where = {};
    query.where.SLUG = slug;
    query.order = [["createdAt", "Desc"]];
    query.attributes = [
      "id",
      "OWNERID",
      "NAME",
      "SLUG",
      "STATUS",
      "PHONENO",
      "THUMBNAIL",
      "ADDRESS",
    ];
    query.include = [
      {
        model: db.user,
        attributes: ["id", "phone"],
        as: "owner",
      },
    ];
    try {
      db.ch_salon_detail.findOne(query).then((salon) => {
        if (salon) {
          let response = Util.getFormatedResponse(false, salon, {
            message: "Success",
          });
          res.status(response.code).json(response);
        } else {
          let response = Util.getFormatedResponse(false, {
            message: "Success",
          });
          res.status(response.code).json(response);
        }
      });
    } catch (err) {
      throw new RequestError(err);
    }
  },
  async getAllServiceList(req, res, next) {
    let { gender, slug } = req.body;
    let wherecond = {};
    if (gender) {
      wherecond.Gender = gender;
    }
    try {
      db.ch_salon_detail
        .findOne({
          attributes: ["id", "SLUG", "NAME"],
          where: { SLUG: slug },
        })
        .then((salon) => {
          if (salon) {
            return db.ch_salon_category.findAll({
              where: wherecond,
              include: [
                {
                  model: db.ch_salon_service,
                  as: "service",
                  include: [
                    {
                      model: db.ch_salon_price_detail,
                      as: "priceDetail",
                      where: { SALONID: salon.id },
                    },
                  ],
                },
              ],
            });
          }
          return null;
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

  async updateParlourStatus(req, res, next) {
    let { STATUS, ID } = req.body;
    try {
      db.ch_salon_detail
        .findOne({
          where: { ID: ID },
        })
        .then((list) => {
          if (list) {
            return db.ch_salon_detail.update(
              {
                STATUS: STATUS,
              },
              { where: { ID: ID } }
            );
          }
        })
        .then((success) => {
          res
            .status(200)
            .json({ success: true, message: "Successfully updated" });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      console.log(err);
      throw new RequestError("Error");
    }
  },

  async createOrderDetails(req, res, next) {
    let {
      firstName,
      lastName,
      phoneNumber,
      appointmentDate,
      email,
      grandTotal,
      serviceList,
      salonOwnerId,
    } = req.body;
    try {
      db.customer
        .findOne()
        .then(async (p) => {
          const t = await db.sequelize.transaction();
          let orderNo =
            "OD" +
            Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
          if (p.id) {
            try {
              var orderlist = await db.ch_salon_order_list.create(
                {
                  CUSTID: req.user ? req.user.id : null,
                  ORDERNO: orderNo,
                  FIRSTNAME: firstName,
                  LASTNAME: lastName,
                  PHONENO: phoneNumber,
                  EMAIL: email,
                  GRANDTOTAL: grandTotal,
                  APPOINTMENTDATE: appointmentDate,
                  USERID: salonOwnerId,
                },
                { transaction: t }
              );

              let cartEntries = [];
              for (var i = 0; i < serviceList.length; i++) {
                cartEntries.push({
                  ORDERID: orderlist.id,
                  CUSTID: req.user ? req.user.id : null,
                  PARLOURNAME: serviceList[i].parlour,
                  CATID: serviceList[i].CAT_ID,
                  SERVICENAME: serviceList[i].SERVICENAME,
                  DISCOUNTPER: serviceList[i].DISCOUNTPER,
                  DISCOUNTPRICE: serviceList[i].DISCOUNTPRICE,
                  PRICE: serviceList[i].PRICE,
                  GRANDTOTAL: serviceList[i].GRANDTOTAL,
                });
              }
              if (cartEntries.length)
                await db.ch_salon_order_service_list.bulkCreate(cartEntries, {
                  transaction: t,
                });
              // await mailer.sendInvoiceForCustomer(req.body, list, addrdetails, fullName, orderId, req.user, { transaction: t })
              return t.commit();
            } catch (err) {
              await t.rollback();
              throw new RequestError("Error", err);
            }
          }
          return res.status(500).json({ errors: ["User is not found"] });
        })
        .then((success) => {
          // for(const item of productList){
          //     findVendorWithLowestPrice(item.id).then(({vendor,productList})=>{
          //         //    console.log({vendor});
          //         mailer.sendEmailToVendor(vendor.email,item.name);
          //     });
          // }
          // sendMailToVendor("");

          res.status(200).json({
            success: true,
            message: "Confirmed! Booking your service",
          });
        })
        .catch(function (err) {
          res.status(500).json({ errors: ["Error adding cart"] });
        });
    } catch (err) {
      throw new RequestError(err);
    }
  },

  async salonOrderList(req, res, next) {
    let limit = 40;
    let offset = 0;
    let page = 1;
    if (req.body.limit != undefined) {
      limit = parseInt(req.body.limit);
    }
    if (req.body.page) {
      page = req.body.page;
      if (page < 1) page = 1;
    }
    try {
      db.ch_salon_order_list
        .count({
          include: [{ model: db.ch_salon_order_service_list }],
        })
        .then((count) => {
          let pages = Math.ceil(count / limit);
          offset = limit * (page - 1);
          return db.ch_salon_order_list
            .findAll({
              include: [{ model: db.ch_salon_order_service_list }],
              order: [["createdAt", "DESC"]],
              limit: limit,
              offset: offset,
            })
            .then((r) => [r, pages, count]);
        })
        .then(([list, pages, count]) => {
          res.status(200).json({ data: list, count: count, pages: pages });
        })
        .catch(function (err) {
          console.log("some error", err);
          next(err);
        });
    } catch (err) {
      next(err);
    }
  },
  async sellerOrderList(req, res, next) {
    let limit = 40;
    let offset = 0;
    let page = 1;
    if (req.body.limit != undefined) {
      limit = parseInt(req.body.limit);
    }
    if (req.body.page) {
      page = req.body.page;
      if (page < 1) page = 1;
    }
    try {
      db.ch_salon_order_list
        .count({
          where: { USERID: req.user.id },
          include: [{ model: db.ch_salon_order_service_list }],
        })
        .then((count) => {
          let pages = Math.ceil(count / limit);
          offset = limit * (page - 1);
          return db.ch_salon_order_list
            .findAll({
              where: { USERID: req.user.id },
              include: [{ model: db.ch_salon_order_service_list }],
              order: [["createdAt", "DESC"]],
              limit: limit,
              offset: offset,
            })
            .then((r) => [r, pages, count]);
        })
        .then(([list, pages, count]) => {
          res.status(200).json({ data: list, count: count, pages: pages });
        })
        .catch(function (err) {
          console.log("some error", err);
          next(err);
        });
    } catch (err) {
      next(err);
    }
  },
};
