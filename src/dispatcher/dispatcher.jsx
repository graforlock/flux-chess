var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var ChessDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = ChessDispatcher;
