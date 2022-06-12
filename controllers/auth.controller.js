const db = require("../DB/db.main");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { userIdNumber, password } = req.body;

  db.queryUser(userIdNumber, password, (results) => {
    // add bycrpt hasing and salting logic
    if (results.length === 0) return res.sendStatus(401);
    if (results instanceof Error) return sendStatus(500);

    const accessToken = jwt.sign(
      { username: results.userIdNumber },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      { username: results.userIdNumber },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    db.insertRT(results.accID, refreshToken, (response) => {
      if (response instanceof err) {
        return res.sendStatus(500);
      }
    });

    res.cookie(
      "jwt",
      { accessToken, refreshToken },
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 100,
      }
    );

    res.json(results);
  });
};

module.exports = { handleLogin };
