const koa = require('koa');
const app = koa();

const error = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      throw Error('uncaught error')
      resolve('timeout_error')
    }, 200)
  })
}

const success = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('success')
    },1000)
  })
}

app.use(function *(){
  try {
    yield error()
    const msg = yield success()
    this.body = `Hello World ${msg}`;
  } catch (e) {
    console.log(e)
  }
});

process.on('uncaughtException', err => {
  console.log(`uncaughtException : ${err.message}`)
  process.exit()
})

app.listen(3000);
