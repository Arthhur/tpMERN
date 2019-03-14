const content = document.getElementById('content') ;
class Test extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello {this.props.title}</h1>
            </div>
        ) ;
    }
}

ReactDOM.render(<Test title="Arthur" />, content) ;