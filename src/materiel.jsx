
const contentNode = document.getElementById('content');

const MaterielRow = (props) => (
    <tr>
        <td>{props.materiel.id}</td> 
        <td>{props.materiel.nom}</td>
        <td>{props.materiel.qte}</td>
   </tr> 
) ;

function MaterielTable(props) {
    const materielRows = props.materiels.map(materiel =><MaterielRow  key={materiel.id} materiel={materiel} />);
    return (
         <table className="table">
             <thead>
                 <tr>
                     <th>ID</th>
                     <th>NOM</th>
                     <th>QTE</th>
                 </tr>
             </thead>
             <tbody>{materielRows}</tbody>
         </table>
     );
  }

class AddMateriel extends React.Component {
  constructor() {
    super() ;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.materiels;

    this.props.createMateriel({
        nom : form.nom.value,
        qte : form.qte.value
    });
    // mets à zéro le formulaire pour la nouvelle saisie
    form.nom.value = ""; 
    form.qte.value = "";
  }
  render() {
    return (
      <div>
        <form name="materiels" onSubmit={this.handleSubmit}>
            <input type="text" name="nom" placeholder="Nom" />
            <input type="text" name="qte" placeholder="Qte" />
            <button>Add</button>
        </form>
      </div>
    );
  }
}

class Materiels extends React.Component {
    constructor() {
        super();
        this.state = { materiels : [] } ;
        this.createMateriel = this.createMateriel.bind(this) ;
    }
    componentDidMount() {
        this.getMateriel();
   }
    getMateriel() {
        axios.get('/api/materiels')
        .then((data) => {
            this.setState({ materiels : data.data.records });
        }) ;
    }

    createMateriel(materiel) { 
        materiel.id = this.state.materiels.length + 1 ;
        axios.post('/api/materiels', materiel)
            .then((result) => {
                console.log(result) ;
        })
        .catch((error) => {
            alert(error);
        });
        this.getMateriel() ;
    }

    render() {

        return (
            <div>
                <MaterielTable materiels={this.state.materiels}/>
                <hr />
                <AddMateriel createMateriel={this.createMateriel} />
            </div>
        );
    }
}

ReactDOM.render(<Materiels />, contentNode);
