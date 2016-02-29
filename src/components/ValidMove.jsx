var React = require('react');
var defaultStyles = {
  position : 'absolute',
  background : 'rgb(42, 223, 169)',
  backgroundImage : "url('img/tick.png')",
  backgroundSize : '60%',
  backgroundRepeat : 'no-repeat',
  backgroundPosition : 'center center',
  borderRadius : '100%',
  boxSizing : 'border-box',
  boxShadow : '1px 1px 2.5px #666666'

};

var ValidMove = React.createClass({
  getInitialState: function() {
    return {style: {}};
  },
  getInitialStyles: function() {
    defaultStyles.left = this.props.size.left;
    defaultStyles.top = this.props.size.top;
    defaultStyles.height = this.props.size.height;
    defaultStyles.width = this.props.size.width;
    return defaultStyles;
  },
  componentWillMount: function() {
    this.state.style = this.getInitialStyles();
  },
  componentWillUpdate: function() {
    this.state.style = this.getInitialStyles();
  },
  render: function() {
    var style = this.state.style;
    return(<div style={style}></div>);
  }
});


module.exports = ValidMove;
