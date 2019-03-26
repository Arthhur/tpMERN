
const contentNode = document.getElementById('content');

const MaterielRow = props => React.createElement(
    'tr',
    null,
    React.createElement(
        'td',
        null,
        props.materiel.id
    ),
    React.createElement(
        'td',
        null,
        props.materiel.nom
    ),
    React.createElement(
        'td',
        null,
        props.materiel.qte
    ),
    React.createElement(
        'td',
        null,
        React.createElement(
            'a',
            { href: '/materiels/edit/' + props.materiel.id },
            React.createElement(
                'button',
                { className: 'btn btn-warning' },
                'Edit'
            )
        )
    ),
    React.createElement(
        'td',
        null,
        React.createElement(
            'button',
            { className: 'btn btn-danger' },
            'Delete'
        )
    )
);

function MaterielTable(props) {
    const materielRows = props.materiels.map(materiel => React.createElement(MaterielRow, { key: materiel.id, materiel: materiel }));
    return React.createElement(
        'table',
        { className: 'table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'ID'
                ),
                React.createElement(
                    'th',
                    null,
                    'NOM'
                ),
                React.createElement(
                    'th',
                    null,
                    'QTE'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            materielRows
        )
    );
}

class AddMateriel extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.materiels;

        this.props.createMateriel({
            nom: form.nom.value,
            qte: form.qte.value
        });
        // mets à zéro le formulaire pour la nouvelle saisie
        form.nom.value = "";
        form.qte.value = "";
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { name: 'materiels', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'nom', placeholder: 'Nom' }),
                React.createElement('input', { type: 'text', name: 'qte', placeholder: 'Qte' }),
                React.createElement(
                    'button',
                    null,
                    'Add'
                )
            )
        );
    }
}

class EditMateriel extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.materiels;

        this.props.createMateriel({
            nom: form.nom.value,
            qte: form.qte.value
        });
        // mets à zéro le formulaire pour la nouvelle saisie
        form.nom.value = "";
        form.qte.value = "";
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { name: 'materiels', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'nom', placeholder: 'Nom' }),
                React.createElement('input', { type: 'text', name: 'qte', placeholder: 'Qte' }),
                React.createElement(
                    'button',
                    { className: 'btn btn-warning' },
                    'Edit'
                )
            )
        );
    }
}

class Materiels extends React.Component {
    constructor() {
        super();
        this.state = { materiels: [] };
        this.createMateriel = this.createMateriel.bind(this);
    }
    componentDidMount() {
        this.getMateriel();
    }
    getMateriel() {
        axios.get('/api/materiels').then(data => {
            this.setState({ materiels: data.data.records });
        });
    }

    createMateriel(materiel) {
        materiel.id = this.state.materiels.length + 1;
        axios.post('/api/materiels', materiel).then(result => {
            console.log(result);
        }).catch(error => {
            alert(error);
        });
        this.getMateriel();
    }

    deleteMateriel(materiel) {
        const idMateriel = materiel.id;
        axios.delete('/api/materiels/' + idMateriel).then(result => {
            const materielIndexToDelete = this.state.materiels.findIndex(mat => {
                if (mat === materiel) {
                    return true;
                }
            });
            this.setState({ materiels: this.state.materiels.splice(materielIndexToDelete, 1) });
        }).catch(error => {
            alert(error);
        });
    }

    render() {

        return React.createElement(
            'div',
            null,
            React.createElement(MaterielTable, { materiels: this.state.materiels }),
            React.createElement('hr', null),
            React.createElement(AddMateriel, { createMateriel: this.createMateriel })
        );
    }
}

ReactDOM.render(React.createElement(Materiels, null), contentNode);