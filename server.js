var express = require('express') ;
const bodyParser = require('body-parser');
var path = require('path');

var app = express() ;

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


app.listen(3000) ;

