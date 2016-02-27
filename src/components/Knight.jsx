var React = require('react');
var u = require('../utils/utils.jsx');
var settings = require('../constants/settings.jsx');

var styleObject = {
  boxSizing: 'border-box',
  borderRadius: '100%',
  backgroundColor: '#343232',
  borderBottom: '7px solid #1f1d1e',
  display: 'inline-block',

  position: 'fixed',
  left: '0',
  top: '0',

  cursor: 'pointer',
  margin: '0'
};

var Knight = React.createClass({
  getInitialState: function() {
    return {
      dragging : false,
      position: 'A-1'
    };
  },
  getPosition: function(coords) {
    //will get the chesspiece according to the position
    var row = coords.row;
    var col = coords.col;
    return this.props.positions.filter(function(el,index) {
      return el.value.rnum === row && el.value.col === col;
    });
  },
  setPosition: function(keyword) {
    return this.props.positions.filter(function(el,index) {
      return el.name === keyword;
    })[0].value.coords;
  },
  dragFrom: function(e) {
      e.preventDefault();
      var target = e.target;
      var coords = {};
      this.setState({dragging: true});
        window.addEventListener('mousemove', function(ev) {
          if(this.state.dragging === true) {
            target.style.left = (ev.pageX-(window.innerWidth/30) ) + 'px';
            target.style.top = (ev.pageY-(window.innerWidth/30)) + 'px';
            coords = this.dragCalcPos(ev.pageX,ev.pageY);
            console.log(this.getPosition(coords)[0].name);
          }
      }.bind(this));
  },
  dragCalcPos: function(valX,valY) {
    var colSize = u.depixelise(this.pieceSize());
    var offsetLeft = u.depixelise(this.props.size.left);

    if( ((valY % colSize) > colSize/5) && ((valX % colSize) > colSize/5)) {
      return {
          row: Math.ceil(valY / colSize),
          col:Math.ceil((valX -offsetLeft) / colSize)
      };
    } else {
      return false;
    }
  },
  pieceSize: function() {
    return (parseInt(this.props.size.height.replace('px','')) / 8) + 'px';
  },
  dragTo: function(e) {
    this.setState({dragging: false});
  },
  componentWillMount: function() {

  },
  getChessSize: function() {
    styleObject.height = this.pieceSize();
    styleObject.width = styleObject.height;
    styleObject.left = (this.setPosition(this.state.position).left + u.depixelise(this.props.size.left)) + 'px';
    styleObject.top = this.setPosition(this.state.position).top + 'px';
    return styleObject;
  },
  getValidMoves: function() {
    return this.state.position.coords;
  },
  render: function() {
    return(
      <div onMouseDown={this.dragFrom}
           onMouseUp={this.dragTo}
           style={this.getChessSize()}>
      </div>
    );
  }
});

module.exports = Knight;
