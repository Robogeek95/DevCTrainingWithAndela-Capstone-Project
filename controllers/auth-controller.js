const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userModel = require('../models/user-model');


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    async (hash) => {
      const user = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        jobRole: req.body.jobrole,
        department: req.body.department,
        address: req.body.address,
      };


      await userModel.addUser(user).then(
        (data) => {
          const userId = data.rows[0].userid;
          const token = jwt.sign(
            { userId },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' },
          );

          res.status(201).json({
            status: 'success',
            data: {
              message: 'User account successfully created',
              token,
              userId,
            },
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            message: `error ${error} occured when trying to signup`,
          })
        }
      );
    },
  );
};

exports.signin = async (req, res, next) => {
  const { email } = req.body;
  await userModel.getUser(email).then(
    (data) => {
      bcrypt.compare(req.body.password, data.rows[0].password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'Incorrect password!',
            });
          }

          const userId = data.rows[0].userid;

          const token = jwt.sign(
            { userId },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' },
          );

          res.status(200).json({
            status: 'success',
            data: {
              token,
              userId,
            },
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            error,
          });
        },
      );
    },
  ).catch(
    (error) => {
      res.status(500).json({
        error,
      });
    },
  );
};