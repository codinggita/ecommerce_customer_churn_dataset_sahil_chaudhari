const Customer = require("../models/customerModel");
const ApiError = require("../utils/ApiError");

/**
 * Service to handle customer database operations
 */
class CustomerService {
  /**
   * Create a new customer record
   */
  async createCustomer(customerData) {
    return await Customer.create(customerData);
  }

  /**
   * Get all customers with pagination and filtering
   */
  async getAllCustomers({ filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 10 }) {
    const customers = await Customer.find({ ...filter, isDeleted: false })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Customer.countDocuments({ ...filter, isDeleted: false });
    return { customers, total };
  }

  /**
   * Get a single customer by ID
   */
  async getCustomerById(id) {
    const customer = await Customer.findOne({ _id: id, isDeleted: false });
    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }
    return customer;
  }

  /**
   * Update a customer by ID
   */
  async updateCustomer(id, updateData) {
    const customer = await Customer.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!customer) {
      throw new ApiError(404, "Customer not found or already deleted");
    }
    return customer;
  }

  /**
   * Soft delete a customer by ID
   */
  async deleteCustomer(id) {
    const customer = await Customer.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    );

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }
    return customer;
  }

  /**
   * Bulk create customer records
   */
  async bulkCreate(customersData) {
    return await Customer.insertMany(customersData);
  }

  /**
   * Bulk update customer records (same update for all provided IDs)
   */
  async bulkUpdate(ids, updateData) {
    return await Customer.updateMany(
      { _id: { $in: ids }, isDeleted: false },
      { $set: updateData }
    );
  }

  /**
   * Bulk soft delete customers
   */
  async bulkDelete(ids) {
    return await Customer.updateMany(
      { _id: { $in: ids }, isDeleted: false },
      { $set: { isDeleted: true } }
    );
  }

  /**
   * Check if a customer exists
   */
  async checkExists(id) {
    const exists = await Customer.exists({ _id: id, isDeleted: false });
    return !!exists;
  }
}

module.exports = new CustomerService();
