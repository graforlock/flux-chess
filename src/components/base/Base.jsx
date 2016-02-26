var React = require('react');


var Base = React.createClass({
  render: function() {
      return(
        <main>
          {this.props.children}
        </main>
      );
  }
});

module.exports = Base;
