/** @jsx React.DOM */

Wizard = React.createClass({
	getInitialState: function() {
		return {
			connectState: "label-default",
			info: "Not connected",
		};
	},
	run: function(){
		webSocket = createWebSocket(this.refs.refMdxEditor.getDOMNode().value, this);
	},
	clear: function(){
		this.refs.refMdxEditor.getDOMNode().value = "";
		webSocket.close();
	},
	render: function () {
		return (
			<div>
				<MdxEditor ref="refMdxEditor"/>
				<div className={"btn-group"}>
					<ReqButton title={"Run"} className={"btn btn-primary"} onclickHandler={this.run}/>
					<ReqButton title={"Clear"} className={"btn"} onclickHandler={this.clear}/>
				</div>
					<div className="pull-right">
						<ConnectionLabel connectState={this.state.connectState} info={this.state.info}/>
					</div>
			</div>
		);
	}
});

var MdxEditor = React.createClass({
	render: function () {
		return (
			<textarea className="form-control space-top-bottom" rows="15" defaultValue="SELECT NON EMPTY CrossJoin(   Hierarchize(     DrilldownLevel(       [Bookings].[Desk].[ALL].[AllMember]     )   ),   Hierarchize(     DrilldownLevel(       [Underlyings].[Products].[ALL].[AllMember]     )   ) ) ON ROWS  FROM [EquityDerivativesCube]  WHERE [Measures].[pnl.SUM]"></textarea>
		);
	}
});

var ConnectionLabel = React.createClass({
	render: function () {
		return (
			<span className={"label "+this.props.connectState}>{this.props.info}</span>
		);
	}
});

