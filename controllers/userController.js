// import { User } from '../models/userModels.js';
// import validat from 'validator';
// import bcrypt from 'bcrypt';
// import { errorHandler } from '../utils/error.js';
// import { catchAsynHandler } from '../middleware/catchAsyncError.js';
// import { sendToken } from '../utils/sendToen.js';
// import crypto from 'crypto';
// import { sendEmail } from '../utils/sendEmail.js';
// import JWT from 'jsonwebtoken';
// import passport from 'passport';

// const createToken = (id) => {

//     const token = JWT.sign({ id: id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });

//     return token;
// }

// const userRegister = catchAsynHandler(async (req, res, next) => {

//     const { name, email, password } = req.body;
//     console.log(req.body);
//     if (!name || !email || !password) {
//         return next(new errorHandler("input all required field!", 500));
//         // return res.status(500).json({ success: false, message: "pls enter all the required field!" });
//     }

//     let user = await User.findOne({ email: email });

//     //  if (user && !user.verified) {
//     //     await User.findOneAndDelete({ email: email });
//     // }

//     if (user && user.verified) {
//         return next(new errorHandler("Email already exist!", 500));
//     }

//     if (!validat.isEmail(email)) {
//         return next(new errorHandler("please enter valid email!", 400));

//         // return res.status(400).json({ success: false, message: "please enter valid email!" });
//     }

//     const otp = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');

//     const message = `<h1>Please confirm your OTP</h1>
//        <p>Here is your OTP code: ${otp}</p>`
// console.log(otp)
//     console.log("hii4")
//     await sendEmail({
//         email: email,
//         subject: "Verification Email",
//         message
//     })
//     console.log(name, email, password, otp ,"user1")

//     user = new User({ name, email, password, otp });
//     console.log(name, email, password, otp ,"user")
//     user = await user.save();

//     res.status(200).json({
//         success: true,
//         user,
//         message: "Email Sent Successfully!"
//     })

//     // const token = createToken(user.id);

//     // res.status(201).json({
//     //     success: true,
//     //     user,
//     //     token
//     // })

//     // sendToken(user, 201, res);
// })

// const otpVerification = catchAsynHandler(async (req, res, next) => {

//     const { otp } = req.body;
//     console.log(req.body);

//     const user = await User.findOne({ otp: otp });
//     // console.log("hii otp");

//     if (!user) {
//         return next(new errorHandler('Invalid Otp', 400));
//     }

//     // console.log("hii2");
//     user.verified = true;
//     user.otp = undefined;
//     user.otpCreatedAt = undefined;

//     await user.save({ validateBeforeSave: false });

//     const token = createToken(user.id);

//     res
//     .status(201)
//     .cookie("jwtToken" , token , { maxAge: 30 * 24 * 60 * 60 * 1000 })
//     .json({success: true,user,token});

// })

// const resendOtp = catchAsynHandler(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//         return next(new errorHandler('User not found!', 400));
//     }

//     const otp = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');

//     user.otp = otp;
//     user.otpCreatedAt = Date.now();

//     await user.save({ validateBeforeSave: false });

//     const message = `<h1>Please confirm your OTP</h1>
//        <p>Here is your OTP code: ${otp}</p>`

//     await sendEmail({
//         email: user.email,
//         subject: "Verification Email",
//         message
//     })

//     res.status(200).json({
//         success: true,
//         message: "OTP resent successfully!"
//     })
// })

// const userLogin = catchAsynHandler((req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err || !user) {
//             console.log(err);

//             return next(new errorHandler(info ? info.message : err || "Failed Login!", 401));
//         }

//         req.login(user, { session: false }, (err) => {
//             if (err) {
//                 return next(err);
//             }

//             const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

//             return res
//             .status(200)
//             .cookie("jwtToken" , token , { maxAge: 30 * 24 * 60 * 60 * 1000 , sameSite:'Lax'})
//             .json({ success: true, user, token });
//         });
//     })(req, res, next);
// });

// // <<-----------This is for loacl now we are using passport.js authenticate method that is why it is comment---------------->>

// // const userLogin = catchAsynHandler(async (req, res, next) => {
// //     const { email, password } = req.body;
// //     if (!email || !password) {
// //         return next(new errorHandler("pls enter all the required field!", 500));
// //         // return res.status(500).json({ success: false, message: "pls enter all the required field!" })
// //     }

// //     const user = await User.findOne({ email: email }).select('+password');

// //     if (!user) {
// //         return next(new errorHandler("Invalid email and password !", 400));
// //         // return res.status(400).json({ success: false, message: "Invalid email and password !" });
// //     }

// //     if (!user.verified) {
// //         return next(new errorHandler("Invalid email and password !", 400));
// //     }

// //     const isPassword = await bcrypt.compare(password, user.password);

// //     if (!isPassword) {
// //         return next(new errorHandler("Invalid email and password !", 400));
// //         // return res.status(400).json({ success: false, message: "Invalid email and password !" });
// //     }

// //     const token = createToken(user.id);

// //     res.status(201).json({
// //         success: true,
// //         user,
// //         token
// //     })

// //     // sendToken(user, 200, res);

// // })

// const userLogout = catchAsynHandler(async (req, res, next) => {

//     // console.log('comming from frontend!')

//     res.status(201).cookie("jwtToken", null, {
//         expiresIn: new Date(Date.now()),
//         httpOnly: true
//     }).json({
//         success: true,
//         message: "User logged Out!"
//     })
// })

// const getUser = catchAsynHandler(async (req, res, next) => {

//     // console.log('user find out !');
//     const user = await User.findById(req.user.id);

//     res.status(201).json({ success: true, user: user });
// })

// const resetPassword = catchAsynHandler(async (req, res, next) => {

//     const { email } = req.body;

//     const frontend_url = 'https://www.unibazar.in';

//     // console.log(email);

//     const user = await User.findOne({ email: email });

//     if (!user) {
//         return next(new errorHandler('user not found !', 401));
//     }

//     const createToken = crypto.randomBytes(20).toString('hex');

//     // console.log('hello');
//     user.resetPasswordToken = crypto.createHash('sha256').update(createToken).digest('hex');
//     // console.log('i am here!');

//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     user.otpCreatedAt = undefined;

//     await user.save({ validateBeforeSave: false });

//     const resetPasswordUrl = `${frontend_url}/reset/${createToken}/password`;

//     const message = `your reset password token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested
//         this email then, please ignore it `;

//     try {

//         await sendEmail({
//             email: user.email,
//             subject: "Unibazar password Recovery!",
//             message
//         })

//         res.status(201).json({
//             success: true,
//             message: "Email send successfully!"
//         })

//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({ validateBeforeSave: false });
//         return next(new errorHandler(error.message, 500));
//     }

// })

// const resetChangePassword = catchAsynHandler(async (req, res, next) => {

//     const { token } = req.params;
//     console.log(req.params);

//     const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

//     const user = await User.findOne({
//         resetPasswordToken: resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     }).select('+password');

//     if (!user) {
//         return next(new errorHandler('reset password token is invalid or has been expired', 400))
//     }

//     if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(new errorHandler('newPassword and confirmPassword should be same !', 401));
//     }

//     user.password = req.body.newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     user.otpCreatedAt = undefined;

//     await user.save({ validateBeforeSave: false });

//     const Token = createToken(user.id);

//     res.status(200).json({
//         success: true,
//         user,
//         token: Token
//     })
// })

// const updateUserPassword = catchAsynHandler(async (req, res, next) => {

//     const user = await User.findById(req.user.id).select('+password');
//     console.log(user);

//     const isMatchPassword = await bcrypt.compare(req.body.oldPassword, user.password);

//     if (!isMatchPassword) {
//         return next(new errorHandler('Incorrect Password !', 400));
//     }

//     if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(new errorHandler('newPassword and confirmPassword should be same!', 401));
//     }

//     user.password = req.body.newPassword;

//     await user.save({ validateBeforeSave: false });

//     sendToken(user, 200, res);

// })

// const updateUser = catchAsynHandler(async (req, res, next) => {

//     const newUpdate = {
//         name: req.body.name,
//         email: req.body.email
//     }

//     console.log(newUpdate);

//     const user = await User.findByIdAndUpdate(req.user.id, newUpdate, { new: true }).select('+password');

//     await user.save();

//     res.status(201).json({ success: true, message: "user update successfully!" });

// })

// // for <---admin--->

// const getAllUser = catchAsynHandler(async (req, res, next) => {

//     const users = await User.find({});

//     res.status(200).json({ success: true, data: users });

// })

// const getSingleUser = catchAsynHandler(async (req, res, next) => {

//     const { id } = req.params;

//     const user = await User.findById(id);

//     if (!user) {
//         return next(new errorHandler('user not found!', 400));
//     }

//     res.status(201).json({ success: true, data: user });
// })

// // const deleteSingleUser = catchAsynHandler(async (req, res, next) => {

// //     const { id } = req.params;

// //     let user = await User.findById(id);

// //     if (!user) {
// //         return next(new errorHandler('user not found!', 400));
// //     }

// //     await User.findByIdAndDelete(id);

// //     res.status(201).json({ success: true, message: "user delete successfully!" });
// // })

// const userRoleUpdate = catchAsynHandler(async (req, res, next) => {

//     const newUpdate = {
//         role: req.body.role
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, newUpdate, { new: true }).select('+password');

//     await user.save();

//     res.status(200).json({ success: true, message: "user role updated!" })

// })

// // const onboarding = catchAsynHandler(async (req, res, next) => {
// //     const id = req.user._id;
// //     const user = await User.findById(id);
// //     if(user){
// //         user.businessInformation  = {...user.businessInformation , ...req.body };
// //         await user.save();
// //         res.status(200).json({ success: true, message: "Business Information Is Saved" });
// //     }
// //     else{
// //         return next(new errorHandler('user not found!', 400));
// //     }

// // })
// const onboarding = catchAsynHandler(async (req, res, next) => {
//     const userId = req?.userId;

//     // Optional: Validate the incoming request
//     // const businessInfoSchema = Joi.object({
//     //     businessName: Joi.string().optional(),
//     //     businessAddress: Joi.string().optional(),
//     //     gstNumber: Joi.string().optional(),
//     // });

//     // const { error } = businessInfoSchema.validate(req.body);

//     // if (error) {
//     //     return next(new errorHandler(error.details[0].message, 400));
//     // }

//     // Atomic update
//     const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { $set: { "businessInformation": { ...req.body } } },
//         { new: true, upsert: false }
//     );

//     if (!updatedUser) {
//         return next(new errorHandler('User not found!', 404));
//     }

//     res.status(200).json({
//         success: true,
//         message: "Business Information has been successfully updated",
//     });
// });

// export { userRegister,
//      userLogin,
//       getUser, userLogout, resetPassword, resetChangePassword, getSingleUser, updateUserPassword, updateUser, getAllUser, userRoleUpdate, otpVerification, resendOtp , onboarding };

// import { User } from '../models/userModels.js';
// import validat from 'validator';
// import bcrypt from 'bcrypt';
// import { errorHandler } from '../utils/error.js';
// import { catchAsynHandler } from '../middleware/catchAsyncError.js';
// import { sendToken } from '../utils/sendToen.js';
// import crypto from 'crypto';
// import { sendEmail } from '../utils/sendEmail.js';
// import JWT from 'jsonwebtoken';
// import passport from 'passport';

// const createToken = (id) => {

//     const token = JWT.sign({ id: id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });

//     return token;
// }

// const userRegister = catchAsynHandler(async (req, res, next) => {
//   const { name, email, password, onboardingDetails } = req.body;
//   console.log(req.body);
//   if (!name || !email || !password) {
//     return next(new errorHandler("Input all required fields!", 400));
//   }

//   let user = await User.findOne({ email: email });

//   if (user && user.verified) {
//     return next(new errorHandler("Email already exists!", 400));
//   }

//   if (!validat.isEmail(email)) {
//     return next(new errorHandler("Please enter a valid email!", 400));
//   }

//   const otp = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');

//   const message = `<h1>Please confirm your OTP</h1>
//      <p>Here is your OTP code: ${otp}</p>`
//   console.log(otp)

//   await sendEmail({
//     email: email,
//     subject: "Verification Email",
//     message
//   })

//   user = new User({ name, email, password, otp });

//   if (onboardingDetails) {
//     user.businessInformation = onboardingDetails;
//   }

//   user = await user.save();

//   res.status(200).json({
//     success: true,
//     user,
//     message: "Email Sent Successfully!"
//   })
// });

// const otpVerification = catchAsynHandler(async (req, res, next) => {

//     const { otp } = req.body;
//     console.log(req.body);

//     const user = await User.findOne({ otp: otp });
//     // console.log("hii otp");

//     if (!user) {
//         return next(new errorHandler('Invalid Otp', 400));
//     }

//     // console.log("hii2");
//     user.verified = true;
//     user.otp = undefined;
//     user.otpCreatedAt = undefined;

//     await user.save({ validateBeforeSave: false });

//     const token = createToken(user.id);

//     res
//     .status(201)
//     .cookie("jwtToken" , token , { maxAge: 30 * 24 * 60 * 60 * 1000 })
//     .json({success: true,user,token});

// })

// const resendOtp = catchAsynHandler(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//         return next(new errorHandler('User not found!', 400));
//     }

//     const otp = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');

//     user.otp = otp;
//     user.otpCreatedAt = Date.now();

//     await user.save({ validateBeforeSave: false });

//     const message = `<h1>Please confirm your OTP</h1>
//        <p>Here is your OTP code: ${otp}</p>`

//     await sendEmail({
//         email: user.email,
//         subject: "Verification Email",
//         message
//     })

//     res.status(200).json({
//         success: true,
//         message: "OTP resent successfully!"
//     })
// })

// const userLogin = catchAsynHandler((req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err || !user) {
//             console.log(err);

//             return next(new errorHandler(info ? info.message : err || "Failed Login!", 401));
//         }

//         req.login(user, { session: false }, (err) => {
//             if (err) {
//                 return next(err);
//             }

//             const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

//             return res
//             .status(200)
//             .cookie("jwtToken" , token , { maxAge: 30 * 24 * 60 * 60 * 1000 , sameSite:'Lax'})
//             .json({ success: true, user, token });
//         });
//     })(req, res, next);
// });

// // const userLogin = catchAsynHandler(async (req, res, next) => {
// //     const { email, password } = req.body;
// //     if (!email || !password) {
// //         return next(new errorHandler("pls enter all the required field!", 500));
// //         // return res.status(500).json({ success: false, message: "pls enter all the required field!" })
// //     }

// //     const user = await User.findOne({ email: email }).select('+password');

// //     if (!user) {
// //         return next(new errorHandler("Invalid email and password !", 400));
// //         // return res.status(400).json({ success: false, message: "Invalid email and password !" });
// //     }

// //     if (!user.verified) {
// //         return next(new errorHandler("Invalid email and password !", 400));
// //     }

// //     const isPassword = await bcrypt.compare(password, user.password);

// //     if (!isPassword) {
// //         return next(new errorHandler("Invalid email and password !", 400));
// //         // return res.status(400).json({ success: false, message: "Invalid email and password !" });
// //     }

// //     const token = createToken(user.id);

// //     res.status(201).json({
// //         success: true,
// //         user,
// //         token
// //     })

// //     // sendToken(user, 200, res);

// // })

// const userLogout = catchAsynHandler(async (req, res, next) => {

//     // console.log('comming from frontend!')

//     res.status(201).cookie("jwtToken", null, {
//         expiresIn: new Date(Date.now()),
//         httpOnly: true
//     }).json({
//         success: true,
//         message: "User logged Out!"
//     })
// })

// const getUser = catchAsynHandler(async (req, res, next) => {

//     // console.log('user find out !');
//     const user = await User.findById(req.user.id);

//     res.status(201).json({ success: true, user: user });
// })

// const resetPassword = catchAsynHandler(async (req, res, next) => {

//     const { email } = req.body;

//     const frontend_url = 'https://www.unibazar.in';

//     // console.log(email);

//     const user = await User.findOne({ email: email });

//     if (!user) {
//         return next(new errorHandler('user not found !', 401));
//     }

//     const createToken = crypto.randomBytes(20).toString('hex');

//     // console.log('hello');
//     user.resetPasswordToken = crypto.createHash('sha256').update(createToken).digest('hex');
//     // console.log('i am here!');

//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     user.otpCreatedAt = undefined;

//     await user.save({ validateBeforeSave: false });

//     const resetPasswordUrl = `${frontend_url}/reset/${createToken}/password`;

//     const message = `your reset password token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested
//         this email then, please ignore it `;

//     try {

//         await sendEmail({
//             email: user.email,
//             subject: "Unibazar password Recovery!",
//             message
//         })

//         res.status(201).json({
//             success: true,
//             message: "Email send successfully!"
//         })

//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({ validateBeforeSave: false });
//         return next(new errorHandler(error.message, 500));
//     }

// })

// const resetChangePassword = catchAsynHandler(async (req, res, next) => {

//     const { token } = req.params;
//     console.log(req.params);

//     const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

//     const user = await User.findOne({
//         resetPasswordToken: resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     }).select('+password');

//     if (!user) {
//         return next(new errorHandler('reset password token is invalid or has been expired', 400))
//     }

//     if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(new errorHandler('newPassword and confirmPassword should be same !', 401));
//     }

//     user.password = req.body.newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     user.otpCreatedAt = undefined;

//     await user.save({ validateBeforeSave: false });

//     const Token = createToken(user.id);

//     res.status(200).json({
//         success: true,
//         user,
//         token: Token
//     })
// })

// const updateUserPassword = catchAsynHandler(async (req, res, next) => {

//     const user = await User.findById(req.user.id).select('+password');
//     console.log(user);

//     const isMatchPassword = await bcrypt.compare(req.body.oldPassword, user.password);

//     if (!isMatchPassword) {
//         return next(new errorHandler('Incorrect Password !', 400));
//     }

//     if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(new errorHandler('newPassword and confirmPassword should be same!', 401));
//     }

//     user.password = req.body.newPassword;

//     await user.save({ validateBeforeSave: false });

//     sendToken(user, 200, res);

// })

// const updateUser = catchAsynHandler(async (req, res, next) => {

//     const newUpdate = {
//         name: req.body.name,
//         email: req.body.email
//     }

//     console.log(newUpdate);

//     const user = await User.findByIdAndUpdate(req.user.id, newUpdate, { new: true }).select('+password');

//     await user.save();

//     res.status(201).json({ success: true, message: "user update successfully!" });

// })

// // for <---admin--->

// const getAllUser = catchAsynHandler(async (req, res, next) => {

//     const users = await User.find({});

//     res.status(200).json({ success: true, data: users });

// })

// const getSingleUser = catchAsynHandler(async (req, res, next) => {

//     const { id } = req.params;

//     const user = await User.findById(id);

//     if (!user) {
//         return next(new errorHandler('user not found!', 400));
//     }

//     res.status(201).json({ success: true, data: user });
// })

// const userRoleUpdate = catchAsynHandler(async (req, res, next) => {

//     const newUpdate = {
//         role: req.body.role
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, newUpdate, { new: true }).select('+password');

//     await user.save();

//     res.status(200).json({ success: true, message: "user role updated!" })

// })

// const onboarding = catchAsynHandler(async (req, res, next) => {
//   const userId = req.user.id;

//   const updatedUser = await User.findByIdAndUpdate(
//     userId,
//     { $set: { "businessInformation": req.body } },
//     { new: true, runValidators: true }
//   );

//   if (!updatedUser) {
//     return next(new errorHandler('User not found!', 404));
//   }

//   res.status(200).json({
//     success: true,
//     message: "Business Information has been successfully updated",
//     user: updatedUser
//   });
// });

// const deleteUnverifiedUsers = async () => {
//   const timeLimit = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago
//   await User.deleteMany({ verified: false, createdAt: { $lt: timeLimit } });
// };

// // Call this function periodically, e.g., every hour
// setInterval(deleteUnverifiedUsers, 60 * 60 * 1000);

// export { userRegister,
//      userLogin,
//       getUser, userLogout, resetPassword, resetChangePassword, getSingleUser, updateUserPassword, updateUser, getAllUser, userRoleUpdate, otpVerification, resendOtp , onboarding };

import { User } from "../models/userModels.js";
import validat from "validator";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import { catchAsynHandler } from "../middleware/catchAsyncError.js";
import { sendToken } from "../utils/sendToen.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import JWT from "jsonwebtoken";
import passport from "passport";
import multer from "multer";

const createToken = (id) => {
  const token = JWT.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

const userRegister = catchAsynHandler(async (req, res, next) => {
  const { name, email, password, onboardingDetails } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return next(new errorHandler("Input all required fields!", 400));
  }

  let user = await User.findOne({ email: email });

  if (user && user.verified) {
    return next(new errorHandler("Email already exists!", 400));
  }

  if (!validat.isEmail(email)) {
    return next(new errorHandler("Please enter a valid email!", 400));
  }

  const otp = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, "0");

  const message = `<h1>Please confirm your OTP</h1>
     <p>Here is your OTP code: ${otp}</p>`;
  console.log(otp);

  await sendEmail({
    email: email,
    subject: "Verification Email",
    message,
  });

  user = new User({ name, email, password, otp });

  if (onboardingDetails) {
    user.businessInformation = onboardingDetails;
  }

  user = await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "Email Sent Successfully!",
  });
});

const contactForm = catchAsynHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, subject, message } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !subject ||
    !message
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailContent = `
    <h1>Contact Form Submission</h1>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  try {
    await sendEmail({
      email: "support@unibazar.in",
      subject: `New Enquiry Form Submission: ${subject}`,
      message: emailContent,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

const otpVerification = catchAsynHandler(async (req, res, next) => {
  const { otp } = req.body;
  console.log(req.body);

  const user = await User.findOne({ otp: otp });
  // console.log("hii otp");

  if (!user) {
    return next(new errorHandler("Invalid Otp", 400));
  }

  // console.log("hii2");
  user.verified = true;
  user.otp = undefined;
  user.otpCreatedAt = undefined;

  await user.save({ validateBeforeSave: false });

  const token = createToken(user.id);

  res
    .status(201)
    .cookie("jwtToken", token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    .json({ success: true, user, token });
});

const resendOtp = catchAsynHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler("User not found!", 400));
  }

  const otp = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, "0");

  user.otp = otp;
  user.otpCreatedAt = Date.now();

  await user.save({ validateBeforeSave: false });

  const message = `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`;

  await sendEmail({
    email: user.email,
    subject: "Verification Email",
    message,
  });

  res.status(200).json({
    success: true,
    message: "OTP resent successfully!",
  });
});

const userLogin = catchAsynHandler((req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);

      return next(
        new errorHandler(info ? info.message : err || "Failed Login!", 401)
      );
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      return res
        .status(200)
        .cookie("jwtToken", token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "Lax",
        })
        .json({ success: true, user, token });
    });
  })(req, res, next);
});

// const userLogin = catchAsynHandler(async (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return next(new errorHandler("pls enter all the required field!", 500));
//         // return res.status(500).json({ success: false, message: "pls enter all the required field!" })
//     }

//     const user = await User.findOne({ email: email }).select('+password');

//     if (!user) {
//         return next(new errorHandler("Invalid email and password !", 400));
//         // return res.status(400).json({ success: false, message: "Invalid email and password !" });
//     }

//     if (!user.verified) {
//         return next(new errorHandler("Invalid email and password !", 400));
//     }

//     const isPassword = await bcrypt.compare(password, user.password);

//     if (!isPassword) {
//         return next(new errorHandler("Invalid email and password !", 400));
//         // return res.status(400).json({ success: false, message: "Invalid email and password !" });
//     }

//     const token = createToken(user.id);

//     res.status(201).json({
//         success: true,
//         user,
//         token
//     })

//     // sendToken(user, 200, res);

// })

const userLogout = catchAsynHandler(async (req, res, next) => {
  // console.log('comming from frontend!')

  res
    .status(201)
    .cookie("jwtToken", null, {
      expiresIn: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logged Out!",
    });
});

const getUser = catchAsynHandler(async (req, res, next) => {
  // console.log('user find out !');
  const user = await User.findById(req.user.id);

  res.status(201).json({ success: true, user: user });
});

const resetPassword = catchAsynHandler(async (req, res, next) => {
  const { email } = req.body;

  const frontend_url = "https://www.unibazar.in";

  // console.log(email);

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new errorHandler("user not found !", 401));
  }

  const createToken = crypto.randomBytes(20).toString("hex");

  // console.log('hello');
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(createToken)
    .digest("hex");
  // console.log('i am here!');

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  user.otpCreatedAt = undefined;

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${frontend_url}/reset/${createToken}/password`;

  const message = `your reset password token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested
        this email then, please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Unibazar password Recovery!",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Email send successfully!",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new errorHandler(error.message, 500));
  }
});

const resetChangePassword = catchAsynHandler(async (req, res, next) => {
  const { token } = req.params;
  console.log(req.params);

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    return next(
      new errorHandler(
        "reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new errorHandler("newPassword and confirmPassword should be same !", 401)
    );
  }

  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.otpCreatedAt = undefined;

  await user.save({ validateBeforeSave: false });

  const Token = createToken(user.id);

  res.status(200).json({
    success: true,
    user,
    token: Token,
  });
});

const updateUserPassword = catchAsynHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log(user);

  const isMatchPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!isMatchPassword) {
    return next(new errorHandler("Incorrect Password !", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new errorHandler("newPassword and confirmPassword should be same!", 401)
    );
  }

  user.password = req.body.newPassword;

  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res);
});

// const updateUser = catchAsynHandler(async (req, res, next) => {
//   const newUpdate = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   console.log(newUpdate);

//   const user = await User.findByIdAndUpdate(req.user.id, newUpdate, {
//     new: true,
//   }).select("+password");

//   await user.save();

//   res.status(201).json({ success: true, message: "user update successfully!" });
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const updateUser = catchAsynHandler(async (req, res, next) => {
  const {
    name,
    phone,
    location,
    description,
    businessContact,
    businessName,
    planName,
    productCategory,
    gst,
    website,
  } = req.body;
  const logo = req.file ? req.file.path : null;

  const updateData = {};

  if (name || phone || location || description || logo) {
    updateData.personalInfo = {};
    if (name) updateData.personalInfo.name = name;
    // if (email) updateData.personalInfo.email = email;
    if (phone) updateData.personalInfo.phone = phone;
    if (location) updateData.personalInfo.location = location;
    if (description) updateData.personalInfo.description = description;
    if (logo) updateData.personalInfo.profilePic = logo;
  }
  if (businessName || productCategory || businessContact || gst || website) {
    updateData.businessInfo = {};
    if (businessName) updateData.businessInfo.businessName = businessName;
    // if (email) updateData.businessInfo.email = email;
    if (productCategory)
      updateData.businessInfo.productCategory = productCategory;
    if (businessContact)
      updateData.businessInfo.businessContact = businessContact;
    if (gst) updateData.businessInfo.gst = gst;
    if (website) updateData.businessInfo.website = website;
  }
  if (planName) {
    updateData.subscriptionPlan = {};

    updateData.subscriptionPlan.planName = planName;
  }
  const user = await User.findByIdAndUpdate(
    req.body.id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully!",
    user,
  });
});

// for <---admin--->

const getAllUser = catchAsynHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({ success: true, data: users });
});

const getSingleUser = catchAsynHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new errorHandler("user not found!", 400));
  }

  res.status(201).json({ success: true, data: user });
});

// const userRoleUpdate = catchAsynHandler(async (req, res, next) => {
//   const newUpdate = {
//     role: req.body.role,
//   };

//   const user = await User.findByIdAndUpdate(req.params.id, newUpdate, {
//     new: true,
//   }).select("+password");

//   await user.save();

//   res.status(200).json({ success: true, message: "user role updated!" });
// });

const userRoleUpdate = catchAsynHandler(async (req, res, next) => {
  const newUpdate = { role: req.body.role };

  const user = await User.findByIdAndUpdate(req.params.id, newUpdate, {
    new: true, // Returns updated user
  }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "User role updated!",
  });
});

const onboarding = catchAsynHandler(async (req, res, next) => {
  const userId = req.body.id;
  console.log(userId, "userid");
  console.log(req?.body, "req");
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        personalInformation: req?.body?.personalInformation,
        businessInformation: req.body.businessInformation,
        amazon: req?.body?.amazon,
        flipkart: req?.body?.flipkart,
        // ajio:req?.body?.ajio,
        myntra: req?.body?.myntra,
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new errorHandler("User not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Business Information has been successfully updated",
    user: updatedUser,
  });
});

const deleteUnverifiedUsers = async () => {
  const timeLimit = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago
  await User.deleteMany({ verified: false, createdAt: { $lt: timeLimit } });
};

// Call this function periodically, e.g., every hour
setInterval(deleteUnverifiedUsers, 60 * 60 * 1000);

export {
  userRegister,
  userLogin,
  getUser,
  userLogout,
  resetPassword,
  resetChangePassword,
  getSingleUser,
  updateUserPassword,
  updateUser,
  getAllUser,
  userRoleUpdate,
  otpVerification,
  resendOtp,
  onboarding,
  contactForm,
};
