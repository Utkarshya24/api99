import { User } from "../models/userModels.js";
import { errorHandler } from "../utils/error.js";
import JWT from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


const isAuth = async (req, res, next) => {

    // const { jwtToken } = req.cookies;
    const { token } = req.headers;

    // console.log(req.cookies);

    if (!token || token.length < 10) {
        return next(new errorHandler('pls login to access this field!', 400));
    }

    const userId = JWT.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(userId.id);

    if (!user) {
        return next(new errorHandler('pls login to access this field!', 400));
    }

    req.user = user;

    next();

}


const isAuthRole = (...role) => async (req, res, next) => {

    if (!role.includes(req.user.role)) {
        return next(new errorHandler(`role ${req.user.role} cannot access this resource`, 403));
    }

    next();
}


export { isAuth, isAuthRole };