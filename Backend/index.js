const express = require('express');
const app = express();
const { DBconnection } = require("./database/db");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
DBconnection();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("hello world!, is coming from backend index .js");
});

//Post for recieving data
app.post("/register", async (req, res) => {
    try {
        // get all the data
        const { username, firstname, lastname, email, password } = req.body;

        // check if all the data is available
        if (!(firstname && lastname && email && password && username)) {
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
        
        // check the data-base if user is already registered
        const existingUser = await User.findOne({ email });
        const existingUser2 = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send(" User already exist with the same email")
        }
        if (existingUser2) {
            return res.status(400).send(" User already exist with the same username")
        }

        // hashing encryption
        const hashedPasswd = await bcrypt.hash(password, 10);

        // save the user in the data-base
        const user = await User.create({
            username,
            firstname,
            lastname,
            email,
            password: hashedPasswd,
        });

        // token generation
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

app.post("/login", async (req, res) => {
    try {
        // getting data from the front end 
        const { username, password } = req.body;

        // check if all data is sent 
        if(!(username && password)) {
            return res.status(400).send("Please enter all the information");
        }

        //find the user in db
        const user = await User.findOne({ username });
        if (!user){
            return res.status(401).send(" User not found");
        }

        // check passwd
        const enteredpasswd = await bcrypt.compare(password, user.password);
        if(!enteredpasswd) {
            return res.status(401).send("Password does not match");
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn : '1d',
        });
        user.token = token;
        user.password = undefined;
        
        const options = {
        expires: new Date(Date.now() + 1*24*60*60*1000),
        httpOnly: true,
        };

        res.status(200).cookie("token",token, options).json({
            message: "you have successfully logged in",
            success: true,
            token,
        });
        
    } catch (error) {
        console.log(error);
    }
    
});

app.post("/dashboard", async (req, res) => {
    
});
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}!`);
});  
