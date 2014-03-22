/** @jsx React.DOM */

var MdxEditor = React.createClass({
	render: function () {
		return (
				<textarea className="form-control space-top-bottom mdx" rows="15" style={{display : this.props.display}}
				defaultValue="SELECT NON EMPTY CrossJoin(   Hierarchize(     DrilldownLevel(       [Bookings].[Desk].[ALL].[AllMember]     )   ),   Hierarchize(     DrilldownLevel(       [Underlyings].[Products].[ALL].[AllMember]     )   ) ) ON ROWS  FROM [EquityDerivativesCube]  WHERE [Measures].[pnl.SUM]"></textarea>
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

WizardNavBar = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return {
			connectionState: Session.get("connectionState"),
			display : "none"
		}
	},
	toggleDisplay: function(){
		this.setState({display : this.state.display === "none" ? "inline" : "none"});
	},
	run: function() {
		var query = this.refs.refMdxEditor.getDOMNode().value;
		MainWebSocket.getInstance(query).run();
	},
	clear: function() {
		this.refs.refMdxEditor.getDOMNode().value = "";
		var ws = MainWebSocket.getInstance();
		if(ws !== undefined && ws !== null){
			ws.stop();
		}
	},
	openPopup: function() {
		$('#myModal').modal('show');//show the modal
	},
	saveAction: function(bookmarkName){
		var mdx = this.refs.refMdxEditor.getDOMNode().value;
 		var bk = {name: bookmarkName, mdx: mdx};
		Session.set("saveBk", bk);//event save bk
	},
	render: function(){
		return (
			<div>
			<p className="navbar-text">
				<ConnectionLabel connectState={this.state.connectionState.connectionState} info={this.state.connectionState.connectionInfo}/>
        	</p>
        	<span className="icon-bar"></span>
				<div className="btn-group">
					<button type="button" className="btn btn-default navbar-btn" title="Show wizard" onClick={this.toggleDisplay}>
						<span className="glyphicon glyphicon-th-large"></span>
					</button>		
					<button type="button" className="btn btn-default navbar-btn" title="Execute" onClick={this.run}>
						<span className="glyphicon glyphicon-play"></span>
					</button>
					<button type="button" className="btn btn-default navbar-btn" title="Clear" onClick={this.clear}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
					<button type="button" className="btn btn-default navbar-btn" title="Bookmarked" onClick={this.openPopup}>
						<span className="glyphicon glyphicon-bookmark"></span>
					</button>
				</div>
				<Popup title="Save bookmark" onsaveHandler={this.saveAction}/>
				<div className="mdxEditor">
					<MdxEditor ref="refMdxEditor" display={this.state.display}/>
				</div>
			</div>
		);
	}
});

