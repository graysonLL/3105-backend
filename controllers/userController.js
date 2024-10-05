const users = require("../models/userModel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Registration with Joi validation
const register = (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.base": "Username must be a string.",
      "any.required": "Username is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "A valid email is required.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password must be a string.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;

  const userExists = users.find((user) => user.email === email);
  if (userExists) return res.status(400).send("User already exists.");

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).send("User registered successfully.");
};

//login
const login = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "A valid email is required.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).send("Invalid credentials.");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "secretKey",
    {
      expiresIn: "1h",
    }
  );

  res.send({
    message: "Login successful",
    token: token,
  });
};

// profile
const profile = (req, res) => {
  const userId = req.params.userId;

  if (req.user.id !== parseInt(userId, 10)) {
    return res
      .status(403)
      .send("Access denied. You can only view your own profile.");
  }

  const user = users.find((u) => u.id === parseInt(userId, 10));

  if (!user) return res.status(404).send("User not found.");

  res.send(user);
};

module.exports = { register, login, profile };
