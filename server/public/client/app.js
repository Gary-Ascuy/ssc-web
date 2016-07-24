window.Client = window.Client || {};

//
// Main controller
//
Client.Author = React.createClass({
  render() {
    return (
      <div className="ui blue segment">
        Gary Ascuy, email me gary.ascuy@gmail.com T^T)9
      </div>
    );
  }
});

Client.MainContainer = React.createClass({
  render() {
    return (
      <div className="ui basic center aligned segment">
        <h1>Serial Servo Controller - Web Application</h1>
      </div>
    );
  }
});

const $container = document.getElementById('main-container');
ReactDOM.render(<Client.MainContainer />, $container);
