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

const IssueRow = (props) => (
    <tr>
        <td>{props.issue.id}</td> 
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td> 
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td> 
        <td>{props.issue.title}</td>
   </tr> 
) ;
   
function IssueTable(props) {
   const issueRows = props.issues.map(issue =><IssueRow  key={issue.id} issue={issue} />);
   return (
        <table className="bordered-table">
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
    );
 }


class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this) ;
        //setTimeout(this.createTestIssue.bind(this), 2000);
    }
    componentDidMount() {
         this.loadData();
    }
    loadData() {
         setTimeout(() => {
            this.setState({ issues: issues });
         }, 500) ;
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({ issues: newIssues });
   }
    
    render() {
        return (
            <div>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable issues={this.state.issues} />
            <hr />
            <IssueAdd createIssue = {this.createIssue}/>
            </div>
        );
   } 
}

ReactDOM.render(<IssueList />, contentNode);
