var express = require('express') ;
const bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var app = express() ;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'training_symfony'
});

connection.connect();

const issues = [
    {
        id: 1, status: 'Open', 
        owner: 'Ravan',
        created: new Date('2016-08-15'), 
        effort: 5, 
        completionDate: undefined,
        title: 'Erreur quand le user clique sur Add'
    },
    {
        id: 2, status: 'Assigned', 
        owner: 'Eddie', 
        created: new Date('2016-08-16'),
        effort: 14, 
        completionDate: new Date('2016-08-30'),
        title: 'Erreur sur le panel'
    }
];


app.use(bodyParser.json()) ;
app.use(express.static(path.join(__dirname, 'static')));


app.get('/test', function(request, response) {
    response.sendFile(path.join(__dirname, 'static') + '/test.html');
});

app.get('/materiels', function(request, response) {
    response.sendFile(path.join(__dirname, 'static') + '/materiels.html');
});

app.get('/api/issues', (req, res) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = 'New';
    issues.push(newIssue);
    res.json(newIssue);
});



app.get('/api/materiels', (req, res) => {
    connection.query('SELECT * FROM materiels', function(err, rows, fields) {
        if (err) 
            console.log(err);
        const metadata = { total_count: rows.length };
        res.json({ _metadata: metadata, records: rows });
    });
   
});

app.post('/api/materiels', (req, res) => {
    const newMateriel = req.body;
    connection.query('INSERT INTO materiels (id,nom, qte) VALUES (?,?,?)',[newMateriel.id,newMateriel.nom, newMateriel.qte] , function(err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
        }
    }) ;

});


function exitHandler(options, err) {
    connection.end();
    if (options.cleanup)
        console.log('clean');
    if (err)
        console.log(err.stack);
    if (options.exit)
        process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}));

app.listen(3000) ;


