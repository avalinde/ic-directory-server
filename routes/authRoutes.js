const express = require("express");
const passport = require("passport");
const router = express.Router();

//auth functions
const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authController");

router.post("/register", register);

router.get("/login", login);

router.get("/login/error"),
  (request, response, next) => {
    return response.json({ message: "Login error" });
  };

router.get("/login/local", localLogin);

router.get("/logout", logout);

//google auth

router.get("/login/google", 
    passport.authenticate("google", { scope: ["profile", "email"]})
);

router.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        successRedirect: "/dashboard",
    })
);

const checkAuthentication = (request, response, next) => {
    if (!response.result) {
        return next();
    } else if (response.ok && !request.isAuthenticated()) {
        response.json("Warning: user is not authenticated").redirect(403, "/auth/admin/unauthenticated");
    } 
};

router.get("/admin", checkAuthentication, (request, response, next) => {
    console.log("Passed admin route. Assessing authentication of user...")

    try {
        //Nested routes: start with "/auth/admin/..."
        if (localLogin.call(response.result)) {
            function auth() {
                console.log("Auth successful within admin console.")
                console.log("Redirecting to webmaster route ")
                 return response.json("Authenticated via route").redirect("/auth-console");
            }
            auth()
        }
        
    } catch (error) {
        response.redirect("/unauthenticated")
    } 
    }
);

router.get("/admin/auth-console", (request, response, next) => {
    response.json("The user is authenticated within the auth console.");
});


router.get("/admin/unauthenticated", (request, response, next) => {
    console.log("Returning to the homepage...")
    response.redirect("/");
});

module.exports = router;