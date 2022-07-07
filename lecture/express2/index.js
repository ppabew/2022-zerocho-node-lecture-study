const express = require('express');
const app = express();
import logger from './logger';
const rTracer =  require('cls-rtracer')

app.set('port',3030);

app.use(rTracer.expressMiddleware());
app.use('/', (req, res,next) => {
    logger.info('ddd');
    console.log('===> Hello, Express log');
    next();
})

app.use('/hi', (req,res) => {
    console.log('HIHI');
    res.send('HIHI');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기중');
})