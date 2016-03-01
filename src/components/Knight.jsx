var React = require('react');
var ValidMove = require('./ValidMove.jsx');
var ChessActions = require('../actions/actions.jsx');
var ChessStore = require('../stores/store.jsx');

var u = require('../utils/utils.jsx');
var settings = require('../constants/settings.jsx');

var Knight = React.createClass({
  getInitialState: function() {
    return {
      dragging : false,
      position: ChessStore.getStored(),
      moves: [],
      style: {},
      show: false,
      knight: null
    };
  },
  getPosition: function(coords) {
    var row = coords.row;
    var col = coords.col;
    var result =  this.props.positions.filter(function(el,index) {
      return el.value.rnum === row && el.value.col === col;
    });

    return result.length > 0 ? result : result = [{name: this.state.position}];
  },
  setPosition: function(keyword) {
    return this.props.positions.filter(function(el,index) {
      return el.name === keyword;
    })[0].value.coords;
  },
  dragStart: function(e) {

      e.preventDefault();
      var target = this.setState({knight: e.target});
      var coords = {};
      var validMovesList;
      this.setState({dragging: true});
      this.displayValidMoves(this.getValidMoves());
      document.addEventListener('mousemove', this.dragMotion);
  },
  dragMotion: function(ev) {
      if(this.state.dragging === true) {
        this.state.knight.style.left = (ev.pageX-(window.innerWidth/30)) + 'px';
        this.state.knight.style.top = (ev.pageY-(window.innerWidth/30)) + 'px';
        coords = this.dragCalcPos(ev.pageX,ev.pageY);
        document.addEventListener('mouseup', this.dragEnd);
      }
  },
  dragEnd: function(target,ev) {
      var currentMove = this.state.position,
          currentPosition = this.getPosition(coords)[0].name,
          validMovesList = this.getValidMoves().map(function(e) { return e.name; });

      if(u.inArray(currentPosition, validMovesList)) {
        this.setState({position: this.getPosition(coords)[0].name });
        this.setState({moves: []});
      } else {
        this.setState({style: {}});
        this.setState({style: this.updateStyles()});
        this.setState({dragging: false});
        this.setState({show: false});
        return;
      }
      this.setState({show: false});
      this.setState({dragging: false});

    },
  dragCalcPos: function(valX,valY) {
    var colSize = u.depixelise(this.pieceSize());
    var offsetLeft = u.depixelise(this.props.size.left);
    if( ((valY % colSize) > colSize/20) && ((valX % colSize) > colSize/20)) {
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
    var lastPosition = this.state.position();
    this.state.position = lastPosition ? lastPosition : 'A-1';
    this.state.style = this.updateStyles();
  },
  componentDidUpdate: function (props, state) {
   if (this.state.dragging === false && this.state.knight !== null) {
     this.state.knight.removeEventListener('mousedown', this.dragStart);
     document.removeEventListener('mousemove', this.dragMotion);
     document.removeEventListener('mouseup', this.dragEnd);
     ChessActions.savePosition(this.state.position);
   }
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
      if(move !== false && this.state.show === false) {

        var coords = {
          top: (move.top + (pieceSize /4) )  + 'px',
          left: (leftOffset + (move.left + pieceSize /4)) + 'px',
          height: (pieceSize/2) + 'px',
          width: (pieceSize/2) + 'px'
        };
        return(<ValidMove coords={coords} key={index} />);

      }
    }.bind(this));
    this.setState({moves: validMoves});
    this.setState({show: true});
  },
  render: function() {
    styleObject = this.state.style;
    validMoves = this.state.moves;
    dragStart = this.state.dragging === false ? this.dragStart : null;
    return(
      <section>
        <div onMouseDown={dragStart}
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
