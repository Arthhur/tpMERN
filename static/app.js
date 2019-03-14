const contentNode = document.getElementById('content');
var i = 0;
const issues = [{
    id: 1, status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Erreur quand le user clique sur Add'
}, {
    id: 2, status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Erreur sur le panel'
}];

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
        setTimeout(() => {
            this.setState({ issues: issues });
        }, 500);
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({ issues: newIssues });
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