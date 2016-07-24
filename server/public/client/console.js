window.Client = window.Client || {};

//
// Interactive console
//
Client.MainConsole = React.createClass({
  render() {
    return (
      <div className="ui basic segment">
        <div className="main console">
          <form className="ui form">
            <div className="ui message">
              <p>Execution results</p>
            </div>
            <div className="ui icon input">
              <input type="text" placeholder="Command"/>
              <i className="play link icon"></i>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

const $container = document.getElementById('main-console');
ReactDOM.render(<Client.MainConsole />, $container);
