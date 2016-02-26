var React = require('react');


var Knight = React.createClass({
  getValidMoves: function() {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
  }
});

module.exports = Knight;
