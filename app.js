const express = require('express');
const app = express();
const port = 5000;



//CORS, SERVER này chỉ cho phép server localhost:3000 gửi request đến
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.get('/',(req,res,next) => {
    res.send('Hello from server');
})


app.get('/api/members',(req,res,next) => {
    const members = [
        {id: 1, lastName: 'Minh', MSSV: '1660349'},
        {id: 2, lastName: 'Mạnh', MSSV: '...'},
        {id: 3, lastName: 'Luân', MSSV: '...'}
    ];
    res.json(members);
})

app.listen(port,() => console.log(`Listening on port ${port}`));