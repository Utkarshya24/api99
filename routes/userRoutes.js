import express from 'express';
import {
    // deleteSingleUser,
    getAllUser,
    getSingleUser,
    getUser,
    otpVerification,
    resetChangePassword,
    resetPassword,
    updateUser,
    updateUserPassword,
    userLogin,
    // userLogin,
    userLogout,
    userRegister,
    userRoleUpdate,
    resendOtp,
    onboarding,
    contactForm
} from '../controllers/userController.js';
import { isAuth, isAuthRole } from '../middleware/authMiddleware.js';
import multer from "multer";



const userRouter = express.Router();
// ✅ Multer Storage (Move this to middleware if needed)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });
// <<----------Normal-------------->>

// userRouter.route('/').post(isAuth, getUser);
userRouter.route('/').post(isAuth, getUser);
userRouter.route('/register').post(userRegister);
userRouter.route('/register/otp').post(otpVerification);
userRouter.route('/resend-otp').post(resendOtp);
userRouter.route('/login').post(userLogin);
userRouter.route('/logout').get(userLogout);
userRouter.route('/enquiry').post(contactForm);

userRouter.route('/update/password').put(isAuth, updateUserPassword);
userRouter.route('/update').put(isAuth,upload.single("profilePic"),updateUser);
userRouter.route('/reset').post(resetPassword);
userRouter.route('/reset/:token').put(resetChangePassword);
userRouter.route("/onboarding").post(isAuth , onboarding);
userRouter.route("/get-all-user").get( getAllUser);


/* <---admin---> */
userRouter.route('/admin').get(isAuth, isAuthRole('admin'), getAllUser);
// userRouter.route('/admin/role-change').put( userRoleUpdate);

// Ensure correct route
userRouter.route('/admin/role-change/:id').put(userRoleUpdate);
// userRouter.route('/admin/:id').get(isAuth, isAuthRole('admin'), getSingleUser).delete(isAuth, isAuthRole('admin'), deleteSingleUser).put(isAuth, isAuthRole('admin'), userRoleUpdate);

export default userRouter;


