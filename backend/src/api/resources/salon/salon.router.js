import express from "express";
import salonController from "./salon.controller";
import { sanitize } from "../../../middleware/sanitizer";
import { jwtStrategy, jwtCustomerStrategy } from "../../../middleware/strategy";
import { validateBody, schemas } from "../../../middleware/validator";
import upload from "../../../awsbucket";

export const salonRouter = express.Router();
salonRouter
  .route("/category-create")
  .post(
    sanitize(),
    jwtStrategy,
    upload.single("thumbnail"),
    salonController.index
  );
salonRouter.route("/category-list").get(sanitize(), salonController.getList);
salonRouter
  .route("/category-update")
  .post(
    sanitize(),
    upload.single("thumbnail"),
    jwtStrategy,
    salonController.getUpdate
  );
salonRouter
  .route("/category-delete")
  .post(sanitize(), jwtStrategy, salonController.deleteCategory);
salonRouter
  .route("/filter/category-gender")
  .post(sanitize(), jwtStrategy, salonController.getFilterCategory);

//service api
salonRouter
  .route("/service-create")
  .post(jwtStrategy, salonController.serviceCreate);
salonRouter
  .route("/service-list")
  .get(sanitize(), jwtStrategy, salonController.getServiceList);
salonRouter
  .route("/service-by-gender")
  .get(sanitize(), jwtStrategy, salonController.getServiceByGender);
salonRouter
  .route("/service-delete")
  .post(sanitize(), jwtStrategy, salonController.serviceDelete);
salonRouter
  .route("/service-update")
  .post(/* sanitize(), */ jwtStrategy, salonController.getServiceUpdate);
salonRouter
  .route("/service-category-list")
  .post(/* sanitize(), */ salonController.getServiceCategoryList);

//parlour add
salonRouter
  .route("/create-parlour")
  .post(
    sanitize(),
    upload.single("thumbnail"),
    jwtStrategy,
    salonController.createParlour
  );
salonRouter
  .route("/parlour/getAllParlourList")
  .get(sanitize(), jwtStrategy, salonController.getAllParlourList);
salonRouter
  .route("/list-by-id")
  .get(sanitize(), jwtStrategy, salonController.getPrlourById);
salonRouter
  .route("/update-parlour")
  .post(
    sanitize(),
    upload.single("thumbnail"),
    jwtStrategy,
    salonController.updateParlour
  );
salonRouter
  .route("/parlour-status-update")
  .post(sanitize(), jwtStrategy, salonController.updateParlourStatus);

// parlour order list
salonRouter
  .route("/order/list")
  .post(sanitize(), salonController.salonOrderList);
salonRouter
  .route("/seller/order")
  .post(sanitize(), jwtStrategy, salonController.sellerOrderList);

// salon list in website
salonRouter
  .route("/website/getAllSalonList")
  .post(sanitize(), salonController.getAllSalonInWebsite);
salonRouter
  .route("/website/search-list")
  .post(sanitize(), salonController.getAllSearchList);
salonRouter
  .route("/website/getAllServiceList")
  .post(sanitize(), salonController.getAllServiceList);
salonRouter
  .route("/website/parlour-detail")
  .post(sanitize(), salonController.getPrlourDetail);
salonRouter
  .route("/website/book-service")
  .post(
    sanitize(),
    jwtCustomerStrategy,
    validateBody(schemas.bookSalonSchema),
    salonController.createOrderDetails
  );
