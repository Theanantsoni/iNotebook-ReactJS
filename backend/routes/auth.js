// const express = require('express');
// const router = express.Router();
// const User = require("../models/User")

// router.get('/', (req,res) => {
//     // obj = {
//     //     a: 'thios',
//     //     number: 34
//     // }
//     // res.json(obj);

//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })

// module.exports = router 

//-----------------

// const express = require('express');
// const router = express.Router();

// // ROUTE 1: Create a User using: POST "/api/auth/createuser"
// router.post('/createuser', (req, res) => {
//   console.log(req.body);
//   res.json({ success: true, user: req.body });
// });

// module.exports = router;

//-----------------


const express = require('express');
const router = express.Router();
const User = require("../models/User")
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "AnantKiBook";
const fetchuser = require("../middleware/fetchuser");

router.post('/createuser', [
    body('name',"Enter name").isLength({min: 3}),
    body('email', "Enter Valid Email Id").isEmail(),
    body('password', "Enter password").isLength({min: 5}),
], async(req,res) => {

    let success = false;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{

    let user = await User.findOne({email: req.body.email});
    
    if(user){
        return res.status(400).json({success, error: "sorry a user  with this email already registered."});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    
    user = await User.create({
        name: req.body.name,
        // password: req.body.password,
        password: secPass,
        email: req.body.email,
    });

    const data = {
        user: {
            id: user.id,
            
        }
    }

    
    const authtoken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({success, authtoken})
    
    // const jwtData = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    // res.json(user);

        }

      catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
      }

    })
    // res.send(req.body);
// })

router.post('/login', [
    body('email', "Enter Valid Email Id").isEmail(),
    body('password', "Password can't blank").exists(),
], async(req,res) => {

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({success,authtoken});

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
      }

})


router.post('/getuser', fetchuser, async(req,res) => {

    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");

    }

})


module.exports = router;


