//IC Directory Backend
//Initial Server Dependencies
require("dotenv").config();
require("./config/connection");
require("./config/authStrategy")

const express = require("express");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3000;

//Middleware

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(helmet());
app.use(cors({credentials: true, origin: true}));
app.use(morgan("combined"));


//Path module

const path = require("node:path");

//Other Middleware

app.use(express.static(path.join(__dirname+"/public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routing

const clinicRoutes = require("./routes/clinicRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");

//Session Management

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET_KEY,

        cookie: {
            httpOnly: true,
            secure: false, //turn to true when in production
            maxAge: 86400000 //24 hrs
        },
    })
);

app.use(passport.initialize());
app.use(passport.session()); //creates session on calls that require passport authentication

app.use("/api/clinics", clinicRoutes);
app.use("/auth", authRoutes);

app.use((error, request, result, next) => {
    const authErrStatus = error.status || 400;
    const serverErrStatus = error.status || 500;
    if (error.code === 11000){
        return result.status(authErrStatus).json({
            error: {message: "Do you already have an account? Try logging in."},
            statuscode: authErrStatus,
        });
    }
    else{
        console.log("Error handling middleware passed");
    }
    

    return result.status(serverErrStatus).json({
        error: {message: error.message ||"Internal Server error."},
        statuscode: serverErrStatus,
    });
});

app.get("/", (request, response, next) => {
    response.status(200).json({
        success: {message: "This route returns the index page"},
        statusCode: 200
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); 
  console.log(`http://localhost:${PORT}/`);
});
