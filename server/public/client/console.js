window.Client = window.Client || {};
window.Client.io = io.connect();

//
// Interactive console
//
Client.MainConsole = React.createClass({
  getInitialState() {
    return {command: ''};
  },
  handleCommandChange: function(e) {
    this.setState({command: e.target.value});
  },
  handleSubmit(evt) {
    evt.preventDefault();
    this.sendCommand();
  },
  sendCommand() {
    const {command} = this.state;
    console.log(this.state);
    this.setState({command: ''});
    window.Client.io.send(command);
  },
  render() {
    return (
      <div className="ui basic segment">
        <div className="main console">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="ui message">
              <p>Execution results</p>
            </div>
            <div className="ui icon input">
              <input type="text"
                value={this.state.command}
                onChange={this.handleCommandChange}
                autocomplete="off"
                placeholder="Command"/>
              <i className="play link icon" onClick={this.handleSubmit}></i>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

const $container = document.getElementById('main-console');
ReactDOM.render(<Client.MainConsole />, $container);
