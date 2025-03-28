import JWT from 'jsonwebtoken';


const sendToken = (user, statusCode, res) => {

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    // console.log(token);
    const options = {
        expiresIn: new Date(Date.now() * process.env.SECRET_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.status(statusCode).cookie("jwtToken", token, options).json({
        success: true,
        user,
        token
    })

}


export { sendToken };