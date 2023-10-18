const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("../database/shifts.db");

// Route: GET /
router.get("/", (req, res) => {
  const query = "SELECT * FROM shifts";
  db.all(query, (err, shiftsList) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Internal Server Error");
    }
    res.render("index", { shiftsList: shiftsList });
  });
});

// routes/index.js
router.post("/remove_shift", (req, res) => {
  const itemId = req.body.itemId; 
  const deleteQuery = "DELETE FROM shifts WHERE id = ?";
  db.run(deleteQuery, [itemId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  });
});

// Route: POST /create_shift
router.post("/create_shift", (req, res) => {
  const { employeeName, startTime, endTime } = req.body;
  const insertQuery =
    "INSERT INTO shifts (employee_name, start_time, end_time) VALUES (?, ?, ?)";
  db.run(insertQuery, [employeeName, startTime, endTime], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  });
});

module.exports = router;
