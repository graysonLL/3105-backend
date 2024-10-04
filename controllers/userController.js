const users = require("../models/userModel");

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).send("Username is required and must be a string.");
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send("Valid email is required.");
  }

  if (!password || typeof password !== "string") {
    return res.status(400).send("Password is required and must be a string.");
  }

  const userExists = users.find((user) => user.email === email);
  if (userExists) return res.status(400).send("User already exists.");

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).send("User registered successfully");
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).send("Invalid credentials.");

  res.send({
    message: "Login successful",
    userId: user.id,
    username: user.username,
  });
};

module.exports = { register, login };
