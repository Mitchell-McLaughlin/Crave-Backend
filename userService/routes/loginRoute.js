import code from 'http-response-codes';
import express from 'express';
import Mongo from '../controllers/mongo.js';
import Validator from '../validation/validator.js';

const mongoDriver = process.env.NODE_ENV === 'testing' ? new Mongo() : new Mongo('crave');
const router = express.Router();

router.route('/')
  .post((req, res, next) => {
      Validator.validateLogin(req.body, (err, response) => {
          if (err) {
              err.status = code.HTTP_BAD_REQUEST;
              return next(err);
          } else {
              mongoDriver.getOne('users', {email: req.body.email}, (err, result) => {
                if (err) {
                    err.status = code.HTTP_INTERNAL_SERVER_ERROR;
                    return next(err);
                } else if (!result) {
                    const err = new Error('user not in the database');
                    err.status = code.HTTP_NO_CONTENT;
                    return next(err);
                } else {
                    const valid = req.body.password === result.password;
                    res.status(valid ? code.HTTP_OK : code.HTTP_UNAUTHORIZED).json(valid ? result : null);
                }
            });
          }
      });
  });

export default router;
