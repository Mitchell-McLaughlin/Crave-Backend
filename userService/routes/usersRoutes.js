import code from 'http-response-codes';
import express from 'express';
import Mongo from '../controllers/mongo.js';
import Validator from '../validation/validator.js';

const mongoDriver = process.env.NODE_ENV === 'testing' ? new Mongo() : new Mongo('crave');
const router = express.Router();

router.route('/')
  //get all algorithms
  .get((req, res, next) => {
      let count = 0;
      mongoDriver.getAll('users', (err, result) => {
          if (err) {
              err.status = code.HTTP_INTERNAL_SERVER_ERROR;
              return next(err);
          } else if (!result && count === 0) {
              res.sendStatus(code.HTTP_NO_CONTENT);
          } else if (!result && count > 0) {
              res.end(']');
          } else {
              if (count === 0) {
                  res.set('Content-Type', 'application/json');
              }
              res.status(code.HTTP_OK);
              res.write((count++ === 0 ? '[' : ',') + JSON.stringify(result));
          }
      });
  })
  //insert an algorithm
  .post((req, res, next) => {
      Validator.validateNew(req.body, (err, response) => {
          if (err) {
              err.status = code.HTTP_BAD_REQUEST;
              return next(err);
          } else {
              mongoDriver.insertOne('users', response, (err, result) => {
                  if (err) {
                      err.status = code.HTTP_INTERNAL_SERVER_ERROR;
                      return next(err);
                  } else {
                      res.location(`/${result._id}`);
                      res.status(code.HTTP_CREATED).json(result);
                  }
              });
          }
      });
  })
  //remove all algorithms
  .delete((req, res, next) => {
      mongoDriver.deleteAll('users', (err, result) => { // eslint-disable-line no-unused-vars
          if (err) {
              err.status = code.HTTP_INTERNAL_SERVER_ERROR;
              return next(err);
          } else {
              res.sendStatus(code.HTTP_NO_CONTENT);
          }
      });
  });

export default router;
