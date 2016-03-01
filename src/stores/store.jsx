var ChessDispatcher = require('../dispatcher/dispatcher.jsx');
var Constants = require('../constants/constants.jsx');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _catalog = [];


var _cartItems = [];

function _retrieveFromStorage(){
  return window.localStorage.getItem('position');
}

function _saveToStorage(pos){
  console.log(pos);
  return window.localStorage.setItem('position', pos);

}

var ChessStore = assign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getStored: function(){
    return _retrieveFromStorage;
  },

  dispatcherIndex: ChessDispatcher.register(function(payload){
    console.log(payload);
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case Constants.GET_POSITION:
        _retrieveFromStorage();
        break;
      case Constants.SAVE_POSITION:
      console.log('here');
        _saveToStorage(payload.action.position);
        break;

    }
    ChessStore.emitChange();

    return true;
  })

});

module.exports = ChessStore;
