const db = require('../config')
const { hash, compare, hashSync } = require('bcrypt');
const { createToken } = require('../middleware/AuthenticateUsers');
class Users{
    getUsers(req, res) {
        const query = `
        SELECT userID, firstName, lastName,
        gender, userDOB, userRole, emailAdd, profileUrl
        FROM Users;
        `
        db.query(query, (err, results)=>{
            if(err) {
                return res.status(500).json({ status: 500, msg: 'Database error' });
            }
            res.json({
                status: res.statusCode,
                results
            })
        })
    }

    getUser(req, res) {
        const query = `
        SELECT userID, firstName, lastName,
        gender, userDOB, userRole, emailAdd, profileUrl
        FROM Users
        WHERE userID = ?;
        `
        db.query(query, [req.params.id], (err, result)=>{
            if(err) {
                return res.status(500).json({ status: 500, msg: 'Database error' });
            }
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

     async register(req, res) {
        const data = req.body;

        if (!data.userPass) {
          return res.json({ status: res.statusCode, msg: "Password is required." });
        }

      // Encrypt password
      data.userPass = await hash(data.userPass, 15);

        //query
        const query = `
          INSERT INTO Users
          SET ?;
          `
        db.query(query, [data], (err, result) => {
          if (err) {
            return res.status(500).json({ status: 500, msg: 'Database error' });
          }
          const token = createToken({ emailAdd: data.emailAdd, userID: result.insertId, userRole: data.userRole || 'user' });
          res.json({
            status: res.statusCode,
            msg: "You are now registered.",
            token
          })
        })
    }
  
    // Login with a user
    login(req, res) {
      const { emailAdd, userPass } = req.body;

      const query = `
        SELECT userID, firstName, lastName,
        gender, userDOB, userRole, emailAdd,
        userPass, profileUrl
        FROM Users
        WHERE emailAdd = ?;
      `;

      db.query(query, [emailAdd], async (err, result) => {
        if (err) {
            return res.status(500).json({ status: 500, msg: 'Database error' });
        }

        if (!result?.length) {
          res.json({ status: res.statusCode, msg: "You provided a wrong email." });
        } else {
          compare(userPass, result[0].userPass, (compareErr, compareResult) => {
            if (compareErr) {
                return res.status(500).json({ status: 500, msg: 'Authentication error' });
            }

            if (compareResult) {
              const token = createToken({ emailAdd, userID: result[0].userID, userRole: result[0].userRole });

              res.json({ msg: "Logged in", token, result: result[0] });
            } else {
              res.json({ status: res.statusCode, msg: "Invalid password or you have not registered" });
            }
          });
        }
      });
    }       
  
    // Update a user
    updateUser(req, res) {
      const data = req.body;
      if (data.userPass) {
        data.userPass = hashSync(data.userPass, 15);
      }
      const query = `
          UPDATE Users
          SET ?
          WHERE userID = ?
          `
      db.query(query, [data, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ status: 500, msg: 'Database error' });
        }
        res.json({ status: res.statusCode, msg: "The user record was updated." });
      });
    }

    // Delete a user
    deleteUser(req, res) {
      const query = `
      DELETE FROM Users
      WHERE userID = ?;
      `
      db.query(query, [req.params.id], (err) => {
          if(err) {
              return res.status(500).json({ status: 500, msg: 'Database error' });
          }
          res.json({ status: res.statusCode, msg: "User deleted!" })
      })
    } 
}
module.exports = Users