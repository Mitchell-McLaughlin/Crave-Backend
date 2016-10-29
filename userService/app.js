import bodyParser from 'body-parser';
import express from 'express';
import code from 'http-response-codes';
import memwatch from 'memwatch-next';
import loginRouter from './routes/loginRoute.js';
import userRouter from './routes/userRoute.js';
import usersRouter from './routes/usersRoutes.js';
import healthRouter from './routes/health.js';
import docRouter from './routes/doc.js';

const app = express();

//watch for memory leaks
memwatch.on('leak', info => {
    console.log(info, 'Memory leak was detected');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// routers
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/health', healthRouter);
app.use('/doc', docRouter);

app.use((req, res, next) => {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
}, (err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || code.HTTP_INTERNAL_SERVER_ERROR).end();
});

export default app;
