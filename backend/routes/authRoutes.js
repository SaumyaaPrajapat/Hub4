const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("../model/signups");

router.use(express.json());
router.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      console.log(userVer);
      if (err) return res.json("Token is wrong");
      req.user = decoded;
      next();
    });
  }
};

router.get("/home", verifyUser, (req, res) => {
  console.log("Token verification passed. User: ", req.user);
  return res.status(200).json("Success");
});
//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password, ...others } = user._doc;
      //If crednetials are valid, create a token for the user
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "jwt-secret-key",
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token);
      return res.status(200).json({ others, token });
    } else {
      return res
        .status(401)
        .json({ error: "The password is incorrect. Try Again!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//register
router.post("/register", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email is already registered. Please Login" });
    } else {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Create a new user with the hashed password
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };
      // Save the user to the database
      const createdUser = await userModel.create(newUser);
      // Respond with the created user
      res.json(createdUser);
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//register of user or admin
router.post("/register_ua", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email is already registered. Please Login" });
    } else {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Create a new user with the hashed password
      const newUser = {
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      };
      // Save the user to the database
      const createdUser = await userModel.create(newUser);
      // Respond with the created user
      res.json(createdUser);
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get all users (not admins)
router.get("/users", async (req, res) => {
  try {
    const users = await userModel
      .find({ role: "user" })
      .select("name email -_id");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Delete user
router.delete("/delete_user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const result = await userModel.findByIdAndDelete(userId);
    if (result) {
      res
        .status(200)
        .json({ Status: true, Message: "User deleted successfully" });
    } else {
      res.status(404).json({ Status: false, Error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: false, Error: "Internal Server Error" });
  }
});

module.exports = router;
