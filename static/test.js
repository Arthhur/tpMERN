const content = document.getElementById('content');
class Test extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Hello ",
                this.props.title
            )
        );
    }
}

ReactDOM.render(React.createElement(Test, { title: "Arthur" }), content);