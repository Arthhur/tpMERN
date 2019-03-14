var express = require('express') ;

var app = express() ;
var path = require('path');


app.get('/test', function(request, response) {
    response.sendFile(path.join(__dirname, 'static') + '/test.html');
   });
app.use(express.static(path.join(__dirname, 'static')));

app.listen(3000) ;
console.log(path.join(__dirname, 'static')) ; 