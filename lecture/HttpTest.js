const http = require('http');


http.createServer((req, res) => {
    try {
        throw new Error("에러 발생");
    } catch (e) {
        console.log(e)
    }
    console.log('서버 실행');
}).listen(8081, () => {
    console.log('8081번 포트에서 서버 대기중입니다.')
});