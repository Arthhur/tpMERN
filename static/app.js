const contentNode = document.getElementById('content');
var i = 0;

class IssueFilter extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            'Placeholder pour le Filtre des Issues.'
        );
    }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date()
        });
        // mets à zéro le formulaire pour la nouvelle saisie
        form.owner.value = "";form.title.value = "";
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { name: 'issueAdd', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                React.createElement(
                    'button',
                    null,
                    'Add'
                )
            )
        );
    }
}

const IssueRow = props => React.createElement(
    'tr',
    null,
    React.createElement(
        'td',
        null,
        props.issue.id
    ),
    React.createElement(
        'td',
        null,
        props.issue.status
    ),
    React.createElement(
        'td',
        null,
        props.issue.owner
    ),
    React.createElement(
        'td',
        null,
        props.issue.created.toDateString()
    ),
    React.createElement(
        'td',
        null,
        props.issue.effort
    ),
    React.createElement(
        'td',
        null,
        props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
    ),
    React.createElement(
        'td',
        null,
        props.issue.title
    )
);

function IssueTable(props) {
    const issueRows = props.issues.map(issue => React.createElement(IssueRow, { key: issue.id, issue: issue }));
    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Id'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueRows
        )
    );
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        //setTimeout(this.createTestIssue.bind(this), 2000);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        fetch('/api/issues').then(response => response.json()).then(data => {
            console.log("Nombre Total d’enregistrements:", data._metadata.total_count);
            data.records.forEach(issue => {
                issue.created = new Date(issue.created);
                if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({ issues: data.records });
        }).catch(err => {
            console.log(err);
        });
    }
    createIssue(newIssue) {
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue)
        }).then(response => response.json()).then(updatedIssue => {
            updatedIssue.created = new Date(updatedIssue.created);
            if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
            const newIssues = this.state.issues.slice();
            newIssues.push(updatedIssue);
            this.setState({ issues: newIssues });
        }).catch(err => {
            alert("Erreur sur l’envoi de données au serveur: " + err.message);
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Issue Tracker'
            ),
            React.createElement(IssueFilter, null),
            React.createElement('hr', null),
            React.createElement(IssueTable, { issues: this.state.issues }),
            React.createElement('hr', null),
            React.createElement(IssueAdd, { createIssue: this.createIssue })
        );
    }
}

ReactDOM.render(React.createElement(IssueList, null), contentNode);