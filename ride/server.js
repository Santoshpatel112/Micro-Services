const http=require('http');
const app=require('./app');

const server=http.createServer(app);

const PORT=3003||Process.env.PORT;

server.listen(PORT,(req,res)=>{
    console.log(`Ride server listning on ${PORT}`);
})
