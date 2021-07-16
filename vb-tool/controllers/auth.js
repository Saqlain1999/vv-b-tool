const User = require('../models/user')
const {
    errorHandler
} = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); // this will be used to generate signed token
const expressJwt = require('express-jwt'); //for authorization check

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            console.log(errorHandler(err))
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        // To leak passwords remove these two lines:
        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            user
        })
    })
};

exports.signin = (req, res) => {
    //find the user based on email
    const {email,password} = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "This email does not belong to any account"
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: "Incorrect Credentials"
            });
        }
        else {

            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
            res.cookie('token', token, {
                expire: new Date() + 9999
            });
            const {
                _id,
                name,
                email,
                role
            } = user;
            return res.json({
                token,
                user: {
                    _id,
                    email,
                    name,
                    role
                }
            });
        }
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: "Signed Out"
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "The action is Admin Only, Access Denied"
        });
    }
    next();
}