const app = require('./app');

async function main(){
    await app.listen(app.get('port'))
    console.log('Hello there! this is port: ', app.get('port'));
}
main();