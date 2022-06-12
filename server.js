const express = require("express");
const cors = require("cors");
const app = express();

//route imports
const authRoute = require("./routes/auth");

require("dotenv").config();

const queryUser = require("./DB/db.main");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.sendStatus(200);
});

// app.post("/login", (req, res) => {
//   const { userIdNumber, password } = req.body;
//   console.log(req.body);
//   console.log(userIdNumber);

//   queryUser(userIdNumber, password, (results) => {
//     if (typeof results === "error") {
//       res.statusCode(403);
//       return;
//     }

//     console.log(results);
//     res.json(results);
//   });
// });

//ROUTES
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Success! Listening to port: ${PORT}`);
});
