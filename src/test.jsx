const content = document.getElementById('content') ;

const newUsers = {
    name : 'Jean',
    age : 55
} ;

const Stateless = (props) => (
    <div>
        <p>Hello {props.user.name}</p>
        <p>Tu as {props.user.age} ans</p>
    </div>
) ;

class Test extends React.Component {
    constructor() {
        super() ;
        this.state = { user: {} } ;
        console.log(this.state) ;
    }
    componentDidMount() {
        this.setUser() ;
    }
    setUser() {   
        this.setState( { user: newUsers }) ;
    }
    render() {
        return (
            <Stateless user = {this.state.user} />
        ) ;
    }
}

ReactDOM.render(<Test />, content) ;