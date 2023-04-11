const express = require("express");
const { registerCirlce,
    registerCirlceMember,
    membersOfCircle,
    adminLogin,
    Logout,
    Login,
    forgotPassword,
    resetPassword,
    updatePassword,
    deleteCircleMember,
    getUserDetails,
    getMyDetails,
    updateProfile
} = require("../controllers/SellingCircleController");
const { addProduct, getAllProducts, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/ProductController");
const { isSAuthenticatedUser, isSAdmin, isSameUser } = require("../middleware/auth");
const { createSale, getSales } = require("../controllers/SaleController");
const { getAllOrders } = require("../controllers/BuyOrderController");
const { createAggregation } = require("../controllers/OrderAggregationController");
const router = express.Router();

router.route("/addcircle").post(registerCirlce)
router.route("/addcirclemember").post(isSAdmin, registerCirlceMember)
// router.route("/getmembers").get(isSAuthenticatedUser, isSAdmin, membersOfCircle)
router.route("/getmembers").get(membersOfCircle)
router.route("/adminlogin").post(adminLogin)
router.route("/adminlogout").get(Logout)
router.route("/admin/:id").get(isSAdmin, getUserDetails).delete(isSAdmin, deleteCircleMember);

router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.get("/me", isSAuthenticatedUser, getMyDetails);
router.route("/me/update").put(isSAuthenticatedUser, updateProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isSAuthenticatedUser, updatePassword);


// updating stock by sellingCircleMembers
router.route("/products").get(getAllProducts)
router.route("/product/:id").get(getSingleProduct)

// should complete this isSameUser aswell!! ... completed this feature :)
router.route("/addproduct").post(isSAuthenticatedUser, addProduct)
router.route("/product/:id").put(isSAuthenticatedUser, isSameUser, updateProduct).delete(isSAuthenticatedUser, isSameUser, deleteProduct)



// seller announcing sale..
router.route("/sales").post(isSAdmin, createSale).get(getSales)
// to get all active buyOrders from buyers..
router.route("/buyorder").get(getAllOrders)
module.exports = router;

// Aggregation of a single type product, for multiple users.. i/p - array of buyOrders id..
// here there is aggregation happens only for one type of product at once
router.route("/buyordersAggregate").post(createAggregation)