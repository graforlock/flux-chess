var React = require('react');


var ChessPiece = React.createClass({
  chessPieceStyle : {
      display: 'inline-block'
  },
  colorSwitch: function() {
    switch(this.props.data[this.props.name].row % 2) {
      case 0:
        switch(this.props.index % 2) {
          case 0:
          return 'gainsboro';
          case 1:
          return 'gray';
        }
      break;
      case 1:
        switch(this.props.index % 2) {
          case 0:
          return 'gray';
          case 1:
          return 'gainsboro';
        }
      break;
    }
  },
  getChessSize: function() {
    var styleObject = this.chessPieceStyle;
    // parseInt and stuff needs to be a separate function.
    styleObject.background = this.colorSwitch();
    styleObject.height = (parseInt(this.props.size.height.replace('px','')) / 8) + 'px';
    styleObject.width = (parseInt(this.props.size.width.replace('px','')) / 8) + 'px';
    return styleObject;
  },
  render: function() {
    return(
      <div style={this.getChessSize()}></div>
    );
  }
});

module.exports = ChessPiece;
