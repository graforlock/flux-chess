var React = require('react');
var u = require('../utils/utils.jsx');
var settings = require('../constants/settings.jsx');

var Knight = React.createClass({
  getInitialState: function() {
    return {
      dragging : false,
      position: 'A-1',
      style: {},
      show: false
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
      var validMovesList;
      this.setState({dragging: true});
        window.addEventListener('mousemove', function(ev) {
          if(this.state.dragging === true) {
            target.style.left = (ev.pageX-(window.innerWidth/30)) + 'px';
            target.style.top = (ev.pageY-(window.innerWidth/30)) + 'px';
            coords = this.dragCalcPos(ev.pageX,ev.pageY);
            // console.log(this.getPosition(coords)[0]); // Gets which one do you drag over
            this.displayValidMoves(this.getValidMoves());
            window.addEventListener('mouseup', function(ev) {
              validMovesList = this.getValidMoves().map(function(e) { return e.name; });
              if(u.inArray(this.getPosition(coords)[0].name, validMovesList)) {
                this.setState({position: this.getPosition(coords)[0].name });
                this.setState({style: this.updateStyles()});
              }
              this.setState({show: false});
              this.setState({dragging: false});
            }.bind(this));
          }
      }.bind(this));
  },
  dragCalcPos: function(valX,valY) {
    var colSize = u.depixelise(this.pieceSize());
    var offsetLeft = u.depixelise(this.props.size.left);

    if( ((valY % colSize) > colSize/5) && ((valX % colSize) > colSize/5)) {
      return {
          row: Math.ceil(valY / colSize),
          col: Math.ceil((valX - offsetLeft) / colSize)
      };
    } else {
      return false;
    }
  },
  pieceSize: function() {
    return (parseInt(this.props.size.height.replace('px','')) / 8) + 'px';
  },
  componentWillMount: function() {
    this.state.style = this.updateStyles();
  },
  updateStyles: function() {
    var defaultStyles = {
        boxSizing: 'border-box',
        borderRadius: '100%',
        backgroundColor: '#343232',
        borderBottom: '7px solid #1f1d1e',
        display: 'inline-block',
        boxShadow: '2px 2px 2px solid black',

        position: 'fixed',
        'zIndex': '1000',
        left: '0',
        top: '0',

        cursor: 'pointer',
        margin: '0'
    };

    defaultStyles.height = this.pieceSize();
    defaultStyles.width = defaultStyles.height;
    defaultStyles.left = (this.setPosition(this.state.position).left + u.depixelise(this.props.size.left)) + 'px';
    defaultStyles.top = this.setPosition(this.state.position).top + 'px';

    return defaultStyles;
  },
  getValidMoves: function() {
    var results = [],
        result;
    var movesObject = this.props.positions.filter(function(el) {
      return el.name === this.state.position;
    }.bind(this))[0].value;
    var validMoves = movesObject.moves;
    var coords = movesObject.coords;
    for(var key in validMoves) {
      result = (validMoves[key] !== false) ? this.setPosition(validMoves[key]) : false;
      result.name = validMoves[key];
      results.push(result);
    }
    return results;
  },
  displayValidMoves: function(moves) {
    var div;
    var leftOffset = u.depixelise(this.props.size.left);
    var pieceSize = u.depixelise(this.pieceSize());

    moves.map(function(move) {
      // Try to shift to be a react component
      if(move !== false && this.state.show === false) {
        div = document.createElement('div');
        div.style.top = (move.top + (pieceSize /4) )  + 'px';
        div.style.left = (leftOffset + (move.left + pieceSize /4)) + 'px';
        div.style.height = (pieceSize/2) + 'px';
        div.style.width = div.style.height;
        div.style.zIndex = '0';
        div.style.position = 'absolute';
        div.style.background = 'rgb(42, 223, 169)';
        div.style.backgroundImage = "url('img/tick.png')";
        div.style.backgroundSize = '60%';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundPosition = 'center center';
        div.style.borderRadius = '100%';
        div.style.boxSizing = 'border-box';
        // div.style.boxShadow = '1px 1px 2.5px #666666';
        document.body.appendChild(div);
      }
    }.bind(this));
    this.setState({show: true});
  },
  render: function() {
    styleObject = this.state.style;
    return(
      <div onMouseDown={this.dragFrom}
           style={styleObject}>
      </div>
    );
  }
});

module.exports = Knight;
