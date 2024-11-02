const {check}=require('express-validator');

exports.registerValidator=[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('name','Password is required').not().isEmpty(),s
]