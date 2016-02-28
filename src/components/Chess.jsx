var React = require('react');
var ChessPiece = require('./ChessPiece.jsx');
var Knight = require('./Knight.jsx');
var u = require('../utils/utils.jsx');
var settings = require('../constants/settings.jsx');

var chessStyles = {
  width : window.innerWidth / 2 + 'px',
  fontSize: '0',
  margin: '0 auto',
  position: 'fixed',
  top: '0'
};
chessStyles.height = chessStyles.width;
chessStyles.left = (u.depixelise(chessStyles.width)/2) + 'px';

var Chess = React.createClass({
  getInitialState: function() {
    return {positions: []};
  },
  pieceCoords: function(col,rnum) {
    return {
      left: (parseInt(chessStyles.width.replace('px','')) / 8) * col,
      top: (parseInt(chessStyles.width.replace('px','')) / 8) * rnum
    };
  },
  componentWillMount: function() {
    this.generateChessboard();
  },
  generateChessboard: function() {
    var chessPieces = settings.rowRange.map(function(e,i) {
      var rowsList = settings.rowRange;
      var letter = u.getChar(settings.keyCodeRange[i]);
      return rowsList.map(function(el,ind) {
        var pieceName = letter + '-' + (ind+1);
        var obj = {
          col: ind+1,
          row: letter,
          rnum: i+1
        };
        obj.coords = this.pieceCoords(obj.col-1,obj.rnum-1);
        obj.moves = this.setValidMoves(obj, settings.maxCol);
        return {
            value: obj,
            name: pieceName
        };
      }.bind(this));
    }.bind(this)).reduce(function(a,b) {
      return a.concat(b);
    });
    this.setState({positions: chessPieces});
  },
  setValidMoves: function(item,maxCol) {
    var validMoves = {};
    var keyRange = settings.keyCodeRange;
    var rowPos = u.getRowPos(keyRange,item.row);

      validMoves.left = item.col - 1 < 1 ? false : item.row + '-' + (item.col-1);
      validMoves.right = item.col + 1 > maxCol ? false : item.row + '-' + (item.col+1);
      validMoves.bottom = rowPos + 2 > maxCol ? false : u.getChar(rowPos+2,true) + '-' + item.col;
      validMoves.top = rowPos - 2 < 1 ? false : u.getChar(rowPos-2,true) + '-' + item.col;

    return validMoves;

  },
  calcSizes: function() {
      chessStyles.width = window.innerWidth / 2 + 'px';
      chessStyles.height = width;
      this.props.style = chessStyles;
  },
  render: function() {
      var chessPiece = this.state.positions.map(function(el,index) {
        return <ChessPiece size={chessStyles} name={el.name}
                           data={el.value}    key={index}
                          index={index}
               />;
      });
    return(
      <section>
          <section  style={chessStyles}>
            {chessPiece}
          </section>
        <section>
          <Knight size={chessStyles} positions={this.state.positions} />
        </section>
      </section>
    );
  }
});

module.exports = Chess;
