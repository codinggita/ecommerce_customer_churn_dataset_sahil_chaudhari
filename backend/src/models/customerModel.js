const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      min: 0,
      default: null,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      index: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      index: true,
    },
    membershipYears: {
      type: Number,
      required: [true, "Membership years is required"],
      min: 0,
    },
    loginFrequency: {
      type: Number,
      required: [true, "Login frequency is required"],
      min: 0,
      index: true,
    },
    sessionDurationAvg: {
      type: Number,
      min: 0,
      default: null,
    },
    pagesPerSession: {
      type: Number,
      min: 0,
      default: null,
    },
    cartAbandonmentRate: {
      type: Number,
      required: [true, "Cart abandonment rate is required"],
      min: 0,
      max: 100,
      index: true,
    },
    wishlistItems: {
      type: Number,
      min: 0,
      default: null,
    },
    totalPurchases: {
      type: Number,
      required: [true, "Total purchases is required"],
      min: 0,
      index: true,
    },
    averageOrderValue: {
      type: Number,
      required: [true, "Average order value is required"],
      min: 0,
    },
    daysSinceLastPurchase: {
      type: Number,
      min: 0,
      default: null,
    },
    discountUsageRate: {
      type: Number,
      min: 0,
      max: 100,
      index: true,
      default: null,
    },
    returnsRate: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    emailOpenRate: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    customerServiceCalls: {
      type: Number,
      min: 0,
      default: null,
    },
    productReviewsWritten: {
      type: Number,
      min: 0,
      default: null,
    },
    socialMediaEngagementScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    mobileAppUsage: {
      type: Number,
      min: 0,
      index: true,
      default: null,
    },
    paymentMethodDiversity: {
      type: Number,
      min: 0,
      default: null,
    },
    lifetimeValue: {
      type: Number,
      required: [true, "Lifetime value is required"],
      min: 0,
      index: true,
    },
    creditBalance: {
      type: Number,
      index: true,
      default: null,
    },
    churned: {
      type: Boolean,
      required: [true, "Churn status is required"],
      index: true,
    },
    signupQuarter: {
      type: String,
      required: [true, "Signup quarter is required"],
      enum: ["Q1", "Q2", "Q3", "Q4"],
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for high-performance analytics
customerSchema.index({ country: 1, lifetimeValue: -1 });
customerSchema.index({ city: 1, totalPurchases: -1 });
customerSchema.index({ gender: 1, creditBalance: -1 });
customerSchema.index({ signupQuarter: 1, averageOrderValue: -1 });
customerSchema.index({ churned: 1, daysSinceLastPurchase: -1 });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
