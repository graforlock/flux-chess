var Constants = require('../constants/constants.jsx');
var ChessDispatcher = require('../dispatcher/dispatcher.jsx');

var ChessActions = {
  fetchPosition: function(){
    ChessDispatcher.handleViewAction({
      actionType: Constants.GET_POSITION
    });
  },
  savePosition: function(position){
    ChessDispatcher.handleViewAction({
      actionType: Constants.SAVE_POSITION,
      position: position
    });
  }
};

module.exports = ChessActions;
