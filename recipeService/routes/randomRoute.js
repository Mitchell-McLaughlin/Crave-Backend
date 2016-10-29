import code from 'http-response-codes';
import express from 'express';
import request from 'request';
import config from '../config.js';
import qs from 'querystring';

const router = express();

router.route('/')
  .get((req, res, next) => {
      request({
        url: `${config.apis.recipe.endpoint}/recipes/random?${qs.stringify({
          limitLicense: false,
          number: req.query.number
        })}`,
        headers: {
          'X-Mashape-Key': config.apis.recipe.key,
          'Accept': 'application/json'
        }
      }, (err, response, body) => {
        if(err) {
          return next(err);
        }
        res.set('Content-Type', 'application/json');
        res.status(response.statusCode);
        return res.end(body);
      });
  });

export default router;
