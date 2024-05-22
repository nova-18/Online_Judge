const express = require('express');
const app = express();
const { DBconnection } = require("./database/db");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const validator = require('validator');
const jwt = require("jsonwebtoken");
DBconnection();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.get("/", (req, res) => {
    res.send("hello world!, is coming from backend index .js");
});

app.get("/anything", (req, res) => {
    res.send("welcome to anything");
});

//Post for recieving data
app.post("/register", async (req, res) => {
    try {
        // get all the data
        const { firstname, lastname, email, password } = req.body;

        // check if all the data is available
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information")
        }

        //validatee the data { using validator }
        let errors = [];
        if (!validator.isEmail(email)) {
            errors.push('Invalid email format.');
        }
        if (!validator.isLength(password, { min: 8 })) {
            errors.push('Password must be at least 8 characters long.');
        }
        // if (!validator.isInt(age.toString(), { min: 18, max: 99 })) {
        //     errors.push('Age must be a number between 18 and 99.');
        // }
        if (errors.length > 0) {
            return res.status(400).json({ error: errors.join(' ') });
        }
        // if (errors.length > 0) {
        //     return res.status(400).json({ error: errors.join(' ') });
        // }

        // check the data-base if user is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send(" User already exist with the same email")
        }
        // hashing encryption
        const hashedPasswd = await bcrypt.hash(password, 10);
        // save the user in the data-base
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPasswd,
        });

        const token = jwt.sign({id: user._id, email}, process.env.SECRET_KEY, {
            expiresIn : '1h',
        });
        user.token = token;
        user.password = undefined;
        res
        .status(200)
        .json({message : "You are successfully registered!", user});
    } catch (error) {
        console.log(error);
    }

});

// token generation

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}!`);
});  
