const http = require('http');
const createNamespace = require('cls-hooked').createNamespace
const getNamespace = require('cls-hooked').getNamespace

const sessionName = 'cats'

const namespace = createNamespace(sessionName)
console.log('namespace', namespace)

function someDeepNestedCallToSet() {
    namespace.run(() => {
        namespace.set('a', 'value');

        console.log(1,namespace);
        console.log(2,namespace.get('a'));
        someDeepNestedCallToGet()
    })
    console.log(3,namespace.get('a'));
    console.log(4,namespace);
}

function someDeepNestedCallToGet() {
    const session = getNamespace(sessionName);
    const baseObject = session.get('a')

    console.log('is working: ', baseObject);
}

http.createServer((req, res) => {
    someDeepNestedCallToSet();
    someDeepNestedCallToGet()
    console.log('서버 실행');
}).listen(8081, () => {
    console.log('8081번 포트에서 서버 대기중입니다.')
});