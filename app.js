const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const rateLimitMiddleware = require("./middleware/rateLimitMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(rateLimitMiddleware);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
