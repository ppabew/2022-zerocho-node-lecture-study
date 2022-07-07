const express = require('express');
const app = express();
const createNamespace = require('cls-hooked').createNamespace
const getNamespace = require('cls-hooked').getNamespace

const sessionName = 'cats'
const ns = createNamespace(sessionName)

const requestIdMiddleware = (req, res, next) => {
    ns.run(() => {
        ns.set('a', 'value');
        console.log(1,ns.get('a'));
        next();
    });
};

app.set('port',3030);

app.use(requestIdMiddleware)

app.use('/', (req, res,next) => {
    console.log('===> Hello, Express log');
    console.log(2,ns.get('a'));
    next();
})

app.use('/hi', (req,res) => {
    console.log('HIHI');
    res.send('HIHI');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기중');
})