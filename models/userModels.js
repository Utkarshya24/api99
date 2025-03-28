// import mongoose from "mongoose";
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     verified: { type: Boolean, default: "false" },
//     otp: { type: Number},
//     otpCreatedAt: {
//         type: Date,
//         default: Date.now,
//         expires: 300
//     },
//     email: { type: String, required: true },
//     password: { type: String, required: true, select: false },
//     role: { type: String, default: "user" },
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
//     businessInformation:{
//         type:Object,
//         default:{},
//     }
// },
//     {
//         timestamps: true
//     }
// )

// userSchema.pre('save', async function (next) {

//     if (!this.isModified("password")) {
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);

//     this.password = await bcrypt.hash(this.password, salt);
// })


// const User = mongoose.models.userSchema || mongoose.model('User', userSchema);

// export { User };

import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { string } from "yup";

// Define the Amazon sub-schema for better organization and validation
const amazonSchema = new mongoose.Schema({
    region: { type: String, default: null },
    sellerId: { type: String, default: null },
    clientId: { type: String, default: null },
    clientSecret: { type: String, default: null },
    marketplace: { type: String, default: null },
    refreshToken: { type: String, default: null },
});
const flipkartSchema = new mongoose.Schema({
    appId: { type: String, default: null },
    appSecret: { type: String, default: null },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
    tokenExpiration: { type: Date, default: null },
    scope: { type: String, default: null },
});

// Define the main user schema
const userSchema = new mongoose.Schema(
    {
        // email: { type: String, required: true, unique: true }, // Email is not updatable

        personalInfo: {
          name: { type: String },
          phone: { type: String },
          profilePic: { type: String }, // Store URL or base64
          description: { type: String },
          location: { type: String },
          profilePic:{type:String}
        },
      
        businessInfo: {
          businessName: { type: String },
          productCategory: { type: String },
          businessContact: { type: String },
          gst: { type: String },
          website: { type: String },
        },
      
        subscriptionPlan: {
          planName: { type: String },
          details: { type: String }, // Additional details
        },
        email: { type: String, required: true, unique: true },
        verified: { type: Boolean, default: false },
        otp: { type: Number },
        otpCreatedAt: {
            type: Date,
            default: Date.now,
            expires: 300, // OTP expires in 5 minutes
        },
        password: { type: String, required: false, select: false }, // Password is optional during onboarding
        role: { type: String, default: "user" },
        resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date },
        businessInformation: {
            businessName: { type: String, required: false },
            description: { type: String, required: false },
            type: { type: String, required: false }, // e.g., PVT, LLP, etc.
            number: { type: String, required: false },
            address: { type: String, required: false },
        },
        amazon: {
            type: amazonSchema, // Use the defined Amazon sub-schema
            default: () => ({}),
        },
        flipkart: {
            type: flipkartSchema, // Use the defined Amazon sub-schema
            default: () => ({}),
        },
        shopify: {
            accessToken: { type: String },
            shopDomain: { type: String },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create and export the model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export { User };
