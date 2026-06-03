const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/validationMiddleware");
const { verifyJWT, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCustomerSchema,
  createCustomerBatchSchema,
  updateCustomerSchema,
  customerQuerySchema,
} = require("../validations/customerValidation");

// Protect all routes - User must be logged in
router.use(verifyJWT);

router.post("/bulk-create", isAdmin, validate(createCustomerBatchSchema), customerController.bulkCreateCustomers);
router.patch("/bulk-update", isAdmin, customerController.bulkUpdateCustomers);
router.delete("/bulk-delete", isAdmin, customerController.bulkDeleteCustomers);

router.get("/search", customerController.searchCustomers);

// Specialized Information Routes
router.get("/status/:status", customerController.getCustomersByStatus);
router.get("/segment/:segment", customerController.getCustomersBySegment);
router.get("/field/:field/:value", customerController.getCustomersByField);
router.get("/analytics/:field", customerController.getCustomersByAnalytics);
router.get("/sort/:field/:order", customerController.getSortedCustomers);
router.get("/filter/:filterType", customerController.getFilteredCustomers);

router
  .route("/")
  .get(validate(customerQuerySchema, "query"), customerController.getAllCustomers)
  .post(isAdmin, validate(createCustomerSchema), customerController.createCustomer);

router.get("/exists/:id", customerController.checkCustomerExists);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .put(isAdmin, validate(updateCustomerSchema), customerController.updateCustomer)
  .patch(isAdmin, validate(updateCustomerSchema), customerController.updateCustomer)
  .delete(isAdmin, customerController.deleteCustomer);

module.exports = router;
