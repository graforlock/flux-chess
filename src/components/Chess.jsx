var React = require('react');
var ChessPiece = require('./ChessPiece.jsx');

function range(min,max) {
  var range = [];
    for(var i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
}
var settings = {
  keyCodeRange : range(97,122),
  maxRow : 8
};

settings.rowSquared = Math.pow(settings.maxRow,2);
settings.rowRange = range(1,settings.maxRow);

var chessPieces = settings.rowRange.map(function(e,i) {
  var rowsList = settings.rowRange;
  var currLetter = String.fromCharCode(settings.keyCodeRange[i]).toUpperCase();
  return rowsList.map(function(el,ind) {
    var obj = {};
    obj[currLetter + '-' + (ind+1)] = {
      row: i+1
    };
    return {
      position: {
        value: obj,
        name: currLetter + '-' + (ind+1)
      }
    };
  });
}).reduce(function(a,b) {
  return a.concat(b);
});
console.log(chessPieces);
// 1. Assign objects to the Chess board and put coords to the row object (on the fly).
// 2. Get/calc valid moves and return it in above object .value.

var chessStyles = {
  width: '500px',
  height: '500px',
  fontSize: '0'
};

var Chess = React.createClass({

  componentWillMount: function() {

  },
  render: function() {
      var chessPiece = chessPieces.map(function(el,index) {
        return <ChessPiece  size={chessStyles} name={el.position.name} data={el.position.value} key={index} index={index} />;
      });
    return(
      <section style={chessStyles}>
        {chessPiece}
      </section>
    );
  }
});

module.exports = Chess;
