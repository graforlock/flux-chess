var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var ChessDispatcher = assign(new Dispatcher(), {
  handleViewAction: function() {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = ChessDispatcher;
