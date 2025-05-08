const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { createUser } = require("../models/users.model");
const {
  encryptPassword,
  validateUser,
} = require("../controllers/users.controller");

// create user
router.post("/user", async (req, res) => {
  const username = req.body?.username;
  const password1 = req.body?.password1;
  const password2 = req.body?.password2;
  let errorMsg = "";

  if (!username) {
    errorMsg += "Missing Username\n";
  }

  if (!password1 || !password2) {
    errorMsg += "Missing Password\n";
  }

  if (password1 !== password2) {
    errorMsg += "Password Mismatch";
  }

  if (errorMsg) {
    req.errorMsg = errorMsg;
    res.redirect("/signup");
  } else {
    const password = await encryptPassword(password1);
    await createUser({ username, password });
    res.redirect("/login");
  }
});

// login
router.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await validateUser(username, password);
  if (user) {
    res.cookie("authCookie", user.token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.render("profile", { title: `${user.username}'s Profile`, user });
  } else {
    res.redirect("/login");
  }
});

// get signup form
router.get("/signup", (req, res) => {
  // TODO: confirm user is not logged in
  res.render("signup", { title: "signup" });
});

router.get("/profile", verifyToken, (req, res) => {
  if (req.user.permissions === 1) {
    res.render("profile", {
      title: `${req.user.username}'s Profile`,
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
