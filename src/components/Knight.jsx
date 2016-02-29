var React = require('react');
var u = require('../utils/utils.jsx');
var settings = require('../constants/settings.jsx');

var Knight = React.createClass({
  getInitialState: function() {
    return {
      dragging : false,
      position: 'A-1',
      moves: [],
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
  dragStart: function(e) {

      e.preventDefault();
      var target = e.target;
      var coords = {};
      var validMovesList;
      this.setState({dragging: true});
      this.displayValidMoves(this.getValidMoves());
      window.addEventListener('mousemove', this.dragMotion.bind(null,target));
  },
  dragMotion: function(target,ev) {
      if(this.state.dragging === true) {
        target.style.left = (ev.pageX-(window.innerWidth/30)) + 'px';
        target.style.top = (ev.pageY-(window.innerWidth/30)) + 'px';
        coords = this.dragCalcPos(ev.pageX,ev.pageY);
        window.addEventListener('mouseup', this.dragEnd.bind(null,target));
      } else {

      }
  },
  dragEnd: function(target,ev) {
      validMovesList = this.getValidMoves().map(function(e) { return e.name; });
      if(u.inArray(this.getPosition(coords)[0].name, validMovesList)) {
        this.setState({position: this.getPosition(coords)[0].name });
        this.setState({style: this.updateStyles()});
      } else {
        // if(valid === false) {
          // this.replaceState(this.getInitialState());
          // this.setState({style: this.updateStyles()});
          // return;
        // }
        // this.setState({position: this.state.position });
        // this.setState({style: this.updateStyles()});
      }
      this.setState({show: false});
      this.setState({dragging: false});
      this.setState({moves: []});
      target.removeEventListener('mousedown', this.dragStart,false);
      window.removeEventListener('mousemove', this.dragMotion,false);
      window.removeEventListener('mouseup', this.dragEnd,false);
    },
  dragCalcPos: function(valX,valY) {
    var colSize = u.depixelise(this.pieceSize());
    var offsetLeft = u.depixelise(this.props.size.left);
    if( ((valY % colSize) > colSize/10) && ((valX % colSize) > colSize/10)) {
    /* Here: colSize / 10
       ---------->
       Why: One tenth of the Knight area needs to pass through neutral area to acknowledge next position.
       ---------->
    */
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

    var validMoves = moves.map(function(move,index) {
      // Try to shift to be a react component
      if(move !== false && this.state.show === false) {

        var styles = {
          top: (move.top + (pieceSize /4) )  + 'px',
          left: (leftOffset + (move.left + pieceSize /4)) + 'px',
          height: (pieceSize/2) + 'px',
          width: (pieceSize/2) + 'px',
          position : 'absolute',
          background : 'rgb(42, 223, 169)',
          backgroundImage : "url('img/tick.png')",
          backgroundSize : '60%',
          backgroundRepeat : 'no-repeat',
          backgroundPosition : 'center center',
          borderRadius : '100%',
          boxSizing : 'border-box',
          boxShadow : '1px 1px 2.5px #666666'
        };
        return(<div style={styles} key={index}></div>);

      }
    }.bind(this));
    this.setState({moves: validMoves});
    this.setState({show: true});
  },
  render: function() {
    styleObject = this.state.style;
    validMoves = this.state.moves;
    return(
      <section>
        <div onMouseDown={this.dragStart}
             style={styleObject}>
        </div>
        <div>
          {validMoves}
        </div>
      </section>
    );
  }
});

module.exports = Knight;
