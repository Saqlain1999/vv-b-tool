exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required')
        .notEmpty()
        .isLength({
            min: 4,
            max: 32
        })
        .withMessage('Name should be between 4 to 32 characters')
    req.check('email', 'Email is required')
        .notEmpty()
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @ and an .')
    req.check('password', 'Password is required')
        .notEmpty()
        .isLength({
            min: 4,
            max: 32
        })
        .withMessage("Password should be between 4 to 32 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        });
    }
    next();
}