var u = {};

u.range = function(min,max) {
  var range = [];
    for(var i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
};

u.getKeyCode = function(str) {
  return str.charCodeAt(0)+32;
};

u.depixelise = function(pixeled) {
  return Number(pixeled.replace('px',''));
};

u.getChar = function(ccode, alphabet) {
  alphabet = alphabet || false;
  ccode = alphabet === true ? ccode + 96 : ccode;
  return String.fromCharCode(ccode).toUpperCase();
};

u.getRowPos = function(array,element) {
  return array.indexOf(u.getKeyCode(element)) + 1;
};

module.exports = u;
