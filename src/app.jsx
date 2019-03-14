const contentNode = document.getElementById('content');
var i = 0 ;
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
    }, 
];

class IssueFilter extends React.Component {
    render() {
        return (
            <div>Placeholder pour le Filtre des Issues.</div>
        ) ;
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
        created: new Date(),
        });
        // mets à zéro le formulaire pour la nouvelle saisie
        form.owner.value = ""; form.title.value = "";
    }
    render() {
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
                </form>
            </div>
        ) ;
    }
}

class IssueRow extends React.Component {
    render() {
        console.log(i) ;
        i++ ;
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td> 
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr> 
        )
    } 
}

class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow  key={issue.id} issue={issue} />)
        return (
            <table className="table">
                <thead> 
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completion Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </table>
        ) ;
    }
}


class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createTestIssue = this.createTestIssue.bind(this) ;
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
    createTestIssue() {
        this.createIssue({
            status: 'New', 
            owner: 'Pieta', 
            created: new Date(), 
            title: 'Le remplissage de la date est optionnel'
        });
   }
    render() {
        return (
            <div>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable issues={this.state.issues} />
            <button onClick={this.createTestIssue}>Add</button>
            <hr />
            <IssueAdd />
            </div>
        );
   } 
}

ReactDOM.render(<IssueList />, contentNode);