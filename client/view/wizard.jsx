/** @jsx React.DOM */

Wizard = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return {
			connectionState: Session.get("connectionState"),
		}
	},
	run: function() {
		this.webSocket = new APWebSocket(this.refs.refMdxEditor.getDOMNode().value);//createWebSocket(this.refs.refMdxEditor.getDOMNode().value);
		this.webSocket.run();
	},
	clear: function() {
		this.refs.refMdxEditor.getDOMNode().value = "";
		this.webSocket.close();
	},
	openPopup: function() {
		$('#myModal').modal('show');//show the modal
	},
	saveAction: function(bookmarkName){
		var mdx = this.refs.refMdxEditor.getDOMNode().value;
 		var bk = {name: bookmarkName, mdx: mdx};
		Session.set("saveBk", bk);//event save bk
	},
	render: function () {
		return (
			<div>
				<Popup title="Save bookmark" onsaveHandler={this.saveAction}/>
				<MdxEditor ref="refMdxEditor"/>
				<div className="btn-group">
					<ReqButton title="Run" className={"btn btn-primary"} onclickHandler={this.run}/>
					<ReqButton title="Clear" className={"btn"} onclickHandler={this.clear}/>
					<ReqButton title="Save" className={"btn btn-primary"} onclickHandler={this.openPopup}/>
				</div>
					<div className="pull-right">
						<ConnectionLabel connectState={this.state.connectionState.connectionState} info={this.state.connectionState.connectionInfo}/>
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

