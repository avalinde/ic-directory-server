const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const { request } = require("express");


const localLogin = async (request, response, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return response.status(401).json({
        error: { message: "No user detected. Please try again. " },
      });
    }

    
    request.login(user, (error) => {
      if (error) {
        return next(error);
      }

    const userCopy = { ...req.user._doc };
    userCopy.password = undefined;


      response.status(200).json({
        success: {
          message:
            "User successfully logged in with local authentication feature.",
        },
        data: {user: userCopy},
        statusCode: 200,
      });
    });
  })(request, response, next);
};

const logoutUser = async (request, response, next) => {
  request.logout((error) => {
    if (error) {
      return next(error);
    }

    request.session.destroy((error) => {
      if (error) {
        return next(error);
      }
    });

    response.clearCookie("connect.sid");
    return response.status(200).json({
      success: { message: "User logged out! " },
      statusCode: 200,
    });
  });
};

const register = async (request, response, next) => {
  const { firstName, lastName, username, password, googleId } = request.body;
  console.log(request.body);
 
  // if (error) {
  //   return next(error);
  // } else 
  if (!firstName || !username || !password) {
    // Confirm required fields are not empty before any other work
    return response.status(400).json({
      error: { message: "Missing required fields." },
      statusCode: 400,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const newUser = new User( {
      firstName,
      lastName,
      username,
      password: hashedPassword,
      googleId,
    });
    
    await newUser.save();
    

    request.login(newUser, (error) => {
      if (error) {
        return next(error);
      }
    });

    newUser.password = undefined;

    return response.status(201).json({
      success: { message: "A new user is created" },
      data: { newUser },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (request, response, next) => {
  response.status(200).json({
    success: { message: "User logged in" },
    statusCode: 200,
  });
};





module.exports = { register, login, logoutUser, localLogin };
