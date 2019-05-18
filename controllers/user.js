const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectLength } = require('../lib/codehelper')

exports.signup = (req, res) => {
   const userPassword = req.body.password 
   const userEmail = req.body.email
   const encPassword = bcrypt.hashSync(userPassword, 10)

   let user = User({
       email: userEmail,
       password: encPassword
   })
   user.save((err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'signup success!'
            })
        }
   })
}

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .exec()
        .then(resultData => {
            if(ObjectLength(resultData) > 0) {
                const passwordIsMatch = bcrypt.compareSync(password, resultData.password)
                if(passwordIsMatch){
                    // define token uses
                    const tokenObj = {
                        email : resultData.email
                    }
                    const enToken = jwt.sign(tokenObj, process.env.SECRETKEY, {
                        algorithm : 'HS256',
                        expiresIn : '7d'
                    })
                    // end of define token of uses
                    return res.status(200).json({
                        message: 'login succes!',
                        success: true,
                        token: enToken
                    })
                }
            }
            return res.status(403).json({
                message: 'username or password is not valid.',
                success: false
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: err,
                success: false
            })
        })
}