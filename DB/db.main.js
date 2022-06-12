const mysql = require("mysql2");
require("dotenv").config();

const config = {
  host: process.env.HOST,
  password: process.env.PASS,
  user: process.env.USER,
  database: process.env.DB,
  ssl: {},
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id: " + connection.threadId);
});

const queryUser = (idnum, pwd, cb) => {
  // console.log(idnum)
  const queryString = `SELECT 
                            accID, userIdNumber, password, accType, firstName, lastName, yearLevel, course, accPoints
                        FROM 
                            tblAccount
                        WHERE
                            userIdNumber = ? AND password = ?
                            `;
  connection.query(queryString, [idnum, pwd], (err, results, fields) => {
    if (err) {
      cb(err);
    }
    cb(results);
  });
};


const insertRT = (accID, refreshToken,cb) => {
  const queryString = `INSERT INTO tblRefreshTokens (accID, refreshToken)
    VALUES (?,?)
  `;

  connection.query(
    queryString,
    [accID, refreshToken],
    (err, results, fields) => {
      if (err) {
        cb(err);
      }
      cb(results);
    }
  );
};

module.exports = { queryUser, insertRT };
