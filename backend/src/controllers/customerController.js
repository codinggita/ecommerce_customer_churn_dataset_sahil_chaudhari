const customerService = require("../services/customerService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { getPaginationOptions, getPaginationMetadata } = require("../utils/pagination");

const createCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, customer, "Customer created successfully"));
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPaginationOptions(req.query);
  
  // Basic filtering logic (can be expanded in Part 14)
  const filter = {};
  if (req.query.country) filter.country = req.query.country;
  if (req.query.city) filter.city = req.query.city;
  if (req.query.gender) filter.gender = req.query.gender;
  if (req.query.churned !== undefined) filter.churned = req.query.churned === 'true';

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    skip,
    limit,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, "Customers fetched successfully"));
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer found"));
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.updateCustomer(req.params.id, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer updated successfully"));
});

const deleteCustomer = asyncHandler(async (req, res) => {
  await customerService.deleteCustomer(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Customer deleted successfully"));
});

const checkCustomerExists = asyncHandler(async (req, res) => {
  const exists = await customerService.checkExists(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, { exists }, `Customer check complete`));
});

const bulkCreateCustomers = asyncHandler(async (req, res) => {
  const customers = await customerService.bulkCreate(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, customers, `${customers.length} customers imported successfully`));
});

const bulkUpdateCustomers = asyncHandler(async (req, res) => {
  const { ids, updateData } = req.body;
  const result = await customerService.bulkUpdate(ids, updateData);
  return res
    .status(200)
    .json(new ApiResponse(200, result, `Bulk update complete. Modified ${result.modifiedCount} records`));
});

const bulkDeleteCustomers = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  const result = await customerService.bulkDelete(ids);
  return res
    .status(200)
    .json(new ApiResponse(200, result, `Bulk deletion complete. Removed ${result.modifiedCount} records`));
});

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  checkCustomerExists,
  bulkCreateCustomers,
  bulkUpdateCustomers,
  bulkDeleteCustomers,
};
