var React = require('react');


var ChessPiece = React.createClass({
  chessPieceStyle : {
      display: 'inline-block',
      fontSize: '26px',
      'fontWeight': 'bold',
      textAlign: 'center',
      color: 'white'

  },
  textStyle :{
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0',
    'opacity' : '0',
    cursor: 'default'
  },
  colorSwitch: function() {
    switch(this.props.data.rnum % 2) {
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
