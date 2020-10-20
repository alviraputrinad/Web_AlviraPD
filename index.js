const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const fs = require ('fs')
const app = express()
const port = 3001
const query = require("./queries");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/get-berita', (request, response) => {
  query.getBerita(request, response)
})
app.post('/create-berita',(request,response) =>{
  query.createBerita(request, response)
})
app.get('/home',(req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream(__dirname + '/index.html').pipe(res);
});

app.post('/delete-berita',(request, response) =>{
  query.deleteBerita(request, response)
})
app.post('/update-berita',(request, response)=>{
  query.updateBerita(request, response)
})
app.get("/*name/:name", function(request, response) {
  response.send("hello" +request.params.name);
})

app.listen(port, err => {

    console.log(`App running on port ${port}.`)
  })