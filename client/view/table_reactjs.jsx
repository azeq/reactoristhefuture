/** @jsx React.DOM */

Cell = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.cellValue != this.props.cellValue; 
  },
  /* uncomment these two methods to see what has changed between updates */
  componentDidMount: function(){
   this.getDOMNode().className= "cell";
  },
  componentWillUpdate: function(){
   if(this.getDOMNode() != null){
     this.getDOMNode().className= "cell2";
     var self = this;
     setTimeout(function(){
       self.getDOMNode().className= "";
     }, 1010);
   }
  },
  render: function () {
    return (
      <td key={this.props.key} rowSpan={this.props.rowspan} colSpan={this.props.colspan}>{this.props.cellValue}</td>
     );
  }
});

Header = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.cellValue != this.props.cellValue 
    || nextProps.rowspan != this.props.rowspan 
    || nextProps.colspan != this.props.colspan;
  },
  render: function () {
    return (
      <th key={this.props.key} rowSpan={this.props.rowspan} colSpan={this.props.colspan}>{this.props.cellValue}</th>
     );
  }
});

Row = React.createClass({
  render: function () {
    return (
      <tr key={this.props.key}>{this.props.row}</tr>
     );
  }
});

Table = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return {
      data: Session.get("data")
    };
  },
	render: function () {
		return (
			<table className="table table-bordered"><tbody>
			{
				tableRendering(this.state.data)
			}
			</tbody></table>
			); 
	}
});
