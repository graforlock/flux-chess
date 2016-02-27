var u = require('../utils/utils.jsx');

var settings = {
  keyCodeRange : u.range(97,122),
  maxCol : 8
};

settings.rowSquared = Math.pow(settings.maxCol,2);
settings.rowRange = u.range(1,settings.maxCol);

module.exports = settings;
