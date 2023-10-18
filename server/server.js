const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "../views"));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("../routes/index");

app.use("/", indexRouter);

// Start the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
