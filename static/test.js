const content = document.getElementById('content');

const newUsers = {
    name: 'Jean',
    age: 55
};

const Stateless = props => React.createElement(
    'div',
    null,
    React.createElement(
        'p',
        null,
        'Hello ',
        props.user.name
    ),
    React.createElement(
        'p',
        null,
        'Tu as ',
        props.user.age,
        ' ans'
    )
);

class Test extends React.Component {
    constructor() {
        super();
        this.state = { user: {} };
        console.log(this.state);
    }
    componentDidMount() {
        this.setUser();
    }
    setUser() {
        this.setState({ user: newUsers });
    }
    render() {
        return React.createElement(Stateless, { user: this.state.user });
    }
}

ReactDOM.render(React.createElement(Test, null), content);