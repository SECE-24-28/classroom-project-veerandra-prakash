const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.createUser = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const phoneValid = /^[0-9]{10}$/.test(phone);
    if (!phoneValid) {
      return res
        .status(400)
        .json({ message: "Phone must be 10 digits (numbers only)." });
    }

    const passwordStrong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!passwordStrong) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include upper, lower, number, and special character.",
      });
    }

    const existing = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }, { phone }],
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "User with same username/email/phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const lookup = username
      ? { username }
      : email
      ? { email: email.toLowerCase() }
      : phone
      ? { phone }
      : null;

    if (!lookup) {
      return res
        .status(400)
        .json({ message: "Provide username, email, or phone to login" });
    }

    const user = await User.findOne(lookup);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET || "dev-secret-key";

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
