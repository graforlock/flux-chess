var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Base = require('./components/base/Base.jsx');
var Chess = require('./components/Chess.jsx');

var CreateHistory = require('history/lib/createhashHistory');
//--> Routes imported -->

var History = new CreateHistory({
  queryKey: false
});

var Routes = (
  <Router history={History}>
    <Route path="/" component={Base}>
      <IndexRoute  component={Chess}/>
    </Route>
  </Router>
);

module.exports = Routes;
